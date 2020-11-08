<template>
  <section class="music-player">
    <audio
      controls
      ref="musicPlayer"
      class="audio"
      :src="playingNow && playingNow.file ? playingNow.file.url : ''"
    ></audio>
  </section>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "vue-property-decorator";

import { PlayingNow } from "@/types/song";

import { namespace } from "vuex-class";
const playerModule = namespace("player");

@Component
export default class MusicPlayer extends Vue {
  @playerModule.Getter("playingNow")
  private playingNow!: PlayingNow | null;

  @playerModule.Action("updatePlayingNow")
  private updatePlayingNow!: (payload: PlayingNow) => void;

  @Ref() readonly musicPlayer!: HTMLAudioElement;

  @Watch("playingNow.file.url", {
    immediate: false,
  })
  private handleSongUrlChange() {
    this.$nextTick(() => {
      this.musicPlayer.play();
    });
  }
}
</script>

<style lang="less" scoped>
.audio {
//   display: none;
}
</style>