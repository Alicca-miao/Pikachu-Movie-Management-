<template>
	<div id="table-wrapper" ref="refWrapper">
		<el-table ref="refTable" :data="getPageData(tableData)" stripe class="middle wrapper" style="width: 100%"
			:default-sort="{ prop: 'date', order: 'ascending' }" @selection-change="handleSelectionChange">
			<!-- 多选显示栏 -->
			<!-- stripe 是否为斑马条纹 -->
			<el-table-column type="selection" width="40" />

			<!-- fixed固定 sortable字段可排序 label=当前列标题 width当前列像素宽度 -->
			<!-- <el-table-column
			sortable
			fixed
			:prop="fixedCol.prop"
			:label="fixedCol.lable"
			width="100" /> -->

			<!-- 列 -->
			<el-table-column v-for="{ prop, label, fixed, width, formatter, hasSlot, nosort } in cols"
				:sortable="nosort ? false : true" :fixed="fixed" :prop="prop" :label="label"
				:width="width ? width : avgColWidth ? avgColWidth : defColWidth" :formatter="formatter">
				<template v-if="hasSlot" #default="{ row }">
					<!-- 已知 row是设置这一行数据的，这里是作为父组件传下去 -->
					<slot :name="prop" :row="row"></slot>
					<!-- 诡异的不知这里:row="row"和#default="{row}"用的是同一个吗？ -->

				</template>
			</el-table-column>

			<!-- 海报 -->
			<!-- <el-table-column
			prop="poster"
			label="海报"
			width="60">
			<template #default="{ row: { poster } }">
				<div style="display: flex; align-items: center">
					<el-image :src="poster" />
				</div>
			</template>
		</el-table-column> -->

			<!-- 右侧固定的操作按钮区 -->
			<el-table-column fixed="right" label="操作" width="90">
				<!-- action按钮区作用域插槽提供的数据中含有当前行信息row -->
				<!-- <template #default="scope"> -->

				<!-- 可以通过简单的测试查看一下作用域插槽中携带的数据 -->
				<!-- <el-button @click="showScope(scrope)"/> -->

				<!-- 从作用域插槽数据中解构出当前行id -->
				<template #default="{ row: { filmId } }">
					<!-- 点击Edit按钮 携带id跳转详情页 $router.push(`/film/${_id}`)-->
					<!-- hanshu(filmId)这里将_id修改成filmId就好了 -->
					<el-button @click="$router.push(`/film/${filmId}`)" type="primary" :icon="Edit" circle
						size="small" />

					<!-- 触发单个影片删除 -->
					<el-button @click="deleteItem(_id)" type="danger" :icon="Delete" circle size="small" />
				</template>
			</el-table-column>
		</el-table>
	</div>

	<div class="card bottom">
		<el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="tableData.length"
			v-model:current-page="currentPage" />
	</div>
</template>

<script setup>
import { /* nextTick, computed, */ ref, onMounted, defineExpose } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElTable, ElMessage } from "element-plus";
// import { deleteComing } from "@api/movieApi";
// import EpDialog from "./EpDialog.vue";

const { tableData, pageSize, fixedCol, cols, colWidth, avgColWidth } = defineProps({
	tableData: Array,
	pageSize: Number,
	fixedCol: Object,
	cols: Array,
	avgColWidth: Number,
});

// let hanshu = (filmId)=>{
// 	console.log(filmId)
// }
const emit = defineEmits({
	deleteItem: null ,
	// 匹配一个长度为 24 的由小写字母和数字组成的字符串。
	//调用了正则表达式对象的 test 方法，将 id 作为参数传入。
	//该方法会返回一个布尔值，表示 id 是否符合正则表达式的模式。
	//\d 是一个特殊的元字符，表示匹配任何数字字符
	patchDelete: null,
});

/* 1.0 */
// const emit = defineEmits({
// 	pageChange: null,
// });

/* 多选时此处能拿到选中的子数组 */
const selectedItems = ref([]);
const getSelectedItems = () => selectedItems.value;

const handleSelectionChange = val => {
	console.log("handleSelectionChange", val);
	selectedItems.value = val;
};

/* 获取分页数据 */
const currentPage = ref(1);
const getPageData = arr => {
	console.log("getPageData,arr=", arr);
	console.log("getPageData,tableData=", tableData);
	return arr.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize);
};

/* 默认列宽 */
const refWrapper = ref(null);
const defColWidth = ref(100);
onMounted(() => {
	console.log("refTable.value=", refWrapper.value.clientWidth);
	defColWidth.value = Math.round(refWrapper.value.clientWidth / 4);
});


/* 删除单个 */
const deleteItem = id => {
	emit("deleteItem", id);
};

defineExpose({
	getSelectedItems,
});
</script>

<style lang="scss" scoped>
.card {
	padding: 10px;
	background-color: white;
	border-radius: 5px;
}

.middle {
	margin: 10px 0;
}

.bottom {
	padding: 5px;
}

.wrapper {
	width: 100%;
}
</style>
