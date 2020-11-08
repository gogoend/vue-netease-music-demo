<template>
  <div class="home">
    <h1>这里是首页</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Home extends Vue {

}
export default Home;
</script>

<style lang="less" scoped>
.home {
  background-color: aquamarine;
}
</style>
