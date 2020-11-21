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
            <el-button @click="changeAuthDialogType('login');showAuthDialog(true)">去登录</el-button>
          </template>
          <template v-else>
            <el-button @click="updateAccountInfo(null)">退出登录</el-button>
          </template>
        </div>
      </section>
      <section class="my-playlist" v-if="accountInfo">
        <h2>我创建的歌单</h2>
        <ul>
          <li v-for="pl in userPlaylist" :key="pl.id">
            <pl-item :name="pl.name" :coverImgSrc="pl.coverImgUrl" />
          </li>
        </ul>
      </section>
    </content-wrap>
  </div>
</template>
<style lang="less" scoped>
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getSubcount, getPlaylist } from "@/api/user.ts";
import PlItem from "@/components/PlItem/index.vue"

import { namespace } from "vuex-class";

import { AuthDialogType } from "@/types/auth";

const userModule = namespace("user");
const authModule = namespace("auth");

@Component({
  components: {
    PlItem
  }
})
class User extends Vue {
  @userModule.Getter("accountInfo") private accountInfo: unknown;
  @userModule.Action("updateAccountInfo") private updateAccountInfo: unknown;
  @authModule.Action("showAuthDialog") private showAuthDialog!: (
    payload: boolean
  ) => void;
  @authModule.Action("changeAuthDialogType") private changeAuthDialogType!: (
    payload: AuthDialogType
  ) => void;

  private userPlaylist = []

  private async created () {
    if (this.accountInfo) {
      // const playlists = await getPlaylist({
      //   uid: this.accountInfo.account.id
      // })

      /**
       * code
       * more
       * playlist
       */
      const [{data:stat}, {data:{playlist:playlist}}] = await Promise.all([
        getSubcount(), getPlaylist({
          uid: this.accountInfo.account.id
        })
      ])
      console.log(stat, playlist)
      this.userPlaylist = playlist
    }
  }
}

export default User;
</script>

<style lang="less" scoped>
.user-page {
  .section-wrap {
    > section {
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