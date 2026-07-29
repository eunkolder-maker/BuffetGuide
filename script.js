// =========================
// 1. 필요한 요소 가져오기
// =========================
const searchInput = document.querySelector("#food-search");
const resetButton = document.querySelector("#reset-button");
const detailCard = document.querySelector("#detail-card");
const stickyArea = document.querySelector("#search-sticky-area");
const stickySentinel = document.querySelector("#search-sticky-sentinel");

// =========================
// 2. 검색창 고정 상태 디자인
//
// 검색창의 실제 고정은 CSS의 position: sticky가 담당하고,
// JavaScript는 상단에 붙은 순간 is-stuck 클래스를 추가합니다.
// =========================
if (stickyArea && stickySentinel) {
  const stickyObserver = new IntersectionObserver(
    ([entry]) => {
      stickyArea.classList.toggle("is-stuck", !entry.isIntersecting);
    },
    {
      threshold: 0,
      rootMargin: `-${Math.max(1, window.visualViewport?.offsetTop || 0)}px 0px 0px 0px`
    }
  );

  stickyObserver.observe(stickySentinel);
}

// =========================
// 3. 음식 검색 준비
//
// 아직 음식 데이터가 연결되지 않았기 때문에,
// 현재는 입력한 검색어를 콘솔에서 확인할 수 있습니다.
// =========================
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const keyword = event.target.value.trim();
    console.log("검색어:", keyword);
  });
}

// =========================
// 4. 전체 보기 버튼
// =========================
if (resetButton) {
  resetButton.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
    }

    document.querySelectorAll(".hotspot").forEach((hotspot) => {
      hotspot.classList.remove("is-active");
    });

    if (detailCard) {
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
  });
}
