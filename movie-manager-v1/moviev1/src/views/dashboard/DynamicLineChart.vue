<template>
  <div class="stat-main" ref="mainRef"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const mainRef = ref(null);

function createRandomData(n) {
  const data = [];
  const names = [];
  for (let i = 0; i < n; i++) {
    names.push(i + 1);
    data.push(5000 + parseInt(Math.random() * 5000));
  }
  return { names, data };
}

const { data, names } = createRandomData(30);

var myChart;
var option = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: names,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: data,
      type: "line",
      smooth: true,
      areaStyle: {
        color: `rgb(${parseInt(Math.random()*256)}, ${parseInt(Math.random()*256)}, ${parseInt(Math.random()*256)}, 0.5)`,
      },
    },
  ],
};

let timer;
onMounted(() => {
  myChart = echarts.init(mainRef.value);
  option && myChart.setOption(option);

  timer = setInterval(() => {
    let last = option.series[0].data[option.series[0].data.length - 1];
    option.series[0].data.shift();

    let delta = parseInt(
      last * Math.random() * 0.2 * (Math.random() > 0.5 ? 1 : -1)
    );
    let latest = last + delta;
    // console.log(last, latest);

    option.series[0].data.push(latest);

    myChart.setOption({
      series: [
        {
          type: "line",
          data: option.series[0].data,
        },
      ],
    });
    
  }, 1000);
});

onUnmounted(() => {
  timer && clearInterval(timer);
  // timer &&：这个部分是为了确保在 timer 存在时才调用 clearInterval
});
</script>

<style>
.stat-main {
  height:450px;
}
</style>
