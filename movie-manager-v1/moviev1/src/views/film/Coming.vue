<template>
    <div class="wrapper">
        <BtnGroup ref="bgRef" :groupBtns="groupBtns" @group-btn-click="onGroupBtnClick">
            <template #delete>
                <el-icon>
                    <Delete />
                </el-icon>
            </template>

            <template #export>
                <el-icon>
                    <DocumentCopy />
                </el-icon>
            </template>

            <template #add>
                <el-icon>
                    <Plus />
                </el-icon>
            </template>

        </BtnGroup>

        <!-- 表格+分页器 -->
        <EpTable ref="refEpTable" :tableData="tableData" :page-size="6" :pager-count="6" :cols="cols"
            :avgColWidth="100" @delete-item="deleteItem">

            <!-- 然后覆盖poster插槽 反正就是显示每一行的数据-->
            <template #poster="{row}">
                <div style="display:flex; align-items: center">
                    <el-image :src="row.poster" />
                </div>
            </template>

            <!-- 同理 覆盖poster插槽 -->

            <template #actors="{row}">
                <div style="display: flex; align-items:center">
                    <el-image :src="row.actors[0].avatarAddress" />
                </div>
            </template>
        </EpTable>

        <!-- 默认隐藏的对话框 -->
        <EpDialog ref="refEpDialog" :dialogMode="dialogMode">
        </EpDialog>
    </div>

</template>

<script setup>
  import {computed, ref, onMounted} from 'vue'
  import {useRouter} from 'vue-router'
import axios from 'axios';



  import {ElMessage} from 'element-plus'
  import { Plus, Close, DocumentCopy, Delete, Edit } from "@element-plus/icons-vue";
  import BtnGroup from "@/components/BtnGroup.vue";
import EpTable from "@/components/EpTable.vue";
import EpDialog from "@/components/EpDialog.vue";
import {getmovies} from "@/api/tryApi"
const router = useRouter()
// 获取子组件实例 调用子组件api
const bgRef = ref(null)
const refEpTable=ref(null)
const refEpDialog=ref(null)
//完整电影列表
let tableData = ref([])
//
    // tableData.value = response.data.list

// 组件挂载后发起ajax请求

// let getdata= ()=>{
//     // const films = await getComings()
//    return new Promise((resolve,reject)=>{
//     axios.get("/data/list").then(res => {
//       resolve(res.data)   
//           }).catch(error => {
//             console.log(error);
//           })

//    }) 

// }


// let getdatta = async ()=>{
// 	let data = await getdata()
//     tableData.value = data.list
//     console.log(data.list)


// }
onMounted(async()=>{
    let dataa = await getmovies()
    // console.log(dataa)
    tableData.value = dataa.data

})

// const fetchData = async () => {
//   try {
//     const response = await axios.get("/data/list");
//     return response.data; // 返回 axios 请求的数据部分
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// // 使用 async/await 处理异步函数
// const processData = async () => {
//   try {
//     const data = await fetchData(); // 等待 fetchData 函数完成，并获取数据
//     console.log(data.list); // 输出 data 中的 list 属性
//   } catch (error) {
//     console.error("Error processing data:", error);
//   }
// };

// 调用 processData 函数
// tableData.value = processData();


// 定义 btngroup需要的数据
const groupBtns = [
    {
        name: "删除",
        type: "danger",
        slotName:"delete",

        // 插槽名称渲染特定位置内容
        callback: "patchDelete"
        // 会出现在楼下的函数
    },
    {
        name: "导出",
		type: "success",
		slotName: "export",
		callback: "patchExport",
    },
    {
		name: "添加",
		type: "primary",
		slotName: "add",
		callback: "addComing",
	},

]

//定义事件处理逻辑
const onGroupBtnClick = callback =>{
    console.log("onGroupBtnClick",callback)
    groupBtnCallbacks[callback]()
    //很奇怪 根据callback跳出哪个函数执行哪个,何必多此一举
}

const patchExport=()=>{
    console.log("正在批量导出")
}

const addComing = ()=>{
    console.log("正在addcoming")
}

const patchDelete = ()=>{
    //确认删除对话框显示
    dialogMode.value = dialogModes.patchDelete
    //dialogmode一个响应式,patchdelete设置为删除模式
    refEpDialog.value.setDialogVisible(true)
}

//定义按钮回调功能
let groupBtnCallbacks = {
    patchDelete,
    patchExport,
    addComing
}

//表格列定义

const cols = [
    {
        prop: "filmId",
        label:"id",
        fixed:true,
        width:100,
    },
    {
        prop:"poster",
        label:"海报",
        width: 80,
		nosort: true,
		hasSlot: true,
	},
	// {
	// 	prop: "actors",
	// 	label: "导演",
	// 	width: 60,
	// 	hasSlot: true,
	// 	nosort: true,
	// },
	{
		prop: "name",
		label: "片名",
		width: 300,
	},
    {
		prop: "category",
		label: "影片类型",
		width: 200,
	},
	{
		prop: "filmType.name",
		label: "视觉",
	},
	{
		prop: "premiereAt",
		label: "首映",
		width: 150,
		formatter: (row, column, cellValue) => new Date(cellValue * 1000).toLocaleDateString().replaceAll("/", "-"),
	},
	{
		prop: "nation",
		label: "国家",
	},
	{
		prop: "grade",
		label: "评分",
	},
	{
		prop: "runtime",
		label: "时长",
	},
];
// prop在elementplus的eltable里 prop含义是与表格数据对象中某个属性相关联
// 所以prop和label必须有

//执行单个删除
const deleteId = ref(0)
const deleteItem = id=>{
    deleteId.value = id;
    dialogMode.value = dialogModes.deleteItem
    console.log("refEpDialog.value", refEpDialog.value)
    refEpDialog.value.setDialogVisible(true)
}

const doDeleteItem = async ()=>{
    //先读入要删除的id
    console.log("coming:doDeleteItem", deleteId.value)
    //将对话框隐藏
    refEpDialog.value.setDialogVisible(false)
    //调用服务端api执行删除
    // const {msg, deletedCount} = await deleteComing(deleteId.value)
   let msg="xxx"
   let deletedCount = "success"

    //使用message提示信息
    console.log("msg",msg)

    ElMessage({
        message: msg,
        type: deletedCount ? "success": "error"
    })

    if(deletedCount) {
        //修改响应式数据 让数据驱动视图 差量x
        tableData.value.find((item,index)=>{
            if(item._id === deleteId.value) {
                //等find正常返回后 再执行删除动作
                setTimeout(()=>{
                    tableData.value.splice(index,1)
                })
                return item
            }
        })
    }
}

let deleteComing = (num)=>{
    num=2
}
//执行批量删除
const doPatchDelete =()=>{
    const rows = refEpTable.value.getSelectedItems()
    console.log("coming:dopatchdelete",rows)
    refEpDialog.value.setDialogVisible(false)

    Promise.all(
        //将选中的电影数组映射为执行删除的promise数组
        rows.map(row => deleteComing(row._id))
    ).then(results=>{
        ElMessage({
            message: '批量删除成功',
            type:"success"
        })

        //数据驱动视图???
        window.location.reload()
    })
    .catch(err=>{
        ElMessage({
            message: err,
            type: "error",
        })
    })

}

const dialogModes = {
    //单个删除
    deleteItem:{
        msg:"确认删除电影吗",
        callback: doDeleteItem,
    },
//批量删除
    patchDelete: {
msg:"确认执行批量删除吗",
callback:doPatchDelete,
    }
}

//默认使用单个删除模式
let dialogMode = ref(dialogModes.deleteItem)
</script>
<style lang="scss" scoped>
.wrapper {
	width: calc(1000px - 1rem * 2);
	// height: 800px;
	// overflow: scroll;
}
</style>
