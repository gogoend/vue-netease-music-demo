<template>
  <div id="app" class="app-wrap">
    <header>
      <h1>Application</h1>
      <section
        class="user-profile"
        v-if="accountInfo"
        @click="$router.push('/user')"
      >
        <el-avatar size="medium" :src="accountInfo.profile.avatarUrl" />
        <span class="nickname">{{ accountInfo.profile.nickname }}</span>
      </section>
      <section class="user-profile" v-else @click="$router.push('/auth/login')">
        <el-avatar size="medium" />
        <span class="nickname">{{ "请登录" }}</span>
      </section>
      <section class="search-wrap">
        <el-input clearable v-model="searchKeyword" />
        <el-button type="primary" @click="gotoSearch">搜索</el-button>
      </section>
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
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import MainWrap from "@/components/MainWrap/index.vue";

import { namespace } from "vuex-class";

const userModule = namespace("user");

@Component({
  components: {
    MainWrap,
  },
})
class App extends Vue {
  @userModule.Getter("accountInfo") private accountInfo: unknown;

  private searchKeyword = "";
  private gotoSearch(): void{
    if(!this.searchKeyword.trim()){
      return
    }
    this.$router.push(`/search/${this.searchKeyword}`)
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
