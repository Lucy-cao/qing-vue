<template>
  <div>
    <div style="margin: 5px 0">
      <el-input style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入用户名" v-model="username"></el-input>
      <el-input style="width: 200px" suffix-icon="el-icon-message" placeholder="请输入邮箱" v-model="email" class="ml-5"></el-input>
      <el-input style="width: 200px" suffix-icon="el-icon-position" placeholder="请输入地址" v-model="address" class="ml-5"></el-input>
      <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
      <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger" @click="handleDelBatch">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
      <el-button type="primary">导出 <i class="el-icon-top"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg"
      style="width: 100%"
      height="73vh"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="200"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="150"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.row.id)">删除 <i class="el-icon-remove-outline"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="20%" :model="form" :rules="rules" ref="userForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username" autocomplete="off" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="form.email" autocomplete="off" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="form.address" autocomplete="off" style="width: 85%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return {
      tableData: [],
      headerBg: "headerBg",
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      pageNum: 1,
      total: 0,
      username: "",
      email: "",
      address: "",
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { min: 11, max: 11, message: "联系方式为11位", trigger: "blur"},
        ],
      },
    }
  },
  created() {
    this.pageSize = this.pageSizes[1];
    //初始加载分页数据
    this.load();
  },
  methods: {
    load() {
      this.request
        .post("/user/page", {
          pageParam: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
          username: this.username,
          email: this.email,
          address: this.address,
        })
        .then((res) => {
          if (res.isSuccess) {
            this.tableData = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error("数据获取失败");
          }
        });
    },
    save() {
      this.request.post("/user", this.form).then((res) => {
        if (res.isSuccess) {
          this.$message.success("保存成功");
          this.dialogFormVisible = false;
          this.load();
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    search() {
      this.pageNum = 1;
      this.load();
    },
    reset() {
      this.username = "";
      this.email = "";
      this.address = "";
      this.pageNum = 1;
      this.load();
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    handleEdit(row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
    handleDel(id) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.request.delete("/user/" + id).then((res) => {
            if (res.isSuccess) {
              this.$message.success("删除成功");
              this.load();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    handleSelectionChange(val) {
      //将复选框勾选的值保存至multipleSelection中
      this.multipleSelection = val;
    },
    handleDelBatch() {
      //处理批量删除
      this.$confirm("您确定要批量删除这些数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = this.multipleSelection.map((v) => v.id);
          this.request.post("/user/delBatch", ids).then((res) => {
            if (res.isSuccess) {
              this.$message.success("批量删除成功");
              this.load();
            } else {
              this.$message.error("批量删除失败");
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消批量删除");
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

<style>
.headerBg {
  background-color: #eee !important;
}
</style>
