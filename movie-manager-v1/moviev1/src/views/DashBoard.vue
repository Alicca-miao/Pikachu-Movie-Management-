<template>
    <div>
       
        <!-- <DynamicLineChart></DynamicLineChart> -->

        <el-row :gutter="12">
            <el-col :span="12">
                <el-card class="statistics" shadow="always">
                    <template #header>
                        <h4 class="title">实时票房排行</h4>
                    </template>
                    <DynamicBarChart></DynamicBarChart>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card shadow="hover" class="statistics">
                    <template #header>
                        <h4 class="title">实时在线用户数</h4>
                    </template>
                    <DynamicLineChart></DynamicLineChart>
                </el-card>
            </el-col>
        </el-row>

        <div style="height:15px;"></div>

        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="always" class="statistics">
                    <template #header>
                        <h4 class="title">实时观影人数</h4>
                    </template>
                    <DynamicLineChart></DynamicLineChart>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card shadow="hover" class="statistics">
                    <template #header>
                        <h4 class="title">城市票房比例</h4>
                    </template>
                    <DynamicPie></DynamicPie>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import DynamicBarChart from "@/views/dashboard/DynamicBarChart.vue";
import DynamicLineChart from "@/views/dashboard/DynamicLineChart.vue";
import DynamicPie from "@/views/dashboard/DynamicPie.vue";
</script>

<style>
.statistics {
    height:400px;
}

</style>
