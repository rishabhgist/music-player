const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Music Player Elements
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextbtn = document.getElementById('next');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let isPlaying = false;

// Music 
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electirc Chill Machine',
        artist:'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist:'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight Disco Queen',
        artist:'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist:'Metric/Jacinto Design',
    }
]

// Play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause
playBtn.addEventListener('click', () => (isPlaying) ? pauseSong() : playSong());

// Update the DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song 
let songIndex = 0;

// Previous song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select first song 
loadSong(songs[songIndex]);

//Update Progress Bar
function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPrecentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPrecentage}%`;
        const durationMin = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (duration) {
            durationEl.textContent = `${durationMin}:${durationSeconds}`;
        }

        // Display Current Time
        const currentMin = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentTime) {
            currentTimeEl.textContent = `${currentMin}:${currentSeconds}`;
        }
    }
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextbtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress)