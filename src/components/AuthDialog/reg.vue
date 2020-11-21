<template>
  <div class="login-page">
    <h1>注册页面</h1>
    <form>
      <fieldset>
        <legend>111</legend>
        <label>
          用户名：
          <input autocomplete="off" />
        </label>
        <label>
          密码：
          <input autocomplete="off" type="password" name />
        </label>
        <label>
          确认密码：
          <input autocomplete="off" type="password" name />
        </label>
      </fieldset>
      <el-link @click="changeAuthDialogType('login')">去登录</el-link>
      <button @click="$router.go(-1)" type="button">返回</button>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";
import { AuthDialogType } from "@/types/auth";


const authModule = namespace("auth");

@Component
export default class Reg extends Vue{
    @authModule.Action("changeAuthDialogType") private changeAuthDialogType!: (
    payload: AuthDialogType
  ) => void;
}
</script>

<style>
</style>