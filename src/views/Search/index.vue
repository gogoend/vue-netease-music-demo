<template>
  <div class="search-page">
    <section>
      与<b>{{ $route.params.kw }}</b
      >相关的搜索结果共有 {{ count === null ? "..." : count }} 条
    </section>
    <section>
      <el-table :data="list" style="width: 100%" @row-click="handleRowClick">
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
import { timeToString } from '@/utils/formatter';
import { Song, Artist } from "@/types/song";

// import { namespace } from "vuex-class";

const tableFields = [
  {
    prop: "name",
    label: "音乐标题",
  },
  {
    prop: "artists",
    label: "歌手",
    formatter(row: Song) {
    //   console.log(row, column, cellVal, index, "歌手");
      const allArtists = row.artists.map((item: Artist) => item.name);

      return allArtists.join(" / ");
    },
  },
  {
    prop: "albums",
    label: "专辑",
    formatter(row: Song) {
    //   console.log(row, column, cellVal, index, "专辑");
      return row.album.name
    },
  },
  {
    prop: "duration",
    label: "时长",
    formatter(row: Song) {
    //   console.log(row, column, cellVal, index, "时长");
      return timeToString(row.duration,'ms')
    },
  },
];

@Component
class Search extends Vue {
  private list = [];
  private count = null;
  private tableFields = tableFields;
  private async created() {
    this.getSearchResult();
  }
  private handleRowClick(row: Song, column: unknown, ev: MouseEvent) {
    console.log(row,column,ev)
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