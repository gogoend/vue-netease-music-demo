<template>
  <div id="app" class="app-wrap">
    <header>
      <h1>Application</h1>
      <section class="user-profile" v-if="accountInfo">
        <img class="avatar" :src="accountInfo.profile.avatarUrl" />
        <span>{{accountInfo.profile.nickname}}</span>
      </section>
      <section class="search-wrap">
        <el-input clearable v-model="searchKeyword" /><el-button type="primary"
          >搜索</el-button
        >
      </section>
    </header>
    <section class="main-wrap">
      <nav>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/User">用户</router-link></li>
        </ul>
      </nav>
      <main>
        <router-view class="main-view" />
      </main>
    </section>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";

const userModule = namespace("user");

@Component
class App extends Vue {
  @userModule.Getter("accountInfo") private accountInfo: unknown;

  private searchKeyword = "";
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
    .user-profile{
      .avatar{
        height: 48px;
      }
    }
    .search-wrap {
      display: flex;
    }
  }
  section.main-wrap {
    display: flex;
    flex: 1;
    max-height: calc(100% - 164px);
    nav {
      flex: 0 0 200px;
      overflow-y: auto;
      border-right: 1px solid #828282;
    }
    main {
      flex: 1;
      overflow-y: auto;
      .main-view {
        height: 100%;
      }
    }
  }
  footer {
    flex: 0 0 @footer-height;
  }
}
</style>
