<template>
  <div class="">
    <el-container>
      <el-header>
        <div style="display: flex; justify-content: space-between">
          <span>电商后台管理系统</span>
          <el-button type="info" style="margin-top: 15px" @click="loginOut"
            >登出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '60px' : '200px'">
          <div style="color: #fff; background-color: aquamarine" @click="dian">
            |||
          </div>
          <el-menu
            active-text-color="#ffd04b"
            background-color="#333744"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            router
            :collapse="isCollapse"
            :collapse-transition="true"
          >
            <el-sub-menu :index="item.path" v-for="item in list" :key="item.id">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="ele.path"
                  v-for="(ele, index) in item.children"
                  :key="index"
                  >{{ ele.authName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in $route.meta.title">{{
              item
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { menusApi } from "@/utils/api";
const store = useStore();
const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
const list = ref(<any>[]);
const loginOut = () => {
  localStorage.removeItem("token");
  router.push("/");
};
const dian = () => {
  isCollapse.value = !isCollapse.value;
};
menusApi().then((res: any) => {
  console.log(res);
  list.value = res.data;
});
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #373d41;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333744;
  color: #333;
  text-align: center;
  height: 92vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-menu {
  border: 0;
}
</style>