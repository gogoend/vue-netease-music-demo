<template>
  <section class="music-list-table">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      style="width: 100%; user-select: none"
      stripe
      :data="renderedData"
    >
      <el-table-column
        v-for="item in tableFields"
        :key="item.prop"
        v-bind="{ ...item }"
      ></el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="false"
      :page-size="perPageCount"
      :total="totalCount"
      :current-page="currentPage"
      @size-change="handlePageSizeChange"
      @current-change="handlePageChange"
      :page-sizes="[10,20,50,100]"
    ></el-pagination>
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
  }) 
  private extraCol!: [];

  private tableFields = [];

  private renderedData = [];

  @Prop({
    type: Function,
    default: null
  }) private backendAPI!: Promise<any> | null

  @Prop({
    type: Object,
    default:()=>({})
  })
  private params!: {}

  private created () {
      this.tableFields = [...tableFields, ...this.extraCol]
      this.getData()
  }

  @playerModule.Getter("playingNow")
  private playingNow!: PlayingNow | null;

  private perPageCount = 10

  private totalCount = 0

  private currentPage = 1

  @Prop({
    type: String,
    default: ''
  })
  private countField !: string

  @Prop({
    type: String,
    default: ''
  })
  private resultField !: string

  private async getData(){
    if(typeof this.backendAPI === 'function'){
      const { data } = await this.backendAPI({
        limit: this.perPageCount,
        offset: this.currentPage - 1,
        ...this.params
      })
      this.totalCount = data.result[this.countField]
      this.renderedData = data.result[this.resultField]
    }
    // this.renderedData
  }

  private handlePageChange(page: number){
    this.currentPage = page
    this.getData()
  }

  private handlePageSizeChange(perPageCount: number){
    this.perPageCount = perPageCount
    this.currentPage = 1
    this.getData()
  }

}

export default MusicListTable;
</script>

<style lang="less" scoped>
.search-page {
  height: 100%;
  padding: 32px;
}
</style>