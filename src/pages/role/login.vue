<script setup lang="ts">
import { reactive, ref } from "vue";
import logo from "../../assets/logo.svg";
import { userDto } from "../../utils/dto/user";
import { Form, FormItem, Input, Button } from "ant-design-vue";
import { loginApi } from "../../api/role";
import { roleStore } from "../../store/role";
import router from "../../router";
const loginLoading = ref<boolean>(false);
const roleStores = roleStore();
const loginVal = reactive<userDto>({
  username: "cain",
  password: "cain",
});

const loginFuc = async (values: userDto) => {
  loginLoading.value = true;
  const data = await loginApi(values);
  if (data?.status == 200) {
    roleStores.setRoutes(data.data.data.routes);
    roleStores.setRole(JSON.parse(data.data.data.role));
    roleStores.setUser({
      username: data.data.data.username,
      password: data.data.data.password,
      emali: data.data.data.emali,
      nickname: data.data.data.nickname,
    });
    roleStores.setIsLogin(true);
    router.push("/");
  }
  loginLoading.value = false;
};
</script>

<template>
  <div class="box">
    <div class="loginBox">
      <div class="loginForm">
        <img width="60" :src="logo" />
        <h4 class="login_title">登录</h4>
        <Form
          layout="vertical"
          :model="loginVal"
          @finish="loginFuc"
          class="login_form"
        >
          <FormItem
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <Input v-model:value="loginVal.username" />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <Input v-model:value="loginVal.password" />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              block
              html-type="submit"
              :loading="loginLoading"
              >登录</Button
            >
          </FormItem>
        </Form>
        <p>用户名:cain 密码:cain</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loginBox {
  width: 400px;
  height: 100%;
  margin: 0px auto;
  padding-top: 100px;
  .loginForm {
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: center;
    .login_title {
      margin-top: 20px;
    }
    .login_form {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
