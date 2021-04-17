<template>
  <div>
    <div v-if="data && data.data.length">
      <KLinkComponent :data="data.data" :title="data.period" :pIndex="pIndex" />
    </div>
    <div v-show="!(data && data.data.length)" class="k-line-chart-container">
      <Loading />
    </div>
  </div>
</template>
<script>
import KLinkComponent from "@/components/KLineComponent";
import Loading from "@/components/Loading/Loading";
export default {
  name: "contentItem",
  props: ["data", "pIndex"],
  components: {
    KLinkComponent,
    Loading,
  },
  data() {
    return {
      loading: null,
    };
  },
  mounted() {},
  watch: {
    data() {},
  },
  methods: {
    initC() {},
  },
};
</script>
<style scoped>
</style>