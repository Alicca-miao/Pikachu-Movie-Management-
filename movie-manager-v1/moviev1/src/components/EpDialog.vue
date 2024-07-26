<template>
	<el-dialog
		v-model="dialogVisible"
		title="操作确认"
		width="30%">
		<!-- 显示【当前模式的提示信息】 -->
		<span>{{ dialogMode.msg }}</span>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>

				<!-- 用户点击确认时执行【当前模式对应的回调】 -->
				<el-button
					type="primary"
					@click="dialogMode.callback">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const { dialogMode } = defineProps({
	dialogMode: Object,
});

// 对话框显隐控制
const dialogVisible = ref(false);

const setDialogVisible = value => (dialogVisible.value = value);

defineExpose({
	setDialogVisible,
});
</script>

<style lang="scss" scoped></style>
