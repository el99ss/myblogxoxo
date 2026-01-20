// --- Helpers ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const sfxClick = $("#sfxClick");
const sfxHover = $("#sfxHover");
const toast = $("#toast");

// Some browsers block autoplay; play only after user interaction
function playSound(audioEl) {
  if (!audioEl) return;
  try {
    audioEl.currentTime = 0;
    audioEl.play();
  } catch (_) {}
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1200);
}

// --- Navigation ---
function goTo(id) {
  $$(".panel").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function attachSparkleSfx(el) {
  el.addEventListener("click", () => playSound(sfxClick));
  el.addEventListener("mouseenter", () => playSound(sfxHover));
}

$$(".navBtn").forEach(btn => {
  attachSparkleSfx(btn);
  btn.addEventListener("click", () => goTo(btn.dataset.go));
});

$$("[data-go]").forEach(btn => {
  attachSparkleSfx(btn);
  btn.addEventListener("click", () => goTo(btn.dataset.go));
});

// Extra buttons
$("#playSfx").addEventListener("click", () => {
  playSound(sfxClick);
  showToast("✨ sparkle sound ✨");
});

$("#popupBtn").addEventListener("click", () => {
  playSound(sfxClick);
  showToast("ok bestie ♡");
});

// --- Music data (cambia qui) ---
const albums = [
  {
    title: "2000s Disney Mood",
    desc: "songs from tv shows + sparkle vibes",
    cover: "assets/cover1.jpg",
    songs: ["track 01", "track 02", "track 03"]
  },
  {
    title: "Nickelodeon Energy",
    desc: "fun + chaotic + bubblegum",
    cover: "assets/cover2.jpg",
    songs: ["track A", "track B", "track C"]
  },
  {
    title: "Hyperpop Princess",
    desc: "cunty + sad girls club",
    cover: "assets/cover3.jpg",
    songs: ["song x", "song y", "song z"]
  }
];

let albumIndex = 0;

function renderAlbum(i) {
  const a = albums[i];
  $("#coverImg").src = a.cover;
  $("#albumTitle").textContent = a.title;
  $("#albumDesc").textContent = a.desc;

  const list = $("#songList");
  list.innerHTML = "";
  a.songs.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    list.appendChild(li);
  });
}

$("#prev").addEventListener("click", () => {
  playSound(sfxClick);
  albumIndex = (albumIndex - 1 + albums.length) % albums.length;
  renderAlbum(albumIndex);
});
$("#next").addEventListener("click", () => {
  playSound(sfxClick);
  albumIndex = (albumIndex + 1) % albums.length;
  renderAlbum(albumIndex);
});
$("#random").addEventListener("click", () => {
  playSound(sfxClick);
  albumIndex = Math.floor(Math.random() * albums.length);
  renderAlbum(albumIndex);
  showToast("random album ✧");
});

renderAlbum(albumIndex);

// --- TV shows data (cambia qui) ---
const tvShows = [
  { name: "That’s So Raven", tag: "disney", emoji: "✶" },
  { name: "Hannah Montana", tag: "disney", emoji: "★" },
  { name: "iCarly", tag: "nick", emoji: "✿" },
  { name: "Wizards", tag: "disney", emoji: "✧" },
  { name: "Zoey 101", tag: "nick", emoji: "♡" },
  { name: "Bratz", tag: "y2k", emoji: "✦" },
  { name: "Clueless", tag: "movie", emoji: "❀" },
  { name: "Gossip vibe", tag: "teen", emoji: "✩" }
];

const grid = $("#tvGrid");

tvShows.forEach(show => {
  const card = document.createElement("div");
  card.className = "tvCard sparkle";

  card.innerHTML = `
    <div class="tvThumb">${show.emoji}</div>
    <div class="tvInfo">
      <div class="name">${show.name}</div>
      <div class="tag">${show.tag}</div>
    </div>
  `;

  attachSparkleSfx(card);
  card.addEventListener("click", () => {
    showToast(`♡ ${show.name}`);
  });

  grid.appendChild(card);
});
