<template>
  <div class="main-wrap">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.main-wrap {
  padding: 20px;
  height: 100%;
  min-width: 500px;
  box-sizing: border-box;
}
</style>