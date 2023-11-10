<template>
  <div style="height: 80%">
    <el-container style="min-height: 100vh">
      <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(0 21 41/35%)">
        <Aside :isCollapse="isCollapse" />
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #ccc; height: 50px">
          <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
        </el-header>

        <el-main style="padding: 15px">
          <!-- 使用路由进行页面跳转 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: "HomeView",
  components: {
    Aside,
    Header,
  },
  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      sideWidth: 200,
    };
  },
  created() {},
  methods: {
    collapse() {
      //点击收缩按钮触发
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sideWidth = 64;
        this.collapseBtnClass = "el-icon-s-unfold";
      } else {
        this.sideWidth = 200;
        this.collapseBtnClass = "el-icon-s-fold";
      }
    },
  },
};
</script>

<style></style>
