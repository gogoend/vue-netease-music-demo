<template>
  <div class="auth-page">
    <!-- 111 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>