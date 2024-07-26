<!-- <template>
  <div class="wrapper">
    <h3 class="title">UserList</h3>
    <Eptable
         :tableData = "tableData"
         :page-size = "10"
         :cols = "cols"
         :fixedCol = "{prop:`username`,label:`用户名`}"
    >

    </Eptable>


  </div>

</template>

<script setup>
import {ref, onMounted} from 'vue'
import {getUsers} from "@/api/userApi"
import EpTable from "@/components/EpTable.vue"

const tableData = ref([])
onMounted(
    async () =>{
        const users = await getUsers()
        console.log("users=", users)
        tableData.value = users
    }
)

const cols = [
    {
        prop:"username",
        label:"用户名",
        fixed:true,
        width:300,

    },
    {
        prop:"password",
        label:"密码",
        width:300,
    },
    {
       prop:"admin",
       label:"管理员",
       width:300,
    }
]

</script>

<style>

</style> -->
<template>
    <div class="wrapper">
        <h3 class="title">UserList</h3>

        <!-- 表格+分页器 -->
        <EpTable :table-data="tableData" :page-size="10" :cols="cols" :fixed-col="{ prop: 'username', label: '用户名' }">
        </EpTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { getUsers } from "@api/userApi";
import EpTable from "@/components/EpTable.vue";
import axios from 'axios'

// 表格数据
const tableData = ref([]);

// 列配置
const cols = [
    {
        prop: "username",
        label: "用户名",
        fixed: true,
        width: 300,
    },
    {
        prop: "password",
        label: "密码",
        width: 300,
    },
    {
        prop: "admin",
        label: "管理员",
        width: 300,
    },
];

onMounted(async () => {
    let dataa = await axios.get('/api/users');
    //少了个await
    tableData.value = dataa.data.users;
    console.log("users=", tableData.value);

    // tableData.value = users;
});
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    padding: 20px;
}

.title {
    margin-bottom: 20px;
}
</style>
