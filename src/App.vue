<template>
  <div id="app" class="app">
    <Sidebar class="Sidebar" :dataList="TransactionInfo" />
    <div class="contentMain">
      <div v-for="(val, i) in dataList" :key="i">
        <KLinkComponent :data="val.data" :title="val.period" :pIndex="i" />
      </div>
    </div>
  </div>
</template>

<script>
import KLinkComponent from "@/components/KLineComponent";
import Sidebar from "@/components/Sidebar";
import moment from "moment";

export default {
  name: "App",
  components: {
    KLinkComponent,
    Sidebar,
  },
  data: () => ({
    dataList: [
      // 1min 5min 60min 4hour 1week 1mon
      { period: "1min", data: [] },
      { period: "5min", data: [] },
      { period: "60min", data: [] },
      { period: "4hour", data: [] },
      { period: "1week", data: [] },
      { period: "1mon", data: [] },
    ],
    TransactionInfo: [],
  }),
  created() {
    this.getContentData();
    this.getTransactionInfo();
  },
  async mounted() {},
  methods: {
    getContentData() {
      this.dataList.forEach(async (item, index) => {
        const res = await this.$req({
          url: "/swap-ex/market/history/kline",
          data: {
            period: item.period,
            size: 2000,
            // symbol: "btcusdt",
            contract_code: "BTC-USD",
          },
        });
        if (res.status === "ok") {
          this.dataList[index].data = res.data.map((item) => ({
            ...item,
            timestamp: item.id * 1000,
            volume: item.vol,
          }));
        }
      });
    },
    async getTransactionInfo() {
      const res = await this.$req({
        url: "/linear-swap-api/v1/swap_contract_info",
        // baseUrl:'api.hbdm.vn',
      });
      if (res.status === "ok") {
        console.log(res);
        res.data = res.data.map((item) => {
          console.log(item.settlement_date);
          console.log(
            moment(new Date(1618646400000)).format("YYYY-MM-DD HH:mm:ss")
          );
          item.settlement_date = moment(
            new Date(Number(item.settlement_date))
          ).format("YYYY-MM-DD HH:mm:ss");
          const data = [];
          for (let key in item) {
            if (!["support_margin_mode", "symbol"].includes(key)) {
              const obj = [];

              obj.push(key.toLocaleUpperCase());
              obj.push(item[key]);
              data.push(obj);
            }
          }
          return {
            title: item.symbol,
            data,
          };
        });
        this.TransactionInfo = res.data;
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #191919;
}

div,
p {
  box-sizing: border-box;
}

p {
  margin: 0;
}

.Sidebar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
.Sidebar::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}
.Sidebar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(25, 25, 25，1);
  background-color: #555;
}
/* .Sidebar::-webkit-scrollbar {
  display: none;
} */
.Sidebar {
  width: 20%;
  background-color: #1f2126;
  height: 100vh;
  overflow-y: scroll;
  position: fixed;
  left: 0;
  top: 0;
}
.contentMain {
  margin-left: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 15px;
  width: 80%;
}
.app {
  display: flex;
}
.k-line-chart-container {
  display: flex;
  flex-direction: column;
  margin: 60px 0;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #1f2126;
  width: 700px;
  height: 440px;
  padding: 16px 6px 16px 16px;
}

.k-line-chart-title {
  margin: 0;
  color: #e6e8ea;
  padding-bottom: 10px;
}

.k-line-chart {
  display: flex;
  flex: 1;
}
.k-line-chart-menu-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: #929aa5;
}
.k-line-chart-menu-container button {
  cursor: pointer;
  background-color: #2196f3;
  border-radius: 2px;
  margin-right: 8px;
  height: 24px;
  line-height: 26px;
  padding: 0 6px;
  font-size: 12px;
  color: #fff;
  border: none;
  outline: none;
}
</style>
