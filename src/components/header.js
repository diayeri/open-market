import { getToken, removeToken } from "../scripts/fetch.js";
const isLoggedIn = getToken();

// 헤더 로그인 - 마이페이지 버튼
const addMypageBtnUi = () => {
  let mypageBtnWrapper = document.querySelector("#mypageBtnWrapper");

  const mypageBtnUi = `
    <button type="button" class="btn-header" id="mypageBtn">
      <img src="./src/assets/img/icon-user.svg" alt="" />
      ${isLoggedIn ? "마이페이지" : "로그인"}
    </button>
    <div id="mypageDropdown">
      <a href="#" class="btn btn-sm" id="mypageLink">마이페이지</a>
      <button type="button" class="btn btn-sm" id="logout">로그아웃</button>
    </div>
  `;
  mypageBtnWrapper.insertAdjacentHTML("beforeend", mypageBtnUi);
};
addMypageBtnUi();

// 마이페이지 버튼 선택시
const mypageBtn = document.querySelector("#mypageBtn");
mypageBtn.addEventListener("click", (e) => {
  if (isLoggedIn) {
    e.currentTarget.classList.toggle("show-dropdown");
  } else {
    location.href = "./login.html";
  }
});

// 마이페이지 드롭다운 선택시
const mypageDropdown = document.querySelector("#mypageDropdown");
mypageDropdown.addEventListener("click", (e) => {
  if (e.target.id === "mypageLink") {
    alert("마이페이지는 준비중입니다");
  } else if (e.target.id === "logout") {
    removeToken();
    alert("로그아웃 되었습니다.");
    location.reload(true);
  }
});
