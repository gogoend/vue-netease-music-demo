<!--
 * @Author: gogoend
 * @Date: 2020-05-15 23:03:30
 * @LastEditors: gogoend
 * @LastEditTime: 2020-08-05 15:31:09
 * @FilePath: \vue-cli-test\src\views\User\index.vue
 * @Description: 
-->
<template>
  <div class="user-page">
    <content-wrap class="section-wrap">
      <section class="basic-info">
        <div class="avatar-part" v-if="accountInfo">
          <el-avatar
            :size="64"
            :src="accountInfo.profile.avatarUrl"
            shape="square"
          ></el-avatar>
          <span class="nickname">{{ accountInfo.profile.nickname }}</span>
        </div>
        <div class="avatar-part" v-else>
          <el-avatar></el-avatar>
          <span class="nickname">还没登录哦~</span>
        </div>
        <div class="operation">
          <template v-if="!accountInfo">
            <el-button @click="$router.push('/auth')">去登录</el-button>
          </template>
          <template v-else>
            <el-button @click="updateAccountInfo(null)">退出登录</el-button>
          </template>
        </div>
      </section>
      <section class="my-playlist" v-if="accountInfo">
        <h2>我的歌单</h2>
      </section>
    </content-wrap>
  </div>
</template>
<style lang="less" scoped>
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";

const userModule = namespace("user");

@Component
class User extends Vue {
  @userModule.Getter("accountInfo") private accountInfo: unknown;
  @userModule.Action("updateAccountInfo") private updateAccountInfo: unknown;
}

export default User;
</script>

<style lang="less" scoped>
.user-page {
  .section-wrap{
    >section {
      margin: 1.5em auto;
      width: 100%;
    }
    .basic-info {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32px;
      background-image: linear-gradient(45deg, #70d080, #a0f912);
      border-radius: 16px;
      .avatar-part {
        display: flex;
        align-items: center;
        .nickname {
          margin-left: 1em;
        }
      }
    }
  }
}
</style>