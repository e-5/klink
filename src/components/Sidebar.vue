<template>
  <el-aside width="20%">
    <div class="item" v-for="(v, i) in dataList" :key="i">
      <div class="title">
          <div class="bs">{{v['quote-currency'].toLocaleUpperCase()}}</div>
      </div>
    </div>
  </el-aside>
</template>
<script>
export default {
  name: "",
  components: {},
  props: ["dataList"],
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  updated() {},
  watch: {
    dataList() {
    //   console.log(this.dataList);
    },
  },
};
</script>
<style scoped>
.item {
  width: 100%;
  margin-top: 15px;
}
.item .title .bs {
    margin-left: 5px;
    border-left: 3px solid rgb(35, 131, 255);
    color: rgb(212, 212, 212);
    padding: 5px;
}
</style>