<template>
	<template v-for="(item, idx) in menu" :key="`${parentIndex}${idx}`">
		<!-- 渲染菜单项 -->
		<RouterLink v-if="!item.submenu" :to="item.path">
			<el-menu-item :index="`${parentIndex}${idx}`">
				<el-icon v-if="item.iconName">
					<EpIcon :icon="icons[item.iconName]" />
				</el-icon>
				<template #title>
					{{ item.name }}
				</template>
			</el-menu-item>
		</RouterLink>

		<!-- 渲染子菜单 -->
		<el-sub-menu v-else :index="`${parentIndex}${idx}`">
			<template #title>
				<el-icon v-if="item.iconName">
					<EpIcon :icon="icons[item.iconName]" />
				</el-icon>
				<span>{{ item.name }}</span>
			</template>

			<!-- 对子菜单实施递归 -->
			<EpMenuUnit :menu="item.submenu" :parentIndex="`${parentIndex}${idx}-`" />
		</el-sub-menu>
	</template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import EpIcon from './EpIcon.vue';
import EpMenuUnit from './EpMenuUnit.vue';
import { Document, Menu, Location, User, Film, VideoCamera, Odometer, Loading, Star, PictureFilled, PieChart, Grid } from '@element-plus/icons-vue';

// Define icons
const icons = {
	Document,
	Menu,
	Location,
	User,
	Film,
	VideoCamera,
	Odometer,
	Loading,
	Star,
	PictureFilled,
	PieChart,
	Grid
};

// Define props
const props = defineProps<{
	activeIndex: string;
	menu: any[];
	parentIndex: string;
}>();

const { activeIndex, menu, parentIndex } = props;
</script>

<style lang="scss" scoped>
/* Add your styles here */
</style>
