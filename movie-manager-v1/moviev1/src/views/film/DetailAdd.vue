<template>
	<el-card v-loading="loading">
		<template #header>
			<div class="card-header">
				<span>影片详情</span>
				<!-- <el-button class="button" text>Operation button</el-button> -->
			</div>
		</template>

		<!-- 详情表单 -->
		<!-- form没有数据时不渲染form -->
		<el-form v-if="form[`name`] !== undefined" :model="form" label-width="120px">
			<!-- 片名关联form.name -->

			<el-form-item label="片名">
				<el-input v-model="form.name" />
			</el-form-item>

			<!-- 片长关联form.runtime -->
			<el-form-item label="片长">
				<el-col :span="7">
					<el-input v-model="form.runtime" type="number" />
				</el-col>
			</el-form-item>

			<!-- 评分关联form.grade -->
			<el-form-item label="评分">
				<el-col :span="7">
					<el-input v-model="form.grade" />
				</el-col>
			</el-form-item>

			<!-- 影片类型关联form.filmType.name -->
			<!-- filmType?.name 如果filmType不为null/undeined 就继续读取filmType?.name 否则直接返回null/undeined -->
			<el-form-item label="影片类型">
				<el-select v-model="form.filmType.name" placeholder="please select your zone">
					<el-option label="2D" value="2D" />
					<el-option label="3D" value="3D" />
					<el-option label="4D" value="4D" />
				</el-select>
			</el-form-item>

			<!-- 影片类型关联form.premiereAt -->
			<el-form-item label="首映日期">
				<el-col :span="8">
					<el-date-picker v-model="form.premiereAt" type="date" placeholder="Pick a date"
						style="width: 100%" />
				</el-col>
			</el-form-item>

			<!-- 在映关联form.isPresale -->
			<el-form-item label="在映">
				<el-switch v-model="form.isPresale" />
			</el-form-item>

			<!-- 影片类型关联form.category -->
			<el-form-item label="影片类型">
				<el-checkbox-group v-model="form.category">
					<el-checkbox label="爱情" name="category" />
					<el-checkbox label="动作" name="category" />
					<el-checkbox label="科幻" name="category" />
					<el-checkbox label="历史" name="category" />
					<el-checkbox label="悬疑" name="category" />
					<el-checkbox label="喜剧" name="category" />
					<el-checkbox label="战争" name="category" />
					<el-checkbox label="剧情" name="category" />
					<el-checkbox label="犯罪" name="category" />
					<el-checkbox label="纪录片" name="category" />
				</el-checkbox-group>
			</el-form-item>

			<!-- 国家关联form.nation -->
			<el-form-item label="国家">
				<el-radio-group v-model="form.nation">
					<el-radio label="中国大陆" />
					<el-radio label="欧美" />
					<el-radio label="日韩" />
					<el-radio label="其它" />
				</el-radio-group>
			</el-form-item>
		</el-form>
	</el-card>
	<!-- 
      :on-preview="handlePreview"
      :on-remove="handleRemove"
       -->
	<el-pagination layout="prev, pager, next" :total="2" />

	<el-card v-if="rea">
		<el-form v-if="form[`name`] !== undefined" :model="form" label-width="120px">
			<el-form-item label="使用照片墙">
				<el-switch v-model="usePictureCard" />
				{{ usePictureCard }}
			</el-form-item>

			<!-- 演职人员关联form.actors -->
			<el-form-item label="演职人员">
				<el-upload v-model:file-list="form.actors" class="upload-demo"
					:list-type="usePictureCard ? 'picture-card' : 'picture'" :auto-upload="true"
					action="/api/file/upload" :on-success="onActorUploadSuccess">
					<el-icon>
						<Plus />
					</el-icon>
				</el-upload>
			</el-form-item>

			<!-- 海报关联form.poster -->
			<el-form-item label="海报">
				<el-upload v-model:file-list="form.poster" action="/api/file/upload" list-type="picture-card"
					:on-success="onPosterUploadSuccess">
					<el-icon>
						<Plus />
					</el-icon>
				</el-upload>
			</el-form-item>

			<!-- 剧情摘要form.synopsis -->
			<el-form-item label="剧情摘要">
				<el-input v-model="form.synopsis" autosize type="textarea" />
			</el-form-item>

			<!-- 提交与重置 -->
			<el-form-item>
				<el-button class="opBtn" type="primary" @click="onSubmit">更新</el-button>
				<el-button class="opBtn">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script setup>
/* 引入模块 */
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
// import { addPlaying } from "@api/movieApi";

/* 定义变量 */
// const route = useRoute();
// const router = useRouter();


let rea=ref(false)

// 是否处于loading状态
const loading = ref(true);

// 表单数据存储器
const form = reactive({});

// 演员表显示方式是否使用照片墙
const usePictureCard = ref(false);

/* 定义一堆方法 */
const onSubmit = async () => {
	console.log("submit!", form);

	/* 对数据做必要的【去格式化】的动作 */
	const deformatedForm = Object.assign({}, form, {
		// 影片类型: 数组转字符串
		category: form.category.join("|"),

		// 首映日期: Date转时间戳
		premiereAt: form.premiereAt / 1000,

		// 海报：[{name,url},...]数组转字符串
		poster: form.poster.map(picture => picture.url).join(""),

		// 演员表: [{name,url}]=>[{name,role,avatarAddress}]
		actors: form.actors.map(({ name, url }) => {
			let [_name, _role] = name.split("-");
			let avatarAddress = url;
			return {
				name: _name,
				role: _role,
				avatarAddress,
			};
		}),
	});

	// 删除deformatedForm中的id（修改id对于数据库来说是非法操作）
	delete deformatedForm._id;
	console.log("after deformat", deformatedForm);

	/* 
	↑ 上述逻辑与更新影片一模一样
	↓ 只不过调用的服务端接口不一样
	*/

	// 生造一个影片id
	deformatedForm.filmId = "" + (Date.now() % 10000);

	/* 向服务端发起请求 */
	// const { msg, insertedId } = await addPlaying(deformatedForm);

	/* 反馈用户更新信息结果 */
	// ElMessage({
	// 	message: msg,
	// 	type: insertedId ? "success" : "error",
	// });

	// 暴力刷新查看更新结果
	setTimeout(() => {
		// window.location.reload();
		// router.back();
	}, 500);
};

/* 海报上传成功回调 */
const onPosterUploadSuccess = (response, uploadFile, uploadFiles) => {
	console.log("response, uploadFile, uploadFiles=", response, uploadFile, uploadFiles);

	// 将海报的信息中的poster字段做修改
	form.poster = [
		{
			name: "",
			url: `http://localhost:8173/upload/${uploadFile.name}`,
		},
	];
};

/* 演员照片上传成功回调 */
const onActorUploadSuccess = (response, uploadFile, uploadFiles) => {
	console.log("response, uploadFile, uploadFiles=", response, uploadFile, uploadFiles);

	// 新上传的文件位于actors列表的末尾，更正这个数据
	let lastActor = form.actors[form.actors.length - 1];
	let [name, role] = uploadFile.name.split("-");
	console.log("name,role", name, role);

	role = role.split(".")[0]; //去掉文件名后缀

	/* 更新表单数据 */
	Object.assign(lastActor, {
		name: `${name}-${role}`,
		url: `http://localhost:8173/upload/${uploadFile.name}`,
	});
};

/* 主干业务逻辑 */
/* 获取影片详情 */
onMounted(async () => {
	loading.value = false;

	const template = {
		name: "",
		poster: [
			{
				name: "",
				url: "/favicon.ico",
			},
		],
		actors: [
			{
				name: "",
				url: "/favicon.ico",
			},
		],
		category: [],
		synopsis: "",
		filmType: {
			name: "2D",
		},
		nation: "其它地区",
		premiereAt: 0,
		runtime: 0,
		isPresale: false,
		grade: "0",
	};

	Object.assign(form, template);
});
</script>

<style lang="scss">
.opBtn {
	width: 100px;
}
</style>
