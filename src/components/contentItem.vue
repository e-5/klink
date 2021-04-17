<template>
  <div>
    <div v-if="data && data.data.length">
      <KLinkComponent :data="data.data" :title="data.period" :pIndex="pIndex" />
    </div>
    <div v-show="!(data && data.data.length)" class="k-line-chart-container"></div>
  </div>
</template>
<script>
import KLinkComponent from "@/components/KLineComponent";
export default {
  name: "contentItem",
  props: ["data", "pIndex"],
  components: {
    KLinkComponent,
  },
  data() {
    return {
      loading: null,
    };
  },
  mounted() {
    this.initC();
  },
  watch: {
    data() {
      this.loading && this.loading.close();
      this.loading = null;
      if (!this.data.data.length) {
        this.initC();
      }
    },
  },
  methods: {
    initC() {
      const _dom = document.getElementsByClassName("k-line-chart-container")[
        this.pIndex
      ];
      this.loading = this.$loading({
        target: _dom,
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
  },
};
</script>
<style scoped>
</style>