const url = "https://openmarket.weniv.co.kr";
const fetchHeaders = { "Content-Type": "application/json" };

const $buyerLoginForm = document.querySelector("#buyerLoginForm");
const $buyerLoginBtn = document.querySelector("#buyerLoginBtn");
const $buyerId = document.querySelector("#buyerId");
const $buyerPassword = document.querySelector("#buyerPassword");
const $buyerLoginErr = document.querySelector("#buyerLoginErr");

// 아이디 데이터 가져오기
const login = async (id, pw, type) => {
  try {
    const res = await fetch(url + "/accounts/login/", {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({
        username: id,
        password: pw,
        login_type: type,
      }),
    });
    const data = await res.json();
    return { data: data, ok: res.ok };
  } catch (err) {
    console.error(err);
  }
};

$buyerLoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = $buyerId.value.trim();
  const pw = $buyerPassword.value;
  if (id && pw) {
    const loginRes = await login(id, pw, "BUYER");
    if (loginRes.ok) {
      // 성공 (계정정보 있음)
      console.log("성공");
    } else {
      // 실패
      console.log("실패");
    }
  } else {
    // 미입력시, 경고문구 보이기
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
