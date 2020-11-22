<template>
  <div class="cover" :class="{
      [allPageTypes[pageType]+'-cover']: true
    }">
    <el-image class="cover-img" :src="coverInfo.coverImgUrl"/>
    <section class="cover-info">
      <div class="title">
        <h2 class="text">{{coverInfo.name}}</h2>
      </div>
      <section class="creator-info" v-if="coverInfo.creator">
        {{coverInfo.creator.nickname}} {{new Date(coverInfo.createTime).toLocaleString()}}创建
      </section>
      <section class="operations">
        <el-button type="primary">播放全部</el-button>
        <el-button>收藏</el-button>
        <el-button>分享</el-button>
        <el-button>下载全部</el-button>
      </section>
      <section class="extra-info">
        <p>歌曲：{{ coverInfo.trackCount }}</p>
        <p>播放：{{ coverInfo.playCount }}</p>
      </section>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import pageTypes from "./pageType"

@Component
export default class Cover extends Vue {
  @Prop({
    type: Object,
    default: {}
  })
  coverInfo?: Record<string, any>
  @Prop({
    type: Number,
    default: 0
  })
  pageType?: pageTypes
  allPageTypes = Object.freeze(pageTypes)
}
</script>

<style lang="less">
.cover{
  display: flex;
  .cover-img{
    width: 180px;
  }
  .cover-info{
    margin-left: 2em;
    .title{
      .text{
        display: inline;
      }
      &::before{
        display: inline-block;
        color: #f00;
        border: 1px solid currentColor;
        padding: 0.2em 0.4em;
        border-radius: 4px;
        margin-right: 0.5em;
      }
    }
  }
  &.playlist-cover .cover-info{
    .title::before{
      content: '歌单';
    }
  }
}
</style>