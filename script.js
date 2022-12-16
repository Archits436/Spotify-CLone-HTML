//Initialize the variables

let songIndex = 0;
let audioElement = new Audio('songs/Let Me Love You.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songGif = document.getElementById('songGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Let Me Love You", filePath: "songs/Let Me Love You.mp3", coverPath: "covers/let me love you cover.jpg" },
    { songName: "Maan Meri Jaan", filePath: "songs/Maan Meri Jaan.mp3", coverPath: "covers/maan meri jaan cover.jpeg" },
    { songName: "Ishq Remix", filePath: "songs/Ishq Remix.mp3", coverPath: "covers/ishq remix cover.jpg" },
    { songName: "Starboy", filePath: "songs/Starboy.mp3", coverPath: "covers/starboy cover.jpg" },
    { songName: "Let Me Down Slowly", filePath: "songs/Let Me Down Slowly.mp3", coverPath: "covers/let me down slowly cover.jpg" },
    { songName: "Baller", filePath: "songs/Baller.mp3", coverPath: "covers/baller cover.jpg" },
    { songName: "Daku", filePath: "songs/Daku.mp3", coverPath: "covers/daku cover.jpg" },
    { songName: "Wolves", filePath: "songs/Wolves.mp3", coverPath: "covers/wolves cover.jpg" },
    { songName: "Bewafa", filePath: "songs/Bewafa.mp3", coverPath: "covers/bewafa cover.jpg" },
    { songName: "Mann Mera", filePath: "songs/Mann Mera.mp3", coverPath: "covers/mann mera cover.jpg" },
    { songName: "Tu Aake Dekhle", filePath: "songs/Tu Aake Dekhle.mp3", coverPath: "covers/tu aake dekhle cover.jpeg" },
    { songName: "Kina Chir", filePath: "songs/Kina Chir.mp3", coverPath: "covers/kina chir cover.jpg" },
    { songName: "Schedule", filePath: "songs/Schedule.mp3", coverPath: "covers/schedule cover.jpg" },
    { songName: "Asi Gabru Punjabi", filePath: "songs/Asi Gabru Punjabi.mp3", coverPath: "covers/asi gabru punjabi cover.jpg" },
    { songName: "Diamond", filePath: "songs/Diamond.mp3", coverPath: "covers/diamond cover.jpg" },
    { songName: "Lemonade", filePath: "songs/Lemonade.mp3", coverPath: "covers/lemonade cover.jpg" },
    { songName: "Excuses", filePath: "songs/Excuses.mp3", coverPath: "covers/excuses cover.jpg" },

]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.load();
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        songGif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        songGif.style.opacity = 0;
    }
})

audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 500);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 500;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if (audioElement.paused) {
            audioElement.src = `songs/${songs[songIndex].songName}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.load();
            audioElement.play();
            songGif.style.opacity = 1;
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
        else if (audioElement.played) {
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            audioElement.pause();
            songGif.style.opacity = 0;
        }
        audioElement.currentTime = 0;
    })
})

document.getElementById('next').addEventListener("click", () => {
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove("fa-circle-pause");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add("fa-circle-play");
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.load();
    audioElement.play();
    songGif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove("fa-circle-play");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add("fa-circle-pause");
})

document.getElementById('shuffle').addEventListener("click", () => {
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove("fa-circle-pause");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add("fa-circle-play");
    songIndex = Math.floor(Math.random() * songs.length)
    audioElement.src = `songs/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.load();
    audioElement.play();
    songGif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove("fa-circle-play");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add("fa-circle-pause");
})

document.getElementById('previous').addEventListener("click", () => {
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove("fa-circle-pause");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add("fa-circle-play");
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.load();
    audioElement.play();
    songGif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove("fa-circle-play");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add("fa-circle-pause");
})

audioElement.addEventListener('ended', function () {
    makeAllPlays();
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.pause();
    audioElement.src = `songs/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.load();
    audioElement.play();
    songGif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove("fa-circle-play");
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add("fa-circle-pause");
});

