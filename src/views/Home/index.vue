<template>
  <div class="home-page">
    <h1>这里是首页</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getHomeData } from "@/api/home";

@Component
class Home extends Vue {
  private async created() {
    const { data } = await getHomeData();
    console.log(data);
  }
}
export default Home;
</script>

<style lang="less" scoped>
.home-page {
  background-color: aquamarine;
}
</style>
