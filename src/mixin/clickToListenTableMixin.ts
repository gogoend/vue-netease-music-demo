import { getSongFileInfo } from "@/api/song";

import { mapActions } from 'vuex'
import { Song } from "@/types/song";

export default {
  methods:{
     ...mapActions({
      updatePlayingNow: 'player/updatePlayingNow'
     }),
     handleRowClick: async function (row: Song) {
      // console.log(row, column, ev);
      const clickedSong = row;
      const { data: songFileInfo } = await getSongFileInfo({
        id: clickedSong.id,
      });
  
      this.updatePlayingNow({
        info: clickedSong,
        file: songFileInfo.data[0],
      });
    },
    getSongUrl: async function(id: number) {
      const { data: songFileInfo } = await getSongFileInfo({
        id,
      });
      return songFileInfo.data[0].url;
    }
  }
} 