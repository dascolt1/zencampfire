window.onload = () => {
  //button selectors
  const rewindButton = document.querySelector('#back');
  const playButton = document.querySelector('#play-inner-circle');
  const pauseButton = document.querySelector('#pause-inner-circle');
  const forwardButton = document.querySelector('#forward');

  //song info selectors
  const songTitle = document.querySelector('.song-title');
  const songAuthor = document.querySelector('.song-author');

  //initializes song index and prints song title in ipod
  songArrayIndex = 0;
  getSongInfo(music[songArrayIndex]);

  //button event listeners
  rewindButton.addEventListener('click', rewind);
  pauseButton.addEventListener('click', pause);
  forwardButton.addEventListener('click', forward);
  playButton.addEventListener('click', play);

  pauseButton.style.display = 'none';

  const state = {
    isPlaying: false,
  };

  let songToPlay = new Audio(music[songArrayIndex].track);

  //music player logic
  function goUpXSongs(x) {
    songArrayIndex =
      (((songArrayIndex + x) % music.length) + music.length) % music.length;
    songToPlay.pause();
    songToPlay = new Audio(music[songArrayIndex].track);
    getSongInfo(songArrayIndex);
    if (state.isPlaying) {
      songToPlay.play();
    }
  }

  function rewind() {
    goUpXSongs(-1);
  }

  function play() {
    songToPlay.play();
    state.isPlaying = true;
    document.body.classList.add('animate');
    playToPause();
  }

  function pause() {
    songToPlay.pause();
    state.isPlaying = false;
    pauseToPlay();
  }

  function forward() {
    goUpXSongs(1);
  }

  function playToPause() {
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
  }

  function pauseToPlay() {
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
  }

  function getSongInfo(index) {
    songTitle.innerHTML = music[songArrayIndex].song;
    songAuthor.innerHTML = music[songArrayIndex].artist;
  }
};
