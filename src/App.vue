<template>
  <div id="app" class="app-wrap">
    <header>
      <h1>Application</h1>
      <section class="user-profile" v-if="accountInfo" @click="$router.push('/user')">
        <el-avatar size="medium" :src="accountInfo.profile.avatarUrl" />
        <span class="nickname">{{ accountInfo.profile.nickname }}</span>
      </section>
      <section class="user-profile" v-else @click="showAuthDialog(true);changeAuthDialogType('login')">
        <el-avatar size="medium" />
        <span class="nickname">{{ "请登录" }}</span>
      </section>
      <section class="search-wrap">
        <form @submit.prevent="gotoSearch">
          <el-input clearable v-model="searchKeyword" />
        </form>
      </section>
      <auth-dialog
        :visible.sync="authDialogVisible"
        :before-close="()=>showAuthDialog(false)"
      ></auth-dialog>
    </header>
    <section class="center-wrap">
      <nav>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/user">我的</router-link></li>
        </ul>
      </nav>
      <main>
        <main-wrap>
          <router-view />
        </main-wrap>
      </main>
    </section>
    <footer>
      <music-player />
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import MusicPlayer from "@/components/MusicPlayer/index.vue";

import { namespace } from "vuex-class";
import { AuthDialogType } from "@/types/auth";

import AuthDialog from "@/components/AuthDialog/index.vue";

const userModule = namespace("user");
const authModule = namespace("auth");

@Component({
  components: {
    MusicPlayer,
    AuthDialog,
  },
})
class App extends Vue {
  @userModule.Getter("accountInfo") private accountInfo: unknown;
  @authModule.Getter("authDialogType") private authDialogType!: AuthDialogType;
  @authModule.Getter("authDialogVisible") private authDialogVisible!: boolean;
  @authModule.Action("changeAuthDialogType") private changeAuthDialogType!: (
    payload: AuthDialogType
  ) => void;
  @authModule.Action("showAuthDialog") private showAuthDialog!: (
    payload: boolean
  ) => void;

  private searchKeyword = "";
  private gotoSearch(): void {
    if (!this.searchKeyword.trim()) {
      return;
    }
    this.$router.push(`/search/${this.searchKeyword}`);
  }
}

export default App;
</script>

<style lang="less" scoped>
@header-height: 64px;
@footer-height: 100px;

.app-wrap {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    padding: 0 48px;
    align-items: center;
    flex: 0 0 @header-height;
    background-color: #07f9b1;
    .user-profile {
      cursor: pointer;
      display: flex;
      align-items: center;
      .nickname {
        margin-left: 1em;
      }
    }
    .search-wrap {
      display: flex;
    }
  }
  section.center-wrap {
    display: flex;
    flex: 1;
    max-height: calc(100% - 164px);
    nav {
      flex: 0 0 200px;
      overflow-y: auto;
      border-right: 1px solid #828282;
      a {
        display: inline-block;
        width: 100%;
        padding: 1em 2em 1em;
        &:hover {
          background-color: #ddd;
        }
      }
    }
    main {
      flex: 1;
      overflow-y: auto;
    }
  }
  footer {
    flex: 0 0 @footer-height;
    background-color: #2c3e50;
  }
}
</style>
