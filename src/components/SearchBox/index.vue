<template>
  <form v-click-outside="()=>showTip = false" @submit.prevent="gotoSearch">
    <el-input @focus="showTip = true" v-model="searchKeyword" />
    <el-collapse-transition>
      <search-tip
        v-if="showTip"
        :keyword="searchKeyword"
      />
    </el-collapse-transition>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchTip from "./SearchTip.vue"

type HTMLElementPlus = HTMLElement & {
    __clickOutsideHandler__?(ev: MouseEvent): void;
}

@Component({
    components:{
        SearchTip
    },
    directives:{
        clickOutside:{
            bind(el: HTMLElementPlus,binding){
                function domHandler(ev: MouseEvent){
                    if(el.contains(ev.target)){
                        return
                    }
                    if(binding.expression){
                        binding.value(ev)
                    }
                }
                el.__clickOutsideHandler__ = domHandler
                document.addEventListener('click', el.__clickOutsideHandler__)
            },
            unbind(el: HTMLElementPlus){
                document.removeEventListener('click', el.__clickOutsideHandler__)
                delete el.__clickOutsideHandler__
            }
        }
    }
})
export default class SearchBox extends Vue {
  private showTip = false
  private searchKeyword = "";
  private gotoSearch(): void {
    if (!this.searchKeyword.trim()) {
      return;
    }
    this.$router.push(`/search/${this.searchKeyword}`);
    this.showTip = false
  }
}
</script>