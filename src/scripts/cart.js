import { showDialog } from "./dialog.js";

// 0. 장바구니 데이터 불러오기 (fetch)
// 0-1. 장바구니 데이터가 없으면, 안내문구_on, footer_off, 결제버튼_off
// 0-2. 장바구니 데이터가 있으면, 리스트_on (addListUi)

// 1. 삭제/수정 버튼 누르면 -> dialog 요소를 만들고 보여주기 (dialog.js)
// 1-1. dialog 요소가 기존에 없으면, 새로 만들기 - 아이디 체크
// 1-2. dialog 요소가 기존에 있으면, 기존것 띄우기

// 2. 삭제/수정 팝업 입력값 적용하기
// 2-1. 삭제 팝업
// 2-2. 수정 팝업
// 2-2-1. 수정 팝업 인풋에 기존 값 불러오기 (value)
// 2-2-2. 최대, 최소 값일 때 버튼 disabled
// 2-3. 삭제/수정 결과 데이터 전송 (fetch)
// 2-4. 삭제/수정 데이터 다시 받아오기 (fetch)

// 3. 아이템 리스트 상품금액, 할인, 배송비 합산
// 3-1. 결제할 가격 나타내기

const $cartList = document.querySelector(".cart-list");

const addListUi = () => {
  const $li = `
    <li>
      <label for="item00" class="wrap-checkbox">
        <span class="sr-only">선택</span>
        <input type="checkbox" name="item" id="item00" />
      </label>
      <img
        src="https://blog-ko.engram.us/content/images/size/w760h400/2024/03/------16.png"
        alt="img"
        class="thumb"
      />
      <div class="wrap-text">
        <p class="subt">우당탕탕 라이캣의 실험실</p>
        <h3 class="title">우당탕탕 라이캣의 실험실</h3>
        <p class="price">17,500원</p>
        <p class="info">택배배송 / 무료배송</p>
      </div>
      <div class="w-1/4 text-center ml-auto">
        <div class="counter">
          <button type="button" class="btn-edit">
            <img
              src="./src/assets/img/icon-minus-line.svg"
              alt="minus"
            />
          </button>
          <!-- <label for="amount00">
            <span class="sr-only">수량</span>
            <input type="number" id="amount00" />
          </label> -->
          <div class="num"></div>
          <button type="button" class="btn-edit">
            <img
              src="./src/assets/img/icon-plus-line.svg"
              alt="minus"
            />
          </button>
        </div>
      </div>
      <div class="price-total w-1/4 text-center">
        <p>18,600원</p>
        <button type="button" class="btn btn-sm btn-primary">
          주문하기
        </button>
      </div>
      <button type="button" class="btn-del">
        <img src="./src/assets/img/icon-delete.svg" alt="삭제" />
      </button>
    </li>  
  `;
  $cartList.insertAdjacentHTML("beforeend", $li);
};

$cartList.addEventListener("click", (e) => {
  console.log(e.target);
  const clickDelBtn = e.target.closest(".btn-del");
  const clickEditBtn = e.target.closest(".btn-edit");

  // 리스트 삭제버튼 누르면
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

  // 리스트 수정버튼 누르면
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
