<template>
  <div class="home">
    <h1>这里是首页</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { search } from "@/api/search";

@Component
class Home extends Vue {
  private list = []
  private async created() {
    const res = await search({
      keywords: "海阔天空",
    });
    console.log(res)
  }
}
export default Home;
</script>

<style lang="less" scoped>
.home {
  background-color: aquamarine;
}
</style>
