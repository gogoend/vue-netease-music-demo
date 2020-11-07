<template>
  <div
    class="content-wrap"
    :style="{
      width
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ContentWrap extends Vue {
  @Prop({
    type: [String, Number],
    default: "80%",
  })
  private width!: string | number;
}
</script>

<style scoped lang="less">
.content-wrap {
  margin: auto;
  max-width: 720px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>