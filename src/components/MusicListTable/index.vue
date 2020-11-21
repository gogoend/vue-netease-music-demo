<template>
  <section class="music-list-table">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      style="width: 100%; user-select: none"
      stripe
    >
      <el-table-column
        v-for="item in tableFields"
        :key="item.prop"
        v-bind="{ ...item }"
      ></el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { timeToString, formatArtists } from "@/utils/formatter";
import { Song, PlayingNow } from "@/types/song";

import { namespace } from "vuex-class";
const playerModule = namespace("player");

const tableFields = [
  {
    prop: "name",
    label: "音乐标题",
  },
  {
    prop: "artists",
    label: "歌手",
    formatter(row: Song) {
      return formatArtists(row.artists)
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
    }
  }
];

@Component
class MusicListTable extends Vue {
  private count: number | null = null;
  @Prop({
      type: Array,
      default:()=>[]
  }) extraCol!: []
  private tableFields = [];
  private created () {
      this.tableFields = [...tableFields, ...this.extraCol]
  }

  @playerModule.Getter("playingNow")
  private playingNow!: PlayingNow | null;

}

export default MusicListTable;
</script>

<style lang="less" scoped>
.search-page {
  height: 100%;
  padding: 32px;
}
</style>