<template>
  <div class="search-tip">
      <section v-if="!keyword.trim()">
          空的
          <div class="search-history"></div>
          <div class="search-top"></div>
      </section>
      <section v-else>
          {{keyword}}
          <div class="search-suggestion"></div>
      </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SearchTip extends Vue {
    @Prop({
        type: String,
        default: ''
    }) private keyword!: string
}
</script>

<style lang="less" scoped>
.search-tip{
    position: absolute;
    top:100%;
    right: 0;
    padding:1em;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 6px rgba(0,0,0,0.4);
    width: 140%;
}
</style>