<template>
  <div class="search-page">
    <section>
      与<b>{{ $route.params.kw }}</b
      >相关的搜索结果共有 {{ count === null ? "..." : count }} 条
    </section>
    <music-list-table
      :data="list"
      @row-click="handleRowClick"
      :extraCol="tableFields"
     />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { search } from "@/api/search";
import { downloadSongByUrl } from "@/api/song";
import { Song } from "@/types/song";
import MusicListTable from "@/components/MusicListTable/index.vue"
import { downloadBlob } from "@/utils/blob";
import clickToPlayTableMixin from "@/mixin/clickToListenTableMixin.ts"

@Component({
  components:{
    MusicListTable
  },
  mixins: [ clickToPlayTableMixin ]
})
class Search extends Vue {
  private list: Song[] = [];
  private count: number | null = null;
  private downloadProgress = 0;
  private tableFields = [
    {
      label: "下载",
      formatter: (row: Song) => {
        const h = this.$createElement;
        return h(
          "el-button",
          {
            on: {
              click: (ev: MouseEvent) => {
                ev.stopPropagation();
                this.handleDownload(row);
              },
            },
          },
          "下载"
        );
      },
    },
  ];
  
  // 用于存储下载弹框
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private downloadingMsg: any[] = [];

  private async created() {
    this.getSearchResult();
  }
  private handleDownloadProgress(ev: ProgressEvent, id: number) {
    const msgComponent = this.downloadingMsg[id];
    const message = `正在下载：${((ev.loaded / ev.total) * 100).toFixed(1)}%`;

    if (msgComponent) {
      msgComponent.message = message;
      if ((ev.loaded / ev.total) * 100 === 100) {
        msgComponent.close();
        this.downloadingMsg[id] = null;
      }
    } else {
      this.downloadingMsg[id] = this.$message({
        type: "info",
        message,
        duration: 0,
      });
    }
  }
  private async handleDownload(row: Song) {
    const url: string = await this.getSongUrl(row.id);
    const { data } = await downloadSongByUrl(url, (ev: ProgressEvent) =>
      this.handleDownloadProgress(ev, row.id)
    );

    const allArtistsName = row.artists.map((item) => item.name).join("_");
    downloadBlob(
      data,
      `${row.name.trim()}${allArtistsName ? " - " + allArtistsName : ""}`
    );
  }
  private async getSearchResult() {
    this.list = [];
    this.count = null;
    const { data } = await search({
      keywords: this.$route.params.kw,
    });
    if (data.code === 200) {
      const { result } = data;
      this.count = result.songCount;
      this.list = result.songs;
    }
  }
  @Watch("$route.params.kw", {
    immediate: false,
  })
  private routerChange(): void {
    this.getSearchResult();
  }
}

export default Search;
</script>

<style lang="less" scoped>
.search-page {
  height: 100%;
  padding: 32px;
}
</style>