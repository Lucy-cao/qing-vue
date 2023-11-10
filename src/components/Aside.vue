<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden;" class="custom-aside"
    background-color="rgb(48, 65, 86)"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse-transition="false"
    :collapse="isCollapse"
    router
  >
    <!-- 需要在el-menu加上router属性下面的路由才会生效 -->
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" style="width: 20px;height: 19px; position: relative;top: 5px; margin-right: 8px">
      <b style="color: white" v-show="!isCollapse">后台管理系统</b>
    </div>

    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">工作台</span>
      </template>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">系统设置</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  props: {
    isCollapse: Boolean,
  },
};
</script>

<style scoped>
.custom-aside {
  overflow-y: auto; /* 在 Y 轴方向上添加滚动 */
  height: 100vh; /* 或者设置为实际高度 */
}
.custom-aside::-webkit-scrollbar {
  width: 5px; /* 调整滚动条的宽度 */
}
.custom-aside::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道的颜色 */
}
.custom-aside::-webkit-scrollbar-thumb {
  background: #ccc; /* 滚动条滑块的颜色 */
}
.custom-aside::-webkit-scrollbar-thumb:hover {
  background: #888; /* 滚动条滑块的悬停颜色 */
}
</style>
