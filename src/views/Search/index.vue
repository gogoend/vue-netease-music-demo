<template>
  <div class="search-page">
      <section>与<b>{{$route.params.kw}}</b>相关的搜索结果共有 ... 条</section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// import { namespace } from "vuex-class";

@Component
class Search extends Vue{
    private mounted(){
        console.log(this,this.$route.params.kw)
    }
}

export default Search

</script>

<style lang="less" scoped>
.search-page {
    height: 100%;
    padding: 32px;
}
</style>