<template>
  <el-dialog :destroy-on-close="true"	v-bind="$attrs" class="auth-dialog">
    <!-- <login /> -->
    <!-- <reg /> -->
    <component :is="authComponent" />
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
  private get authComponent(){
    switch(this.authDialogType){
      case 'login': return Login;
      case 'reg': return Reg;
    }
    return Login;
  }
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