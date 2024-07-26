<template>
    <el-row class="tac">

        <el-col :span="4">

            <h5 class="mb-2">Default colors</h5>
            <!-- 标题 -->
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <!-- 就是默认2navigator 是激活状态 el-menu-->
                <el-sub-menu index="1">

                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>Navigator One</span>
                        <!-- 猜测加了template #title代表 这里面有孩子 -->
                    </template>

                    <el-menu-item-group title="Group One">
                        <el-menu-item index="1-1">item one</el-menu-item>
                        <el-menu-item index="1-2">item two</el-menu-item>
                    </el-menu-item-group>

                    <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group>

                    <el-sub-menu index="1-4">
                        <template #title>item four</template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu>

                </el-sub-menu>





                <el-sub-menu index="2">

                    <template #title>
                        <el-icon><icon-menu /></el-icon>
                        <span>Navigator Two</span>
                    </template>

                    <el-sub-menu index="2-1">
                        <template #title>
                            <!-- <el-icon><icon-menu /></el-icon> -->
                            <span>item one</span>
                        </template>
                        <el-menu-item index="2-1-1">item one</el-menu-item>
                        <el-menu-item index="2-1-2">item one</el-menu-item>
                    </el-sub-menu>

                    <el-menu-item index="2-2">item one</el-menu-item>
                    <el-menu-item index="2-1">item one</el-menu-item>

                    <!-- 懂了 如果不要嵌套 直接上el-menu-item
                    如果要嵌套 外面那层写 el-sub-item 并且记上 template #title -->




                </el-sub-menu>

                <el-menu-item index="3" disabled>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>Navigator Four</span>
                </el-menu-item>
            </el-menu>
        </el-col>

    </el-row>
</template>

<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
