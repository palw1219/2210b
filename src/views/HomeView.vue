<template>
  <div class="home">
    <div class="box">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="20px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="" prop="username">
          <el-input v-model="ruleForm.username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="ruleForm.password" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item class="aaaa">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { User, Lock } from "@element-plus/icons-vue";
import { loginApi } from "@/utils/api";
const store = useStore();
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref();
const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户名", trigger: "blur" }],
});
const submitForm = async (formEl: any) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      loginApi(ruleForm).then((res: any) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        router.push("/about");
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #2d4c6a;
  position: relative;
}
.box {
  width: 500px;
  height: 300px;
  position: absolute;
  left: 35%;
  top: 250px;
  background-color: #fff;
  padding: 20px;
  padding-top: 100px;
  box-sizing: border-box;
}
.aaaa {
  margin-left: 306px;
}
</style>