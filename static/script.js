// let currentSong = new Audio;
// let songs;
// let currFolder;

// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');
//     return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getSongs(folder) {
//     currFolder = folder;
//     let res = await fetch(`/api/songs/${folder}`);
//     let songList = await res.json();
//     songs = songList;

//     let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
//     songUl.innerHTML = "";
//     for (const song of songs) {
//         songUl.innerHTML += `<li>
//             <img class="invert" src="music.svg" alt="">
//             <div class="info"><div>${song}</div></div>
//             <div class="playnow"><span>Play now</span><img class="invert" src="play.svg" alt=""></div>
//         </li>`;
//     }

//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", () => {
//             playMusic(e.querySelector(".info").firstElementChild.innerHTML);
//         });
//     });
//     return songs;
// }

// const playMusic = (track, pause = false) => {
//     currentSong.src = `/songs/${currFolder}/${track}`;
//     if (!pause) {
//         currentSong.play();
//         play.src = "pause.svg";
//     }
//     document.querySelector(".songinfo").innerHTML = decodeURI(track);
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
// }

// async function displayAlbums() {
//     let res = await fetch("/api/albums");
//     let albums = await res.json();
//     let cardContainer = document.querySelector(".cardContainer");
//     cardContainer.innerHTML = "";

//     for (let album of albums) {
//         cardContainer.innerHTML += `
//             <div data-folder="${album.folder}" class="card">
//                 <div class="play">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="#960096">
//                         <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
//                         <path d="M15.9453 12.3948C15.7686 13.0215 14.9333 13.4644 13.2629 14.3502C11.648 15.2064 10.8406 15.6346 10.1899 15.4625C9.9209 15.3913 9.6758 15.2562 9.47812 15.0701C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.47812 8.92995C9.6758 8.74381 9.9209 8.60868 10.1899 8.53753C10.8406 8.36544 11.648 8.79357 13.2629 9.64983C14.9333 10.5356 15.7686 10.9785 15.9453 11.6052C16.0182 11.8639 16.0182 12.1361 15.9453 12.3948Z"
//                               stroke="currentColor" stroke-width="1.5" fill="black" stroke-linejoin="round"/>
//                     </svg>
//                 </div>
//                 <img src="${album.cover || 'default.jpg'}" alt="">
//                 <h2>${album.title}</h2>
//                 <p>${album.description}</p>
//             </div>`;
//     }

//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             songs = await getSongs(item.currentTarget.dataset.folder);
//             playMusic(songs[0]);
//         });
//     });
// }

// async function main() {
//     await getSongs("badmos");
//     playMusic(songs[0], true);
//     displayAlbums();

//     play.addEventListener("click", () => {
//         if (currentSong.paused) {
//             currentSong.play();
//             play.src = "pause.svg";
//         } else {
//             currentSong.pause();
//             play.src = "play.svg";
//         }
//     });

//     currentSong.addEventListener("timeupdate", () => {
//         document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
//         document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
//     });

//     document.querySelector(".seekbar").addEventListener("click", e => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         document.querySelector(".circle").style.left = percent + "%";
//         currentSong.currentTime = ((currentSong.duration) * percent) / 100;
//     });

//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "0";
//     });

//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-120%";
//     });

//     previous.addEventListener("click", () => {
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
//         if ((index - 1) >= 0) {
//             playMusic(songs[index - 1]);
//         }
//     });

//     next.addEventListener("click", () => {
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
//         if ((index + 1) < songs.length) {
//             playMusic(songs[index + 1]);
//         } else {
//             playMusic(songs[0]);
//         }
//     });

//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//         currentSong.volume = parseInt(e.target.value) / 100;
//         if (currentSong.volume > 0) {
//             document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume-knob.svg");
//         }
//     });

//     document.querySelector(".volume>img").addEventListener("click", e => {
//         if (e.target.src.includes("volume-knob.svg")) {
//             e.target.src = e.target.src.replace("volume-knob.svg", "mute.svg");
//             currentSong.volume = 0;
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
//         } else {
//             e.target.src = e.target.src.replace("mute.svg", "volume-knob.svg");
//             currentSong.volume = .1;
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 30;
//         }
//     });

//     currentSong.addEventListener("ended", () => {
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
//         if ((index + 1) < songs.length) {
//             playMusic(songs[index + 1]);
//         } else {
//             playMusic(songs[0]);
//         }
//     });
// }

// main();


let currentSong = new Audio();
let songs = [];
let currFolder = "";
let currentSongIndex = 0;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let res = await fetch(`/api/songs/${folder}`);
    songs = await res.json();

    let songUl = document.querySelector(".songlist ul");
    songUl.innerHTML = "";
    for (const song of songs) {
        songUl.innerHTML += `<li>
            <img class="invert" src="music.svg" alt="">
            <div class="info"><div>${song}</div></div>
            <div class="playnow"><span>Play now</span><img class="invert" src="play.svg" alt=""></div>
        </li>`;
    }

    Array.from(document.querySelectorAll(".songlist li")).forEach((li, index) => {
        li.addEventListener("click", () => {
            playMusic(index);
        });
    });

    return songs;
}

function playMusic(index, pause = false) {
    currentSongIndex = index;
    currentSong.src = `/songs/${currFolder}/${songs[index]}`;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(songs[index]);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let res = await fetch("/api/albums");
    let albums = await res.json();
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";

    for (let album of albums) {
        cardContainer.innerHTML += `
            <div data-folder="${album.folder}" class="card">
                <div class="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="#960096">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M15.9453 12.3948C15.7686 13.0215 14.9333 13.4644 13.2629 14.3502C11.648 15.2064 10.8406 15.6346 10.1899 15.4625C9.9209 15.3913 9.6758 15.2562 9.47812 15.0701C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.47812 8.92995C9.6758 8.74381 9.9209 8.60868 10.1899 8.53753C10.8406 8.36544 11.648 8.79357 13.2629 9.64983C14.9333 10.5356 15.7686 10.9785 15.9453 11.6052C16.0182 11.8639 16.0182 12.1361 15.9453 12.3948Z"
                              stroke="currentColor" stroke-width="1.5" fill="black" stroke-linejoin="round"/>
                    </svg>
                </div>
                <img src="${album.cover || 'default.jpg'}" alt="">
                <h2>${album.title}</h2>
                <p>${album.description}</p>
            </div>`;
    }

    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async () => {
            songs = await getSongs(card.dataset.folder);
            playMusic(0);
        });
    });
}

async function main() {
    await getSongs("badmos");
    playMusic(0, true);
    displayAlbums();

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left =
            `${(currentSong.currentTime / currentSong.duration) * 100}%`;
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        currentSong.currentTime = (currentSong.duration * percent) / 100;
        document.querySelector(".circle").style.left = `${percent}%`;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    previous.addEventListener("click", () => {
        if (currentSongIndex > 0) {
            playMusic(currentSongIndex - 1);
        }
    });

    next.addEventListener("click", () => {
        if (currentSongIndex < songs.length - 1) {
            playMusic(currentSongIndex + 1);
        } else {
            playMusic(0); // loop to first
        }
    });

    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src =
                document.querySelector(".volume>img").src.replace("mute.svg", "volume-knob.svg");
        }
    });

    document.querySelector(".volume>img").addEventListener("click", e => {
        let img = document.querySelector(".volume>img");
        if (img.src.includes("volume-knob.svg")) {
            img.src = img.src.replace("volume-knob.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            img.src = img.src.replace("mute.svg", "volume-knob.svg");
            currentSong.volume = 0.3;
            document.querySelector(".range input").value = 30;
        }
    });

    currentSong.addEventListener("ended", () => {
        if (currentSongIndex < songs.length - 1) {
            playMusic(currentSongIndex + 1);
        } else {
            playMusic(0);
        }
    });
}

main();
