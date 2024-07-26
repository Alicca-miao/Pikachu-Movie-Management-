<template>
  <div class="stat-main" ref="mainRef"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const mainRef = ref(null);

//创建需要使用的数据
function createRandomData(n) {
  const data = [];
  // const names = [];
  for (let i = 0; i < n; i++) {
    // names.push(i + 1);
    data.push(5000 + parseInt(Math.random() * 5000));
  }
  return data;
}

const data = createRandomData(7);

var myChart;
var option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: data[0],
          name: '北京'
        },
        {
          value: data[1],
          name: '上海'
        },
        {
          value: data[2],
          name: '广州'
        },
        {
          value: data[3],
          name: '深圳'
        },
        {
          value: data[4],
          name: '江苏'
        },
        {
          value: data[5],
          name: '成都'
        },
        {
          value: data[6],
          name: '厦门'
        }

      ],
      roseType: 'area'
    }
  ]
};

let timer;
onMounted(() => {
  myChart = echarts.init(mainRef.value);
  option && myChart.setOption(option);

  timer = setInterval(() => {
    let last = option.series[0].data[option.series[0].data.length - 1].value;
    let tmp = option.series[0].data[0].name
    option.series[0].data.shift();

    let delta = parseInt(
      last * Math.random() * 0.2 * (Math.random() > 0.5 ? 1 : -1)
    );
    let latest = {
      name: tmp,

      value: last + delta
    };
    // console.log(last, latest);

    option.series[0].data.push(latest);

    myChart.setOption({
      series: [
        {
          type: "pie",
          data: option.series[0].data,
        },
      ],
    });

  }, 1000);
});

onUnmounted(() => {
  timer && clearInterval(timer);
});
</script>

<style>
.stat-main {
  height:450px;
  /* width:1000px */
}
</style>
