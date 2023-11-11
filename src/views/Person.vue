<template>
  <el-card style="width: 35%">
    <el-form :model="form" label-width="20%" :rules="rules" ref="userForm">
      <el-form-item label="用户名:">
        <el-input v-model="form.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称:" prop="nickname">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式:" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Person",
  data() {
    return {
      form: {},
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { min: 11, max: 11, message: "联系方式为11位", trigger: "blur"},
        ],
      },
    };
  },
  created() {
    var id = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).id:0
    this.request.get("/user/" + id).then((res) => {
      if (res.isSuccess) {
        this.form = res.data;
      }
    });
  },
  methods: {
    save() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.request.post("/user", this.form).then((res) => {
            if (res.isSuccess) {
              this.$message.success("保存成功");
            } else {
              this.$message.error("保存失败");
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped></style>
