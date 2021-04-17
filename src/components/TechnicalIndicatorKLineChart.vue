<template>
  <Layout title="技术指标">
    <div id="technical-indicator-k-line" class="k-line-chart" />
    <div class="k-line-chart-menu-container">
      <span style="padding-right: 10px">主图指标</span>
      <button
        v-for="type in mainTechnicalIndicatorTypes"
        :key="type"
        v-on:click="setCandleTechnicalIndicator(type)"
      >
        {{ type }}
      </button>
      <button v-on:click="setCandleTechnicalIndicator('EMOJI')">自定义</button>
      <span style="padding-right: 10px; padding-left: 12px">副图指标</span>
      <button
        v-for="type in subTechnicalIndicatorTypes"
        :key="type"
        v-on:click="setSubTechnicalIndicator(type)"
      >
        {{ type }}
      </button>
      <button v-on:click="setSubTechnicalIndicator('EMOJI')">自定义</button>
    </div>
  </Layout>
</template>

<script>
import { dispose, init } from "klinecharts";
import generatedKLineDataList from "../generatedKLineDataList";
import Layout from "@/Layout";
const dataList = generatedKLineDataList();
// const fruits = [
//   '🍏', '🍎', '🍐', '🍊', '🍋', '🍌',
//   '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
//   '🍍', '🥥', '🥝', '🥭', '🥑', '🍏'
// ]

// 自定义指标
const emojiTechnicalIndicator = {
  name: "MA",
  calcParams: [25, 60, 99],
  styles: {
    line:{
      colors: ["red", "green", "yellow", "#E11D74", "#01C5C4"],

    },
  },
  plots: [
    { key: "ma1", title: "MA25：", type: "line" },
    { key: "ma2", title: "MA60：", type: "line" },
    { key: "ma3", title: "MA99：", type: "line" },
  ],
  // 当计算参数改变时，希望提示的和参数一样，即title的值需要改变
  regeneratePlots: (params) => {
    return params.map((p, i) => {
      return { key: `ma${i + 1}`, title: `MA${p} 1`, type: "line" };
    });
  },
  // 计算结果
  calcTechnicalIndicator: (kLineDataList, calcParams, plots) => {
    // 注意：返回数据个数需要和kLineDataList的数据个数一致，如果无值，用{}代替即可。
    // 计算参数最好取回调参数calcParams，如果不是，后续计算参数发生变化的时候，这里计算不能及时响应
    const closeSums = [];
    return kLineDataList.map((kLineData, i) => {
      const ma = {};
      const close = kLineData.close;
      calcParams.forEach((param, j) => {
        closeSums[j] = (closeSums[j] || 0) + close;
        if (i >= param - 1) {
          ma[plots[j].key] = closeSums[j] / param;
          closeSums[j] -= dataList[i - (param - 1)].close;
        }
      });
      // 如果有值的情况下，这里每一项的数据格式应该是 { ma1: xxx, ma2: xxx }
      // 每个key需要和plots中的子项key对应的值一致
      return ma;
    });
  },
};

export default {
  name: "TechnicalIndicatorKLineChart",
  components: { Layout },
  data: function () {
    return {
      mainTechnicalIndicatorTypes: ["MA", "EMA", "SAR"],
      subTechnicalIndicatorTypes: ["VOL", "MACD", "KDJ"],
    };
  },
  mounted: function () {
    this.kLineChart = init("technical-indicator-k-line");
    this.kLineChart.addCustomTechnicalIndicator(emojiTechnicalIndicator);
    this.paneId = this.kLineChart.createTechnicalIndicator("VOL", false);
    this.kLineChart.applyNewData(dataList);
  },
  methods: {
    setCandleTechnicalIndicator: function (type) {
      this.kLineChart.createTechnicalIndicator(type, false, {
        id: "candle_pane",
      });
    },
    setSubTechnicalIndicator: function (type) {
      this.kLineChart.createTechnicalIndicator(type, false, {
        id: this.paneId,
      });
    },
  },
  destroyed: function () {
    dispose("technical-indicator-k-line");
  },
};
</script>
