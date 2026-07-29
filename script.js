// 앞으로 음식 검색과 코너 클릭 기능을 이 파일에 추가합니다.

const searchInput = document.querySelector("#food-search");
const resetButton = document.querySelector("#reset-button");
const detailCard = document.querySelector("#detail-card");

searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.trim();

  // 아직 코너 데이터가 연결되지 않았기 때문에
  // 현재는 입력값만 확인할 수 있도록 콘솔에 표시합니다.
  console.log("검색어:", keyword);
});

resetButton.addEventListener("click", () => {
  searchInput.value = "";

  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.classList.remove("is-active");
  });

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
});
