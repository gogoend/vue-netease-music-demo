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
    <conten-wrap>
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
    </conten-wrap>
  </div>
</template>
<style lang="less" scoped>
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";

import ContenWrap from "@/components/ContentWrap/index.vue";

const userModule = namespace("user");

@Component({
  components: { ContenWrap },
})
class User extends Vue {
  @userModule.Getter("accountInfo") private accountInfo: unknown;
  @userModule.Action("updateAccountInfo") private updateAccountInfo: unknown;
}

export default User;
</script>

<style lang="less" scoped>
.basic-info {
  margin: 0 auto;
  width: 100%;
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
</style>