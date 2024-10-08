import { fetchLogin, setToken } from "./fetch.js";

const $buyerLoginForm = document.querySelector("#buyerLoginForm");
const $buyerLoginTab = document.querySelector("#buyerLoginTab");
// const $buyerLoginBtn = document.querySelector("#buyerLoginBtn");
const $buyerId = document.querySelector("#buyerId");
const $buyerPassword = document.querySelector("#buyerPassword");
const $buyerLoginErr = document.querySelector("#buyerLoginErr");

const $sellerLoginForm = document.querySelector("#sellerLoginForm");
const $sellerLoginTab = document.querySelector("#sellerLoginTab");

$buyerLoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = $buyerId.value.trim();
  const pw = $buyerPassword.value;
  if (id && pw) {
    const loginRes = await fetchLogin(id, pw, "BUYER");
    if (loginRes.ok) {
      // 계정정보 일치
      history.back();
      console.log(loginRes.data);
      setToken(loginRes.data.token);
    } else {
      // 계정정보 불일치
      $buyerLoginErr.classList.remove("hidden");
      console.log(loginRes.data);
      $buyerLoginErr.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
      $buyerPassword.value = null;
      $buyerPassword.focus();
    }
  } else {
    // id나 pw 미입력시
    $buyerLoginErr.classList.remove("hidden");
    // 입력되지 않은칸 포커싱
    if (!id) {
      $buyerLoginErr.textContent = "아이디를 입력해주세요.";
      $buyerId.value = id; // 공백 입력시 초기화
      $buyerId.focus();
    } else if (!pw) {
      $buyerLoginErr.textContent = "비밀번호를 입력해주세요.";
      $buyerPassword.focus();
    }
  }
});

// 로그인 탭 전환
function toggleTabs(isBuyer) {
  $buyerLoginTab.classList.toggle("active", isBuyer);
  $sellerLoginTab.classList.toggle("active", !isBuyer);
  $buyerLoginForm.classList.toggle("hidden", !isBuyer);
  $sellerLoginForm.classList.toggle("hidden", isBuyer);
}

$buyerLoginTab.addEventListener("click", function () {
  toggleTabs(true);
});

$sellerLoginTab.addEventListener("click", function () {
  toggleTabs(false);
});
