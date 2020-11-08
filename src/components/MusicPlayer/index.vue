<template>
  <section class="music-player">
    <audio class="audio">
      <source />
    </audio>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {Song} from '@/types/song'

import { namespace } from "vuex-class";
const playerModule = namespace("player");

@Component
export default class MusicPlayer extends Vue {
  @playerModule.Getter("playingNow") private playingNow!: {
    info: Song;
    url: string;
  } | null;
  @playerModule.Mutation('updatePlayingNow') private updatePlayingNow!: {
    info: Song;
    url: string;
  } | null;
}
</script>

<style lang="less" scoped>
.audio {
  display: none;
}
</style>