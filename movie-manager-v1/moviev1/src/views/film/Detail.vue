<template>
  <!-- v-loading="loading" -->
  <el-card>
    <template #header>
      <div class="card-header">
        <span>影片详情</span>
      </div>
    </template>

    <!-- 详情表单 -->
    <!-- form没有数据不渲染form -->

    <el-form v-if="form[`name`]" :model="form" label-width="120px">
      <!-- 卡片关联 form.name -->
      <el-form-item label="片名">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="片场">
        <el-col :span="7">
          <el-input v-model="form.runtime" type="number" />
        </el-col>
      </el-form-item>

      <!-- 评分关联 form.grade -->
      <el-form-item label="评分">
        <el-col :span="7">
          <el-input v-model="form.grade" />
        </el-col>
      </el-form-item>

      <!-- 影片类型关联 form.filmtype.name -->
      <el-form-item label="影片类型">
        <el-select v-model="form.filmType.name" placeholder="please select your zone">
          <el-option label="2D" value="2D" />
          <el-option label="3D" value="3D" />
          <el-option label="4D" value="4D" />
          <!-- value是选定该值后绑定到 v-model -->
        </el-select>
      </el-form-item>

      <!-- 影片类型关联form.premiereat -->
      <el-form-item label="首映日期">
        <el-col :span="8">
          <el-date-picker v-model="form.premiereAt" type="date" placeholder="Pick a date" style="width:100%" />
        </el-col>
      </el-form-item>

      <!-- 在上映form.ispresale -->
      <el-form-item label="在上映">
        <el-switch v-model="form.isPresale" />
      </el-form-item>

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
          <!-- 这里不用value？因为label已经是里面的值了 -->

        </el-checkbox-group>

      </el-form-item>
      <!-- 国家关联 form.nation -->
      <el-form-item label="国家">
        <el-radio-group v-model="form.nation">
          <el-radio label="中国大陆"></el-radio>
          <el-radio label="欧美" />
          <el-radio label="日韩" />
          <el-radio label="其它" />

        </el-radio-group>

      </el-form-item>



      <el-form-item label="使用照片墙">
        <el-switch v-model="usePictureCard" />
        {{ usePictureCard }}
      </el-form-item>

      <!-- 演职人员关联form.actors -->
      <el-form-item label="演职人员">
        <el-upload v-model:file-list="form.actors" class="upload-demo"
          :list-type="usePictureCard ? 'picture-card' : 'picture'" :auto-upload="true" action="/api/file/upload"
          :on-success="onActorUploadSuccess">
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







  <!-- -->
</template>
<script setup>

import { ref, reactive, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import axios from 'axios';
import { getdetail} from '@/api/tryApi'
import { ElMessage } from "element-plus";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
// import {getDetail, updatePlaying} from '@api/movieApi'


const route = useRoute()
//是否处于loading状态
const loading = ref(true)
//表单数据存储器
const form = reactive({})

const onSubmit = async () => {
  console.log('submit', form)

  const deformatedform = Object.assign({}, form, {
    // 影片类型 数据转字符串
    category: form.category.join('|'),
    //首映日期 date转时间戳
    premiereAt: form.premiereAt / 1000,
    //海报:[{name,url},...]数组转字符串
    poster: form.poster.map((pic) => pic.url).join(""),
    //演员表 [{name,url}]=>[{name,role,avataraddress}]
    actors: form.actors.map(({ name, url }) => {
      let [_name, _role] = name.split("-");
      let avataraddress = url
      return {
        name: _name,
        role: _role,
        avataraddress
      }
    })

  })

  //删除 deformatedform中的id？？哪里有id
  // delete deformatedform._id;
  console.log("after deformat", deformatedform)

  //向服务器发起请求
  // const {msg, modifiedCount}=await updatePlaying(form._id, deformatedform)
  //这个deformatedform是提交给服务器的数据部分

  //反馈用户更新信息结果
  // ElMessage({
  //   message:msg,
  //   try:modifiedCount ? "success":"error",
  // })


  const response = await fetch('/api/movie/update', {
    method: 'POST',
    body: JSON.stringify(deformatedform),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json();
  ElMessage({
    message: result.message,
    type: result.modifiedCount ? "success" : "error",
  });



  //刷新查看跟新结果
  setTimeout(() => {
    window.location.reload()
  }, 500)

}

//获取影片详情
onMounted(async () => {
  loading.value = true
  // const detail = await getDetail(route.params.id)
  const detai = await getdetail(route.params.id)
  // const response = await axios.get('/api/movie/detail')
  const detail = detai.data
  console.log(detai)
  //需要生成属于detail的id

  


  console.log("detail=", detail)
  //将detail中数据同步到form中 表单中自动同步数据
  //格式化动作
  Object.assign(form, detail, {
    premiereAt: detail.premiereAt * 1000,
    //时间戳转date
    //影片类型 表单复选 应双向绑定一个数组
    category: detail.category.split("|"),
    poster: [
      {
        name: "",
        url: detail.poster,
        //很奇怪,所以之前一直没有name吗 为什么置空
      }
    ],
    actors: detail.actors.map(({ name, role, avatarAddress }) => ({
      name: `${name}-${role}`,
      url: avatarAddress,
    }))
  })

  setTimeout(() => {
    loading.value = false
  }, 100)
})

//演员表 显示方法是否使用照片墙
const usePictureCard = ref(false)

//海报上传成功回调 
const onPosterUploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(
    "response, uploadFile,uploadFiles=",
    response,
    uploadFile,
    uploadFiles
  );
  //将海报的信息中的poster字段修改
  // form.poster = [
  //   {
  //     name:"",
  //     url:`http://localhost:8173/upload/${uploadFile.name}`,
  //     //记住这个upload路径
  //   }
  // ]

}

//演员照片上传成功回调
const onActorUploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(
    "response,uploadFile,uploadFiles=",
    response,
    uploadFile,
    uploadFiles
  )

  //新上传的文件 位于actors列表的末尾 更正这个数据
  let lastActor = form.actors[form.actors.length - 1]
  let [name, role] = uploadFile.name.split('-')
  console.log("name,role", name, role)
  role = role.split('.')[0]
  //去掉文件名后缀？？？

  //更新 表单数据
  // Object.assign(lastActor,{
  //   name: `${name}-${role}`,
  //   url: `http://localhost:8173/upload/${uploadFile.name}`,
  // })
}


</script>
<style lang="scss">
.opBtn {
  width: 100px;
}
</style>
