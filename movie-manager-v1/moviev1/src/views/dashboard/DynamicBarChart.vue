<template>
  <div class="stat-main" ref="mainRef"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from "echarts";

const mainRef = ref(null);

/* 初始化数据 */
const data = [];
for (let i = 0; i < 10; ++i) {
  data.push(Math.round(Math.random() * 200));
}
console.log("data=", data);

/* 选项 */
let myChart;
// #dd6b66
const countryColors = {
  A: "#00008b",
  B: "#f00",
  C: "#ffde00",
  D: "#002a8f",
  E: "#003580",
  F: "#ed2939",
  G: "#000",
  H: "#003897",
  I: "#f93",
  J: "#bc002d",
};
const option = {
  xAxis: {
    max: "dataMax",
  },

  yAxis: {
    type: "category",
    data: ["阿丽塔", "绿皮书", "我叫为何", "夏目友人帐", "驯龙高手3", "惊奇队长", "转型团伙", "罗马", "封神", "飘"],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 9, // only the largest 3 bars will be displayed
  },

  series: [
    {
      realtimeSort: true,
      name: "X",
      type: "bar",
      itemStyle: {
        color: function (param) {
          // console.log("itemStyle", param);
          return countryColors[param.name] || "#5470c6";
        },
      },
      data: data,
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
      },
    },
  ],

  legend: {
    show: false,
  },

  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
};

function run() {
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }

  myChart.setOption({
    series: [
      {
        type: "bar",
        data,
      },
    ],
  });
}

let timer;
onMounted(() => {
  myChart = echarts.init(mainRef.value);
  // 这行代码初始化了一个 ECharts 实例，将其绑定到 mainRef.value 引用的 DOM 元素上

  setTimeout(function () {
    run();
  }, 0);

  timer = setInterval(function () {
    run();
  }, 8000);

  option && myChart.setOption(option);
});

onUnmounted(() => {
  timer && clearInterval(timer);
});
</script>

<style>
.stat-main {
  height:450px;
  width:auto
}
</style>
