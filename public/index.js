//socket connection
const socket = io();
socket.on('connect', () => {});

//button selectors
const rewindButton = document.querySelector('#back');
const playButton = document.querySelector('#play-inner-circle');
const pauseButton = document.querySelector('#pause-inner-circle');
const forwardButton = document.querySelector('#forward');
const messageBtn = document.querySelector('#message-box');
//const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
//const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

//song info selectors
const songTitle = document.querySelector('.song-title');
const songAuthor = document.querySelector('.song-author');

//initializes song index and prints song title in ipod
songArrayIndex = Math.floor(Math.random() * music.length);
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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  //const room = roomInput.value;

  if (message === '') return;

  displayMessage(message);

  socket.emit('send-message', message);

  messageInput.value = '';
});

// joinRoomButton.addEventListener('click', () => {
//   const room = roomInput.value;
//   socket.emit('join-room', room, (message) => {
//     displayMessage(message);
//   });
// });

function displayMessage(message) {
  const paragraph = document.createElement('p');
  paragraph.textContent = message;
  document.getElementById('message-bg').append(paragraph);
}

socket.on('message', (data) => {
  displayMessage(data);
});
