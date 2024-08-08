import { showDialog } from "./dialog.js";

// 삭제, 변경 버튼 누르면 dialog가 열림
// 1. 버튼 누르면 dialog 요소를 만들고 보여주기
// 1-1. dialog 요소가 기존에 없으면, 새로 만들기 - 아이디 체크
// 1-2. dialog 요소가 기존에 있으면, 기존것 띄우기

const $cartList = document.querySelector(".cart-list");
// const $editDialog = document.querySelector("#editDialog");

$cartList.addEventListener("click", (e) => {
  console.log(e.target);
  // classList.contains 사용시, 버튼 내부는 이미지영역 감지하지 못함
  // const btnDel = e.target.classList.contains("btn-del");
  const clickDelBtn = e.target.closest(".btn-del");
  const clickEditBtn = e.target.closest(".btn-edit");

  // 삭제버튼 누르면 -> #deleteListDialog 팝업 띄우기
  if (clickDelBtn) {
    showDialog(
      "deleteListDialog",
      "상품을 삭제하시겠습니까?",
      undefined,
      undefined,
      () => {
        // 확인버튼 누르면 콜백 함수 작동
      }
    );
  }

  if (clickEditBtn) {
    const $counter = `
      <div class="counter">
        <button type="button" class="btn-edit">
          <img
            src="./src/assets/img/icon-minus-line.svg"
            alt="minus"
          />
        </button>
        <label for="amount00">
          <span class="sr-only">수량</span>
          <input type="number" id="amount00" class="num" />
        </label>
        <button type="button" class="btn-edit">
          <img
            src="./src/assets/img/icon-plus-line.svg"
            alt="minus"
          />
        </button>
      </div>
    `;
    showDialog("editDialog", $counter, undefined, "수정", () => {
      // 확인버튼 누르면 콜백 함수 작동
    });
  }
});
