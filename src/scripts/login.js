// - 경고문구: 입력하지 않은채 누를때
const $buyerLoginForm = document.querySelector("#buyerLoginForm");
const $buyerLoginBtn = document.querySelector("#buyerLoginBtn");
const $buyerId = document.querySelector("#buyerId");
const $buyerPassword = document.querySelector("#buyerPassword");
const $buyerLoginErr = document.querySelector("#buyerLoginErr");

$buyerLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if ($buyerId.value.trim() && $buyerPassword.value) {
    // 로그인 데이터 비교
    // 불일치시, 경고문구 보이기
    // 비밀번호 입력창 포커싱, 값 초기화
  } else {
    // 미입력시, 경고문구 보이기
    $buyerLoginErr.classList.remove("hidden");
    // 입력되지 않은칸 포커싱
    if (!$buyerId.value.trim()) {
      $buyerLoginErr.textContent = "아이디를 입력해주세요.";
      $buyerId.value = $buyerId.value.trim(); // 공백 입력시 초기화
      $buyerId.focus();
    } else if (!$buyerPassword.value) {
      $buyerLoginErr.textContent = "비밀번호를 입력해주세요.";
      $buyerPassword.focus();
    }
  }
});
