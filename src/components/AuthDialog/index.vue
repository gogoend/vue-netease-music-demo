<template>
  <el-dialog v-bind="$attrs" class="auth-dialog">
    <!-- 111 -->
    <login />
    <reg />

  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { AuthDialogType } from '@/types/auth'

import Login from './login.vue'
import Reg from './reg.vue'

const authModule = namespace('auth')

@Component({
  components:{
    Reg,Login
  }
})
export default class Auth extends Vue {
  @authModule.State('authDialogType') private authDialogType!: AuthDialogType

}
</script>

<style lang="less" scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>