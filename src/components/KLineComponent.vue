<template>
  <Layout :title="title || ''">
    <div :id="id" class="k-line-chart"></div>
    <div class="k-line-chart-menu-container">
      <button
        v-for="type in mainTechnicalIndicatorTypes"
        :key="type"
        v-on:click="setCandleTechnicalIndicator(type)"
      >
        {{ type }}
      </button>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/Layout";
import { init, dispose } from "klinecharts";
// import generatedKLineDataList from "@/generatedKLineDataList";
export default {
  name: "",
  props: ["pIndex", "data", "title"],
  components: { Layout },
  data() {
    return {
      id: "",
      kLineChart: {},
      mainTechnicalIndicatorTypes: ["MA", "EMA"],
    };
  },
  created() {
    this.id = `basic-k-line${this.pIndex || 0}`;
  },
  mounted() {
    const dataList = this.data;
    const emojiTechnicalIndicator = {
      name: "MA",
      calcParams: [25, 60, 99],
      styles: {
        line: {
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
        return kLineDataList.map((kLineData = {}, i) => {
          const ma = {};
          const close = kLineData.close || 0;
          calcParams.forEach((param, j) => {
            closeSums[j] = (closeSums[j] || 0) + close;
            if (i >= param - 1) {
              ma[plots[j].key] = closeSums[j] / param;
              closeSums[j] -= (dataList[i - (param - 1)] || {}).close;
            }
          });
          // 如果有值的情况下，这里每一项的数据格式应该是 { ma1: xxx, ma2: xxx }
          // 每个key需要和plots中的子项key对应的值一致
          return ma;
        });
      },
    };
    // this.kLineChart = init(this.id);
    // this.kLineChart.applyNewData(this.data || generatedKLineDataList());
    this.kLineChart = init(this.id);
    this.kLineChart.addCustomTechnicalIndicator(emojiTechnicalIndicator);
    // this.paneId = this.kLineChart.createTechnicalIndicator("MA", true, {
    //   id: this.id,
    // });
    this.kLineChart.createTechnicalIndicator("MA", false, {
      id: "candle_pane",
    });
    this.kLineChart.createTechnicalIndicator('EMA', false, { id: this.id })
    this.kLineChart.applyNewData(dataList);
  },
  watch: {
    data() {
      // this.kLineChart.applyNewData(this.data || generatedKLineDataList());
      this.kLineChart.applyNewData(this.data);
    },
  },
  methods: {
    setCandleTechnicalIndicator: function (type) {
      this.kLineChart.createTechnicalIndicator(type, false, {
        id: "candle_pane",
      });
    },
  },
  destroyed: function () {
    dispose("chart-type-k-line");
  },
};
</script>
<style scoped>
</style>