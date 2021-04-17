<template>
  <div class="loading">
    <img :src="Loading" alt="" />
  </div>
</template>
<script>
import Loading from "./loading.gif";
export default {
  name: "",
  props: {},
  data() {
    return {
      Loading,
    };
  },
  methods: {},
};
</script>
<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>