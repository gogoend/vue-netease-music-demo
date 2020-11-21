<template>
  <div class="playlist-page">
    <cover />
    <el-tabs>
      <el-tab-pane label="歌曲列表">
      <music-list-table
        :data="list"
        @row-click="handleRowClick"
      />
      </el-tab-pane>
      <el-tab-pane label="评论">
        <comment-list />
      </el-tab-pane>
      <el-tab-pane label="收藏者">
        <fans-list />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CommentList from './CommentList.vue'
import Cover from './Cover.vue'
import FansList from './FansList.vue'
import MusicListTable from '@/components/MusicListTable/index.vue'
import clickToPlayTableMixin from "@/mixin/clickToListenTableMixin.ts"
import { Song } from "@/types/song";
import { getPlaylistDetail } from "@/api/playlist.ts"


@Component({
  components:{
    Cover,
    MusicListTable,
    CommentList,
    FansList
  },
  mixins: [ clickToPlayTableMixin ]
})
export default class PlayList extends Vue {
  private async created() {
    this.getPlaylistInfo()
  }
  @Watch("$route.params.id", {
    immediate: false,
  })
  private list: Song[] = []
  private routerChange(): void {
    this.getPlaylistInfo();
  }
  private async getPlaylistInfo() {
    const {data} = await getPlaylistDetail({
      id: +this.$route.params.id
    })
    this.list = data.playlist.tracks.map(function(item: any): Song{
      return {
        id: item.id,
        name:item.name,
        artists:item.ar,
        album:item.al,
        duration:item.dt
      }
    })
  }
}
</script>

<style>

</style>