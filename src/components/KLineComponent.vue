<template>
  <Layout :title="title || ''">
    <div :id="id" class="k-line-chart"></div>
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
    };
  },
  created() {
    this.id = `basic-k-line${this.pIndex || 0}`;
  },
  mounted() {
    // this.kLineChart = init(this.id);
    // this.kLineChart.applyNewData(this.data || generatedKLineDataList());
    this.kLineChart = init(this.id);
    // this.kLineChart.addCustomTechnicalIndicator(emojiTechnicalIndicator);
    this.paneId = this.kLineChart.createTechnicalIndicator("MA", false);
    this.kLineChart.applyNewData(this.data);
  },
  watch: {
    data() {
      // this.kLineChart.applyNewData(this.data || generatedKLineDataList());
      this.kLineChart.applyNewData(this.data);
    },
  },
  methods: {},
  destroyed: function () {
    dispose("chart-type-k-line");
  },
};
</script>
<style scoped>
</style>