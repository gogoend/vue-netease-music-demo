<template>
  <div class="login-page">
    <h1>登录到我的帐户</h1>
    <el-form ref="loginForm">
      <el-form-item label="邮箱">
        <el-input v-model="formFields.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="formFields.password"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
      <section class="bottom-btns">
        <router-link to="/auth/reg" replace>去注册</router-link>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </section>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { emailLogin } from "@/api/login";

import md5 from "js-md5";

import { Form as ElForm } from "element-ui";

import { /*PhoneLoginParams*/ EmailLoginParams } from "@/types/auth";

const userModule = namespace("user");

@Component
class LoginPage extends Vue {
  @Ref() readonly loginForm!: ElForm;

  @userModule.Action("updateAccountInfo") private updateAccountInfo!: (
    payload: unknown
  ) => void;
  @userModule.Getter("accountInfo") private accountInfo: unknown;

  // (this: AbortSignal, ev: AbortSignalEventMap[K]) => any

  private formFields: EmailLoginParams = {
    email: "",
    password: "",
  };

  private async handleSubmit(): Promise<void> {
    const postData = Object.assign({}, this.formFields, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      md5_password: md5(this.formFields.password),
    });

    try{
      const { data: res } = await emailLogin(postData);
      this.updateAccountInfo(res);
      console.log(this.accountInfo);

      if(res.code===200){
        this.$router.go(-1)
      }
    } catch(err) {
      console.log(err)
    }
  }
}

export default LoginPage;
</script>

<style scoped lang="less">
.login-page {
  .bottom-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>