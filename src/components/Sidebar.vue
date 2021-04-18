<template>
  <div name="13" :style="astyle" v-if="dataList.length">
    <div class="as-title">
      <div class="img" :style="istyle" @click="handerIMG">
        <img :src="Right" alt="" />
      </div>
    </div>
    <div class="item" v-for="(v, i) in dataList" :key="i">
      <div class="title">
        <div class="bs">
          <span @click="handel(v.title)">
            {{ v["title"].toLocaleUpperCase() }}
          </span>
        </div>
      </div>
      <div v-show="open">
        <div class="row" v-for="(val, _i) in v.data" :key="_i">
          <div class="col" v-for="(value, _i1) in val" :key="_i1">
            {{ value }} <span v-if="_i1 % 2 == 0">：</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Right from "../image/right.png";
export default {
  name: "Sidebar",
  components: {},
  props: ["dataList"],
  data() {
    return {
      Right,
      open: true,
      astyle: {
        width: "20%",
      },
      istyle: {
        transform: "rotate(180deg)",
      },
    };
  },
  methods: {
    handel(title) {
      this.$emit("getTitle", title);
    },
    handerIMG() {
      this.open = !this.open;
      this.astyle.width = this.open ? "20%" : "90px";
      this.istyle.transform = this.open ? "rotate(180deg)" : "rotate(0deg)";
      this.$emit("onChange", this.open);
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
.as-title {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: #fff;
  padding: 0 20px;
  padding-top: 20px;
}
.as-title .img {
  transition: all linear 0.3s;
  transform: rotate(180deg);
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.as-title .img img {
  width: 100%;
  height: 100%;
}
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
  padding: 5px;
}
.item .title .bs span {
  cursor: pointer;
}
</style>