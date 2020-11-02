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
      <router-link to="/auth" replace>去登录</router-link>
      <button @click="$router.go(-1)" type="button">返回</button>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>