<template>
  <div class="">
    <el-card class="box-card">
      <el-input
        v-model="ll.query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 300px; height: 30px"
      >
        <template #append>
          <el-button :icon="Search" @click="sss" />
        </template>
      </el-input>
      <el-button type="primary" style="margin-left: 20px" @click="add"
        >添加内容</el-button
      >
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px">
        <el-table-column type="index" label="#" width="180" />
        <el-table-column prop="username" label="姓名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="mobile" label="电话" width="180" />
        <el-table-column prop="role_name" label="角色" width="180" />
        <el-table-column prop="" label="状态" width="175">
          <template #default="scope">
            <el-switch v-model="scope.row.mg_state" />
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="160">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="bj(scope.row)"
              :icon="Edit"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              @click="del(scope.row.id)"
              :icon="Delete"
            ></el-button>
            <el-button size="small" type="warning" :icon="Setting"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[1, 2, 3, 4]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <el-dialog v-model="centerDialogVisible" title="添加内容" width="40%">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm.mobile" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="adds"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog v-model="centerDialogVisible1" title="编辑内容" width="40%">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm1"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm1.username" disabled />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm1.email" />
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm1.mobile" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="ad"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { Edit, Search, Setting, Delete } from "@element-plus/icons-vue";
import { usersApi, tjApi, delApi, bjApi } from "@/utils/api";
import { ElMessage, ElMessageBox } from "element-plus";
const store = useStore();
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref();
const ruleForm = reactive({
  username: "",
  password: "",
  email: "",
  mobile: "",
});
const ruleForm1 = reactive({
  id: "",
  username: "",
  email: "",
  mobile: "",
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  mobile: [{ required: true, message: "请输入电话", trigger: "blur" }],
});
const total = ref();
const centerDialogVisible = ref(false);
const centerDialogVisible1 = ref(false);
const tableData = ref(<any>[]);
const ll = reactive({
  query: "",
  pagenum: 1,
  pagesize: 10,
});
usersApi(ll).then((res: any) => {
  console.log(res);
  tableData.value = res.data.users;
  total.value = res.data.total;
});
// 搜索
const sss = () => {
  usersApi(ll).then((res: any) => {
    console.log(res);
    tableData.value = res.data.users;
    total.value = res.data.total;
  });
};
// 编辑
const bj = (row: any) => {
  centerDialogVisible1.value = true;
  ruleForm1.username = row.username;
  ruleForm1.id = row.id;
  ruleForm1.email = row.email;
  ruleForm1.mobile = row.mobile;
};
const ad = () => {
  bjApi(ruleForm1).then((res: any) => {
    console.log(res);
    usersApi(ll).then((res: any) => {
      console.log(res);
      tableData.value = res.data.users;
      total.value = res.data.total;
    });
    centerDialogVisible1.value=false
  });
};
// 删除
const del = (id: any) => {
  ElMessageBox.confirm("删除用户是否继续", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delApi(id).then((res: any) => {
        console.log(res);
        usersApi(ll).then((res: any) => {
          console.log(res);
          tableData.value = res.data.users;
          total.value = res.data.total;
        });
      });
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
// 分页
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  ll.pagesize = val;
  usersApi(ll).then((res: any) => {
    console.log(res);
    tableData.value = res.data.users;
    total.value = res.data.total;
  });
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  ll.pagenum = val;
  usersApi(ll).then((res: any) => {
    console.log(res);
    tableData.value = res.data.users;
    total.value = res.data.total;
  });
};
// 添加
const add = () => {
  centerDialogVisible.value = true;
};
// 加入
const adds = () => {
  tjApi(ruleForm).then((res: any) => {
    console.log(res);
    centerDialogVisible.value = false;

    usersApi(ll).then((res: any) => {
      console.log(res);
      tableData.value = res.data.users;
      total.value = res.data.total;
    });
    ruleForm.email = "";
    ruleForm.mobile = "";
    ruleForm.password = "";
    ruleForm.username = "";
  });
};
</script>

<style lang='scss' scoped>
.box-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>