<template>
    <div class="wrapper">

        <!-- 批量操作 -->
        <div class="card top">
            <!-- 不是管理员就隐藏 v-if="$store.getters.isAdmin"-->
            <el-button  class="opBtn" type="danger" @click="patchDelete">
                <el-icon>
                    <Close />
                </el-icon>&nbsp;删除
            </el-button>

            <!-- v-admin -->
            <el-button class="opBtn" type="success"><el-icon>
                    <DocumentCopy />
                </el-icon>&nbsp; 导出</el-button>

            <el-button class="opBtn" type="primary" @click="addPlaying">
                <el-icon>
                    <Plus />
                </el-icon>
                &nbsp; 添加
            </el-button>
        </div>

        <el-table :data="computedData" stripe class="middle" style="width:100%"
            :default-sort="{ prop: 'date', order: 'ascending' }" @selection-change="handleSelectionChange">
            <!-- 多选显示烂 -->
            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column sortable fixed prop="filmId" label="id" width="100">

            </el-table-column>
            <!-- 片名 -->
            <el-table-column sortable prop="name" label="片名" width="180">
                <!-- 后续传值时候 name=。。。 -->
            </el-table-column>
            <el-table-column prop="poster" label="海报" width="60">

                <template #default="{ row: { poster } }">
                    <div style="display:flex;align-items:center">
                        <el-image :src="poster" />

                    </div>

                </template>

            </el-table-column>

            <el-table-column sortable prop="actors" label="主演" :formatter="formatActors" width="200">

            </el-table-column>
            <!-- 国家 -->
            <el-table-column sortable prop="nation" label="国家" width="150" />

            <!-- 类型 -->
            <el-table-column sortable prop="category" label="类型" width="150" />

            <!-- 片长 -->
            <el-table-column sortable prop="runtime" label="片长" width="100" />

            <!-- 评分 -->
            <el-table-column sortable prop="grade" label="评分" width="100" />

            <!-- 首映日期 -->
            <el-table-column sortable prop="premiereAt" label="首映日期" :formatter="formatPremierAt" width="150" />

            <!-- 右侧固定蓝操作按钮 -->
            <el-table-column fixed="right" label="操作" width="90">
                <template #default="{ row: { _id } }">
                    <!-- 点击edit按钮 携带id跳转详情页 -->
                    <el-button type="primary" :icon="Edit" circle size="small">

                    </el-button>

                    <!-- 触发单个影片删除 -->
                    <el-button @click="deleteItem(_id)" type="danger" :icon="Delete" circle size="small">

                    </el-button>


                </template>
            </el-table-column>

        </el-table>

        <div class="card bottom">
            <!-- <el-pagination
            background
            layout="prev,paper,next"
            :page-size="10"
            :total="tableData.length"
            v-model:current-page="currentPage"
            >
            </el-pagination> -->

            <el-pagination background layout="prev, pager, next" :page-size="pageSize" :pager-count="4" :total="tableData.length"
                v-model:current-page="currentPage"></el-pagination>

        </div>
        <!-- 默认隐藏的对话框 -->
        <!-- ：before-close="handleclose" -->
        <el-dialog v-model="dialogVisible" title="操作方式" width="30%">
            <span>{{ dialogMode.msg }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <!-- 用户点击确认时执行 当前模式对应的回调 -->
                    <el-button type="primary" @click="dialogMode.callback">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>


    </div>

</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import axios from 'axios'
import { getfilms } from '@/api/tryApi'
import EpTable from "@/components/EpTable.vue";
import { ElMessage } from "element-plus";
import { Plus, Close, DocumentCopy, Delete, Edit } from "@element-plus/icons-vue";

// import { getPlayings, deletePlaying } from "@api/movieApi";
//$router.push('/film/add')
// const router = useRouter()

//完整的电影列表
const tableData = ref([])



onMounted(async()=>{
    let films = await getfilms()
    tableData.value=films.data
})


//要显示的分页数据

const currentPage = ref(1)
const computedData = computed(() => {
    return tableData.value.slice((currentPage.value - 1) * 8, currentPage.value * 8)
})

//组件挂载完毕后发起ajax请求
// onMounted(async ()=>{
//     const films = await getPlayings()
//     console.log("films=",films)
//     tableData.value =films
// })

//数据格式化函数
const formatPremierAt = (row, column, cellValue, index) => {
    return new Date(cellValue * 1000).toLocaleDateString().replaceAll("/", "-")
}

const formatActors = (row, column, cellValue, index) => {
    return (cellValue
        .map(actor => actor.name)
        .slice(0, 3)
        .join(",") + "etc."

    )
}

const formatPoster = scope => console.log("formatPoster", scope)
//多选时此处能拿到选中的子数组
const selectedItems = ref([])
const handleSelectionChange = val => {
    console.log("handleSelectionChange", val)
    selectedItems.value = val
}
//执行单个删除
const doDeleteItem = async () => {
    console.log("doDeleteItem", deleteId.value)
    //将对话框隐藏
    dialogVisible.value = false;
    //调用服务端 api执行删除
    const { msg, deletedCount } = await deletePlaying(deleteId.value)
    console.log("msg=", msg)
    //使用 message提示信息
    ElMessage({
        message: msg,
        type: deletedCount ? "success" : "error"
    })

    if (deletedCount) {
        tableData.value.find((item, index) => {
            if (item._id === deleteId.value) {
                //等find正常返回后 执行删除动作
                setTimeout(() => {
                    tableData.value.splice(index, 1)
                })

                return item
            }
        })
    }
}
//执行批量删除

const doPatchDelete = () => {
    dialogVisible.value = false

    console.log("doPatchDelete")
    Promise.all(
        //将选中的电影数组映射为执行删除的promise数组
        selectedItems.value.map(film => deletePlaying(film._id))
    )

        .then(results => {
            ElMessage({
                message: "批量删除成功",
                type: "success"
            })

            //数据驱动视图 
            window.location.reload()
        })
        .catch(err => {
            ElMessage({
                message: err,
                type: "error"
            })
        })
}

//对话框显隐控制
const dialogVisible = ref(false)
//对话框模式
const dialogModes = {
    //单个删除模式
    deleteItem: {
        msg: "确认删除影吗",
        callback: doDeleteItem
    },
    patchDelete: {
        msg: "确认执行批量删除吗",
        callback: doPatchDelete
    }

}

let dialogMode = ref(dialogModes.deleteItem)

//删除单个
const deleteId = ref(0)
const deleteItem = id => {
    //将要删除的id存起来
    deleteId.value = id

    // 确认删除对话框显示
    dialogMode.value = dialogModes.deleteItem
    dialogVisible.value = true
}

//批量删除
const patchDelete = () => {
    dialogMode.value = dialogModes.patchDelete
    dialogVisible.value = true
}

//添加影片
const addPlaying = () => {
    router.push("/film/add")
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: calc(1000px - 1rem * 2);
    // height: 800px;
    // overflow: scroll;

    .top {
        display: flex;
        justify-content: flex-end;

        .opBtn {
            width: 100px;
        }
    }

    .middle {
        margin: 10px 0;
    }

    .bottom {
        padding: 5px;
    }
}
</style>