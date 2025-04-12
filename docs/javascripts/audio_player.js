document.addEventListener("DOMContentLoaded", function () {
    // 定义歌曲列表，可以自行扩展或修改
    const songs = [
      { title: "宋雨琦 - Giant", src: "{{ base_url }}/media/宋雨琦 - Giant.FLAC" },
      { title: "孙燕姿 - 雨天", src: "{{ base_url }}/media/孙燕姿 - 雨天.FLAC" },
      { title: "aespa - Hot Mess", src: "{{ base_url }}/media/aespa - Hot Mess.FLAC" }

      // 可继续增加其他歌曲
    ];
  
    let currentSongIndex = 0;
    let isPlaying = false;
    
    const audio = document.getElementById("bg-music");
    const songTitleElem = document.getElementById("song-title");
    const toggleButton = document.getElementById("toggle-music");
    const prevButton = document.getElementById("prev-song");
    const nextButton = document.getElementById("next-song");
  
    // 初始化音频和显示当前歌曲
    function loadSong(index) {
      if (index < 0 || index >= songs.length) return;
      const song = songs[index];
      audio.src = song.src;
      songTitleElem.textContent = song.title;
      // 当更换歌曲时，保持暂停状态，需要用户再次点击播放
      isPlaying = false;
      toggleButton.textContent = "播放背景音乐";
    }
  
    // 播放或暂停当前歌曲
    toggleButton.addEventListener("click", function () {
      if (!isPlaying) {
        audio.play().then(() => {
          isPlaying = true;
          toggleButton.textContent = "暂停背景音乐";
        }).catch((error) => {
          console.error("播放出错:", error);
        });
      } else {
        audio.pause();
        isPlaying = false;
        toggleButton.textContent = "播放背景音乐";
      }
    });
  
    // 播放下一首歌
    nextButton.addEventListener("click", function () {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      loadSong(currentSongIndex);
      // 自动播放下一首，如果之前是播放状态
      if (isPlaying) {
        audio.play().then(() => {
          toggleButton.textContent = "暂停背景音乐";
        }).catch((error) => {
          console.error("播放出错:", error);
        });
      }
    });
  
    // 播放上一首歌
    prevButton.addEventListener("click", function () {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      loadSong(currentSongIndex);
      if (isPlaying) {
        audio.play().then(() => {
          toggleButton.textContent = "暂停背景音乐";
        }).catch((error) => {
          console.error("播放出错:", error);
        });
      }
    });
  
    // 页面加载时初始化当前歌曲
    loadSong(currentSongIndex);
  
    // 当当前歌曲播放完毕时，自动切换到下一首
    audio.addEventListener("ended", function () {
      nextButton.click();
    });
  });
  