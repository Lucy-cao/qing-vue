<template>
  <div style="font-size: 12px; line-height: 50px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList"
          :key="index"
          :to="item.to"
          replace>{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown style="width: 100px; cursor: pointer">
      <div style="display: inline-block">
        <img :src="user.avatarUrl" alt=""
             style="width: 30px; height: 30px; border-radius: 50%; position: relative; top: 10px; right: 10px" />
        <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/person" style="text-decoration: none; color: #000;">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span style="text-decoration: none" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: Function,
  },
  data() {
    return {
      user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {},
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
      this.$message.success("退出成功");
    },
  },
  computed: {
    breadcrumbList() {
      const routes = this.$route.matched.filter(
        (route) => route.meta && route.meta.breadcrumb
      );
      return routes.map((route) => {
        return {
          name: typeof route.meta.breadcrumb === 'function'
              ? route.meta.breadcrumb(route)
              : route.meta.breadcrumb,
          to: {path: route.path==""?"/home":route.path, params: this.$route.params}
        };
      });
    },
  },
};
</script>

<style scoped></style>
