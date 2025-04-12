document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const toggleButton = document.getElementById("toggle-music");
  
    // 默认状态为暂停
    let isPlaying = false;
  
    // 按钮点击事件，控制播放和暂停
    toggleButton.addEventListener("click", function () {
      if (!isPlaying) {
        // 尝试播放音频
        audio.play().then(() => {
          isPlaying = true;
          toggleButton.textContent = "暂停背景音乐";
        }).catch((error) => {
          console.error("音频播放出错:", error);
        });
      } else {
        audio.pause();
        isPlaying = false;
        toggleButton.textContent = "播放背景音乐";
      }
    });
  });
  