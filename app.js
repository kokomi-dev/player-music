
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const listSong = $('.home-trending-list')
const imgPlay = $('.modal-play-cd-thumb')
const heading = $('.play-modal-name')
const song = $('.play-modal-song')
const audio = $('#audio')
const playBtn = $('.fa-play')
const play = $('.music-modal-container')
const progress = $('.play-modal-range')
const next = $(".btn-next")
const pre = $(".btn-pre")
const random = $(".random")
const app = {
  currentIndex: 0,
  isPLaying: false,
  songs: [
    {
      name: "Như anh đã từng thấy em",
      singer: "Phúc XP",
      path: "./music/song1.mp3",
      img: "./img/img1.jpeg"
    },
    {
      name: "Yêu người có ước mơ",
      singer: "Trường Linh",
      path: "./music/song2.mp3",
      img: "./img/img2.jpeg"
    },
    {
      name: "Ghé vào tai",
      singer: "Umie,Freaky",
      path: "./music/song3.mp3",
      img: "./img/img3.jpeg"
    },
    {
      name: "Ghé vào tai",
      singer: "Umie,Freaky",
      path: "./music/song3.mp3",
      img: "./img/img3.jpeg"
    }
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
            <div class="home-trending-item">
            <div class="trending-item-play-hover">
              <i class="fa-regular fa-circle-play"></i>
            </div>
            <div class="trending-item-info"  >
            <img src = "${song.img}">
              <div div class="item-info-title" >
                  <span class="item-info-name">${song.name}</span>
                  <br>
                  <span class="item-info-song">${song.singer}</span>
                </div>
                <span class="item-info-time">
                  03.29
                </span>
                <br>
                <span class="item-info-view">12 930 248</span>
              </div>
            <div class="trending-item-interact">
              <i class="fa-regular fa-heart"></i>
              <i class="fa-solid fa-ellipsis"></i>
            </div>
          </div>  
      `
    });
    listSong.innerHTML = htmls.join('')
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex]
      }
    })
  },
  handleEvents: function () {
    // quay đĩa cd theo bài nhạc

    const cdthumb = $(".modal-play-cd-thumb")
    const thumbAnimation = cdthumb.animate([
      { transform: "rotate(360deg)" }
    ],
      {
        duration: 20000,
        iterations: Infinity
      }
    )
    thumbAnimation.pause();
    // play pause âm nhạc
    const _this = this;
    playBtn.onclick = function () {
      if (_this.isPLaying) {
        audio.pause();
      }
      else {
        audio.play();
      }
    }
    audio.onplay = function () {
      _this.isPLaying = true;
      play.classList.add('playing');
      thumbAnimation.play()
    }
    audio.onpause = function () {
      _this.isPLaying = false;
      play.classList.remove('playing');
      thumbAnimation.pause();
    }

    // chạy thanh theo thời gian nhạc
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const dueSong = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = dueSong;
      }
    }
    // xử lí hành động tua bài
    if (!progress.onchange) {
      progress.onchange = function (e) {
        // bắt hành động thay đổi của thanh input-range
        const seekTime = audio.duration / 100 * e.target.value
        audio.currentTime = seekTime
        audio.play()
      }
    }
    // xử lí hành động tiến và lùi bài
    next.onclick = function () {
      _this.nextSong();
      audio.play()
    }
    pre.onclick = function () {
      _this.preSong();
      audio.play()
    }
    random.onclick = function () {
      _this.randomSong();
      audio.play()
    }
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name
    imgPlay.style.backgroundImage = `url('${this.currentSong.img}')`
    song.textContent = this.currentSong.singer
    audio.src = this.currentSong.path
  },
  nextSong: function () {
    this.currentIndex++
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  preSong: function () {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
  },
  randomSong: function () {
    this.currentIndex = Math.floor(Math.random() * this.songs.length)
    console.log(this.currentIndex)
    this.loadCurrentSong()
  },
  start: function () {
    //ddijng nghĩa các thuộc tính
    this.defineProperties();
    // render danh sách bài hát
    this.render();
    // lấy thông tin bài hát đầu tiên trong mảng
    this.loadCurrentSong();
    this.nextSong();
    this.preSong();
    this.randomSong();
    // xử lí thao tác người dùng
    this.handleEvents();
  }
}
app.start();