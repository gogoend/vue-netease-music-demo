<template>
  <div class="playlist-page">
    <cover :page-type="pageType" :coverInfo="playListDetail" />
    <el-tabs>
      <el-tab-pane label="歌曲列表">
      <music-list-table
        @row-click="handleRowClick"
      />
      </el-tab-pane>
      <el-tab-pane label="评论">
        <comment-list :commentData="playListCommentData" />
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
import { getPlaylistDetail, getPlaylistCommentData } from "@/api/playlist.ts"
import { getSongDetail } from "@/api/song.ts"
import pageType from "./pageType"

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
  private routerChange(): void {
    this.getPlaylistInfo();
  }
  private list: Song[] = []
  private playListDetail = {}
  private playListCommentData = {}
  private async getPlaylistInfo() {
    const [
      {data: playListCommentData},
      {data: playListDetail}
    ] = await Promise.all(
      [
        getPlaylistCommentData({
          id: +this.$route.params.id
        }),
        getPlaylistDetail({
          id: +this.$route.params.id
        })
      ]
    )
    this.playListCommentData = playListCommentData
    // const {data: playListComments} = await 
    // const {data: playListDetail} = await 
    this.playListDetail = playListDetail.playlist
    const songIds = playListDetail.playlist.trackIds.map(function(item: any): object{
      return item.id
    }).join(',')
    if(!songIds){
      return
    }
    const {data: songData} = await getSongDetail({
      ids: songIds
    })
    console.log(songData)
    this.list = songData.songs.map(function(item: any): Song{
      return {
        id: item.id,
        name:item.name,
        artists:item.ar,
        album:item.al,
        duration:item.dt
      }
    })
  }
  private get pageType(){
    const routeName = this.$route.name
    return pageType[routeName]
  }
}
</script>

<style lang="less" scoped>

</style>