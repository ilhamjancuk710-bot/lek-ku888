const toast = document.getElementById("toast");
const menuBtn = document.getElementById("menuBtn");
const demoBtn = document.getElementById("demoBtn");
const refreshBtn = document.getElementById("refreshBtn");
const copyBtn = document.getElementById("copyBtn");
const linkSelect = document.getElementById("linkSelect");
const selectedLink = document.getElementById("selectedLink");
const searchInput = document.getElementById("searchInput");
const menuItems = [...document.querySelectorAll(".menu-item")];
const gameCards = [...document.querySelectorAll(".game-card")];
const playButtons = [...document.querySelectorAll(".play-btn")];
const emptyState = document.getElementById("emptyState");
const gameCount = document.getElementById("gameCount");
const PLAY_URLS = {
  "Adventure Game": "https://d3pr994l7txgml.cloudfront.net/gs2c/html5Game.do?extGame=1&symbol=vswaysmahwblck&gname=Mahjong%20Wins%203%20-%20Black%20Scatter&jurisdictionID=99&mgckey=stylename@generic~SESSION@bc4ed061-4420-4603-9640-a42970213964",
  "Olympus Quest": "https://m.eajzzxhro.com/65/index.html?ot=ca7094186b309ee149c55c8822e7ecf2&l=en&btt=2&or=21novodx%3Dzveuuscmj%3Dxjh&__hv=2fMEQCICuqoNGFMML4fGBdQE%2BkWN6hW4%2FfORGq%2Fnk1ZEMnawwmAiAxGYxJjOCWQZyBSVILpJeMljpfcPHLJNuUZN5itlB12A%3D%3D&__sv=010401YytG6oT6vOl81kKt_NDwR6QjynyruQC7y9kpWiV7QEg",
  "Game Mania": "https://d3pr994l7txgml.cloudfront.net/gs2c/html5Game.do?extGame=1&symbol=vs20olympgold&gname=Gates%20of%20Olympus%20Super%20Scatter&jurisdictionID=99&mgckey=stylename@generic~SESSION@81b5c92b-4986-4b3e-8255-418e0795f247",
  "Western Quest": "https://d3pr994l7txgml.cloudfront.net/gs2c/html5Game.do?extGame=1&symbol=vs20swbonsup&gname=Sweet%20Bonanza%20Super%20Scatter&jurisdictionID=99&mgckey=stylename@generic~SESSION@ba721831-1d87-4842-94c5-b835a9b69cae",
  "Ocean Adventure": "https://freedemo.games/en/slots/ocean-adventure?view=demo&trafficSource=fdg_yt",
  "Fantasy World": "https://freedemo.games/en/slots/fantasy-world?view=demo&trafficSource=fdg_yt",
  "Treasure Hunt": "",
  "Dragon Quest": ""
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function filterGames(keyword = "") {
  const normalizedKeyword = keyword.toLowerCase().trim();
  let visibleGames = 0;
  gameCards.forEach(card => {
    const matches = card.dataset.game.toLowerCase().includes(normalizedKeyword);
    card.hidden = !matches;
    if (matches) visibleGames += 1;
  });
  gameCount.textContent = `${visibleGames} game`;
  emptyState.hidden = visibleGames !== 0;
}

menuBtn.addEventListener("click", () => {
  document.getElementById("menuGrid").scrollIntoView({ behavior: "smooth" });
  showToast("Menu dibuka");
});
demoBtn.addEventListener("click", () => showToast("Mode demo aktif"));
refreshBtn.addEventListener("click", () => {
  searchInput.value = "";
  menuItems.forEach(item => item.classList.toggle("active", item.dataset.name === "Semua"));
  filterGames();
  showToast("Daftar game diperbarui");
});

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(menuItem => menuItem.classList.remove("active"));
    item.classList.add("active");
    if (item.dataset.name === "Game" || item.dataset.name === "Semua") {
      searchInput.value = "";
      filterGames();
      document.getElementById("gameGrid").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      searchInput.value = item.dataset.name;
      filterGames(item.dataset.name);
    }
    showToast(`Kategori: ${item.dataset.name}`);
  });
});

playButtons.forEach(button => {
  button.addEventListener("click", () => {
    window.location.href = PLAY_URLS[button.dataset.gameName];
  });
});

linkSelect.addEventListener("change", () => {
  selectedLink.textContent = linkSelect.value;
  showToast(`Link dipilih: ${linkSelect.value}`);
});

copyBtn.addEventListener("click", async () => {
  const text = linkSelect.value;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Link berhasil disalin");
  } catch {
    showToast(`Salin manual: ${text}`);
  }
});

searchInput.addEventListener("input", () => {
  menuItems.forEach(item => item.classList.remove("active"));
  filterGames(searchInput.value);
});
