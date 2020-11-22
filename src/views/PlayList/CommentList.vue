<template>
  <div class="comment-list">
    <section class="comment-editor"></section>
    <section v-if="hotComments.length">
      <h3>精彩评论</h3>
      <ul>
        <li class="comment-item" v-for="item in hotComments" :key="item.id">
          <!-- {{item}} -->
          <el-image class="user-avatar" :src="item.user.avatarUrl" />
          <div>
            <p>{{ item.user.nickname}}</p>
            <p>{{ item.content }}</p>
            <p>{{ item.time }}</p>
          </div>
        </li>
      </ul>
    </section>
    <section>
      <h3>最新评论</h3>
      <ul>
        <li class="comment-item" v-for="item in comments" :key="item.id">
          <!-- {{item}} -->
          <el-image class="user-avatar" :src="item.user.avatarUrl" />
          <div>
            <p>{{ item.user.nickname}}</p>
            <p>{{ item.content }}</p>
            <p>{{ item.time }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CommentList extends Vue {
  @Prop({
    type: Object,
    default: () => ({})
  }) commentData!: object

  private get hotComments(){
    return this.commentData.hotComments || []
  }
  private get comments(){
    return this.commentData.comments || []
  }

}
</script>

<style lang="less" scoped>
.comment-list{
  .comment-editor{
    display: none
  }
  .comment-item{
    display: flex;
    padding: 1.5em 0;
    .user-avatar{
      margin-right: 1.5em;
      flex: none;
      width: 48px;
      height: 48px;
    }
  }
}
</style>