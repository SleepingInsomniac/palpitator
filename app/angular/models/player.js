app.factory(
'Player',
function() {
  
  return {
    song: null,
    playlist: null,
    playing: false,
    songIndex: null,
    
    playPause: function() {
      this.playing = !this.playing;
      if (this.playing && !this.song) {
        this.song = this.playlist.list[0];
        this.songIndex = 0;
      }
      this.playing ? this.play() : this.pause();
    },
    
    previous: function() {
      if (this.songIndex <= 0) {
        this.song = this.songIndex = null;
      } else {
        this.song = this.playlist.list[--this.songIndex];
        this.play();
      }
    },
    
    forward: function() {
      if (this.songIndex >= this.playlist.length) {
        this.song = this.songIndex = null;
      } else {
        this.song = this.playlist.list[++this.songIndex];
        this.play();
      }
    }
  };
  
});