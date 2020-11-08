<template>
  <div class="search-page">
    <section>
      与<b>{{ $route.params.kw }}</b
      >相关的搜索结果共有 {{ count === null ? "..." : count }} 条
    </section>
    <section>
      <el-table
        :data="list"
        style="width: 100%; user-select: none"
        @row-click="handleRowClick"
        stripe
      >
        <el-table-column
          v-for="item in tableFields"
          :key="item.prop"
          v-bind="{ ...item }"
        ></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { search } from "@/api/search";
import { getSongFileInfo, downloadSongByUrl } from "@/api/song";
import { timeToString } from "@/utils/formatter";
import { Song, Artist, PlayingNow } from "@/types/song";
import { downloadBlob } from "@/utils/blob";

import { namespace } from "vuex-class";
const playerModule = namespace("player");

@Component
class Search extends Vue {
  private list = [];
  private count = null;
  private tableFields = [
    {
      prop: "name",
      label: "音乐标题",
    },
    {
      prop: "artists",
      label: "歌手",
      formatter(row: Song) {
        const allArtists = row.artists.map((item: Artist) => item.name);

        return allArtists.join(" / ");
      },
    },
    {
      prop: "albums",
      label: "专辑",
      formatter(row: Song) {
        return row.album.name;
      },
    },
    {
      prop: "duration",
      label: "时长",
      formatter(row: Song) {
        return timeToString(row.duration, "ms");
      },
    },
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

  @playerModule.Getter("playingNow")
  private playingNow!: PlayingNow | null;

  @playerModule.Action("updatePlayingNow")
  private updatePlayingNow!: (payload: PlayingNow) => void;

  private async created() {
    this.getSearchResult();
  }
  private async handleRowClick(row: Song) {
    // console.log(row, column, ev);
    const clickedSong = row;
    const { data: songFileInfo } = await getSongFileInfo({
      id: clickedSong.id,
    });

    this.updatePlayingNow({
      info: clickedSong,
      file: songFileInfo.data[0],
    });
  }
  private async getSongUrl(id: number) {
    const { data: songFileInfo } = await getSongFileInfo({
      id,
    });
    return songFileInfo.data[0].url;
  }
  private async handleDownload(row: Song) {
    const url: string = await this.getSongUrl(row.id);
    const { data } = await downloadSongByUrl(url);

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private routerChange(nVal: unknown, oVal: unknown): void {
    // void (nVal, oVal);
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