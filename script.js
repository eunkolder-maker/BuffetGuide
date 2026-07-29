// =========================
// 1. 필요한 요소
// =========================
const searchInput = document.querySelector("#food-search");
const resetButton = document.querySelector("#reset-button");
const detailCard = document.querySelector("#detail-card");
const searchSlot = document.querySelector("#search-slot");
const searchArea = document.querySelector("#search-sticky-area");

// =========================
// 2. iPhone Safari 대응 검색창 고정
//
// CSS position: sticky에 의존하지 않고,
// 검색창의 원래 위치를 기준으로 fixed 클래스를 직접 전환합니다.
// =========================
let searchStartY = 0;
let ticking = false;

function getViewportTop() {
  // Safari 주소창이 움직일 때 visualViewport 값이 달라질 수 있습니다.
  return window.visualViewport ? window.visualViewport.offsetTop : 0;
}

function measureSearchPosition() {
  if (!searchSlot || !searchArea) return;

  const wasFixed = searchArea.classList.contains("is-fixed");

  if (wasFixed) {
    searchArea.classList.remove("is-fixed");
  }

  searchStartY = searchSlot.getBoundingClientRect().top + window.scrollY;

  if (wasFixed) {
    updateSearchPosition();
  }
}

function updateSearchPosition() {
  if (!searchSlot || !searchArea) return;

  const viewportTop = getViewportTop();
  const shouldFix = window.scrollY + viewportTop >= searchStartY;

  searchArea.classList.toggle("is-fixed", shouldFix);
}

function requestSearchUpdate() {
  if (ticking) return;

  ticking = true;

  window.requestAnimationFrame(() => {
    updateSearchPosition();
    ticking = false;
  });
}

if (searchSlot && searchArea) {
  measureSearchPosition();
  updateSearchPosition();

  window.addEventListener("scroll", requestSearchUpdate, { passive: true });
  window.addEventListener("resize", measureSearchPosition);

  window.addEventListener("orientationchange", () => {
    window.setTimeout(measureSearchPosition, 120);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", requestSearchUpdate);
    window.visualViewport.addEventListener("scroll", requestSearchUpdate);
  }

  window.addEventListener("load", measureSearchPosition);
}

// =========================
// 3. 음식 검색 준비
// =========================
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const keyword = event.target.value.trim();
    console.log("검색어:", keyword);
  });

  searchInput.addEventListener("search", (event) => {
    const keyword = event.target.value.trim();
    console.log("검색 실행:", keyword);
  });
}

// =========================
// 4. 전체 보기 버튼
// =========================
function showEmptyDetail() {
  if (!detailCard) return;

  detailCard.innerHTML = `
    <div class="empty-state">
      <span class="empty-icon">⌁</span>
      <h2>선택한 코너</h2>
      <p>
        이후 배치도의 음식 코너를 터치하면 사진, 기물,
        세팅 방법과 주의사항이 여기에 표시됩니다.
      </p>
    </div>
  `;
}

if (resetButton) {
  resetButton.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
      searchInput.blur();
    }

    document.querySelectorAll(".hotspot").forEach((hotspot) => {
      hotspot.classList.remove("is-active");
    });

    showEmptyDetail();
  });
}
