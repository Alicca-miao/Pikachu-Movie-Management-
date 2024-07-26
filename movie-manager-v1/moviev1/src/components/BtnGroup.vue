<template>
	<div class="card top">

		<el-button
			v-for="(btn, index) in groupBtns"
			class="opBtn"
			:type="btn.type"
			@click="emit(`groupBtnClick`, btn.callback)"
			
			:disabled="disabledArr[index]">
			
			<slot :name="btn.slotName">
				<!-- 这里代表是slotname里的default，loading还是icon？自定义默认内容，加载中组件 -->
				 <!-- 这里显示的是父组件那个传入的参数？ -->
				<el-icon><Menu /></el-icon>
			</slot>

			&nbsp;{{ btn.name }}
		</el-button>

	</div>
</template>

<script setup>
import { Menu, Delete, Edit } from "@element-plus/icons-vue";
import { defineProps, defineEmits, ref, defineExpose } from "vue";

const { groupBtns } = defineProps({
	groupBtns: Array,
});

const emit = defineEmits({
	groupBtnClick: null,
});

const disabledArr = ref([]);
const disableBtn = index => {
	console.log("disableBtn called", index);
	disabledArr.value[index] = true;
};

/* 父组件调用子组件暴露出来的API：xxRef.value.disableBtn(0) */
defineExpose({
	disableBtn,
});
</script>

<style lang="scss" scoped>
.top {
	display: flex;
	justify-content: flex-end;
	.opBtn {
		width: 100px;
	}
}
</style>
