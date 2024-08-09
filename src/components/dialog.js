import { findProductInfo } from "../scripts/product.js";
import { counter } from "../components/counter.js";

const addDialogUi = (
  id,
  content,
  defalutBtn = "취소",
  activeBtn = "확인",
  onActiveBtnClick = () => {}
) => {
  // 최초 1번만 생성
  if (!document.getElementById(id)) {
    const $dialogWrapper = document.querySelector("#dialogWrapper");
    const $dialog = `
    <dialog id="${id}">
      <p class="mt-[60px]">${content}</p>
      <div class="wrap-btn">
        <button type="button" class="btn btn-sm btn-close">${defalutBtn}</button>
        <button type="button" class="btn btn-sm btn-primary">${activeBtn}</button>
      </div>
      <button type="button" class="btn-del btn-close">
        <img src="./src/assets/img/icon-delete.svg" alt="삭제" />
      </button>
    </dialog>
  `;
    $dialogWrapper.insertAdjacentHTML("beforeend", $dialog);

    // 팝업 내 닫기 버튼 기능
    $dialogWrapper.addEventListener("click", (e) => {
      if (e.target.closest(".btn-close")) {
        e.target.closest("dialog").close();
      } else if (e.target.closest(".btn-primary")) {
        onActiveBtnClick(); // 확인 버튼 클릭시 콜백 호출
        e.target.closest("dialog").close();
      }
    });
  }
};

const addEditDialogUi = (
  dialogId,
  productId,
  value,
  maxValue,
  onActiveBtnClick = () => {}
) => {
  const $editDialog = document.getElementById(dialogId);
  if (!$editDialog) {
    // 최초로 누를 때 - 수정팝업 생성하기
    const $counterUi = `
    <div class="counter" id="counter${productId}">
      <button type="button" class="btn-edit btn-minus">
        <img
          src="./src/assets/img/icon-minus-line.svg"
          alt="minus"
        />
      </button>
      <label for="amount00">
        <span class="sr-only">수량</span>
        <input type="number" id="amount00" class="num" value="${value}" />
      </label>
      <button type="button" class="btn-edit btn-plus">
        <img
          src="./src/assets/img/icon-plus-line.svg"
          alt="minus"
        />
      </button>
    </div>
  `;
    addDialogUi(dialogId, $counterUi, undefined, "수정", () => {
      onActiveBtnClick();
    });
    const $counter = document.getElementById(`counter${productId}`);
    counter($counter, maxValue);
  } else {
    // 수정팝업 이미 있을때 - 내용만 바꾸기
    $editDialog.querySelector(".num").value = value;
  }
};

export const showDeleteDialog = (li) => {
  const productId = li.querySelector(".link-product").id;
  const id = "deleteDialog";

  addDialogUi(id, "상품을 삭제하시겠습니까?", undefined, undefined, () => {
    // 확인 버튼 -> 장바구니 데이터 삭제 -> 받아오기
  });
  document.getElementById(id).showModal();
};

export const showEditDialog = async (li) => {
  const productId = li.querySelector(".link-product").id;
  const id = "editDialog";
  const value = li.querySelector(".num").innerText;

  const productInfo = await findProductInfo(productId);
  // console.log(productInfo);
  const maxValue = productInfo.stock;
  // console.log(value);
  addEditDialogUi(id, productId, value, maxValue, () => {
    // 수정 버튼 -> 장바구니 데이터 변경 -> 받아오기
  });
  document.getElementById(id).showModal();
};
