import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const storage = 'vedeoplayer-current-time';

player.on('play', onPlay => player.on('timeupdate', throttle(setCurrentTimeStorage, 1000)));

function setCurrentTimeStorage(event) {
  localStorage.setItem(storage, event.seconds);
}

function getCurrentTimeStorage() {
  const storedVideo = localStorage.getItem(storage);
  if (storedVideo) {
    player.setCurrentTime(storedVideo);
  }
}

getCurrentTimeStorage();
