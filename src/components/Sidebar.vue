<template>
  <el-aside name="13" width="20%" v-if="dataList.length">
    <div class="item" v-for="(v, i) in dataList" :key="i">
      <div class="title">
        <div class="bs" @click="handel(v.title)">
          {{ v["title"].toLocaleUpperCase() }}
        </div>
      </div>
      <div class="row" v-for="(val, _i) in v.data" :key="_i">
        <div class="col" v-for="(value, _i1) in val" :key="_i1">
          {{ value }} <span v-if="_i1 % 2 == 0">：</span>
        </div>
      </div>
    </div>
  </el-aside>
</template>
<script>
export default {
  name: "Sidebar",
  components: {},
  props: ["dataList"],
  data() {
    return {};
  },
  methods: {
    handel(title) {
      this.$emit("getTitle", title);
    },
  },
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
  color: rgb(212, 212, 212);
}
.item .row {
  display: flex;
  padding-left: 15px;
  font-size: 12px;
}
.item .row .col {
  margin-right: 10px;
}
.item .title {
  font-size: 18px;
}
.item .title .bs {
  margin-left: 5px;
  border-left: 3px solid rgb(35, 131, 255);
  cursor: pointer;
  padding: 5px;
}
</style>