<template>
  <section class="pl-item">
    <el-image :src="coverImgSrc" class="pl-cover"></el-image>
    <p class="pl-name">{{name}}</p>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PlItem extends Vue {
    @Prop({
        type: String
    }) private name?: string
    @Prop({
        type: String
    }) private coverImgSrc?: string
}
</script>

<style lang="less" scoped>
.pl-item{
    .pl-cover{
        width: 128px;
    }
    .pl-name{
        font-size: 14px;
    }
}
</style>