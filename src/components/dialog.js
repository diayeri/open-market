import {
  fetchCart,
  fetchPutCart,
  fetchDeleteCart,
  getToken,
} from "../scripts/fetch.js";
import { counter, counterFunc } from "../components/counter.js";
import { findProductInfo } from "../scripts/product.js";
// import { loadCart } from "../scripts/cart.js";

const $dialogWrapper = document.querySelector("#dialogWrapper");

const addDialogUi = (
  dialogId,
  dialogClass,
  cartItemId,
  productId,
  content,
  defalutBtn = "취소",
  activeBtn = "확인",
  onActiveBtnClick = () => {}
) => {
  // 최초 1번만 생성
  if (!document.getElementById(dialogId)) {
    const $dialog = `
    <dialog id="${dialogId}" class="${dialogClass}" data-product="${productId}" data-cart="${cartItemId}">
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

    dialogBtnFunc(onActiveBtnClick);
  }
};

// 팝업 내 버튼 기능
const dialogBtnFunc = (onActiveBtnClick = () => {}) => {
  $dialogWrapper.addEventListener("click", (e) => {
    if (e.target.closest(".btn-close")) {
      e.target.closest("dialog").close();
    } else if (e.target.closest(".btn-primary")) {
      onActiveBtnClick(); // 확인 버튼 클릭시 콜백 호출
      e.target.closest("dialog").close();
    }
  });
};

const addEditDialogUi = (cartItemId, productId, value, max) => {
  const dialogId = `editDialog${cartItemId}`;
  const $editDialog = document.getElementById(dialogId);

  if (!$editDialog) {
    // 최초로 누를 때 - 수정팝업 생성하기
    const $counterUi = `
    <div class="counter" id="counter${productId}" data-max="${max}">
      <button type="button" class="btn-edit btn-minus">
        <img
          src="./src/assets/img/icon-minus-line.svg"
          alt="minus"
        />
      </button>
      <label for="counterInput">
        <span class="sr-only">수량</span>
        <input type="number" id="counterInput" class="num" value="${value}" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" />
      </label>
      <button type="button" class="btn-edit btn-plus">
        <img
          src="./src/assets/img/icon-plus-line.svg"
          alt="minus"
        />
      </button>
    </div>
  `;
    // 팝업 UI 생성
    addDialogUi(
      dialogId,
      "dialog-edit",
      cartItemId,
      productId,
      $counterUi,
      undefined,
      "수정"
    );

    const $counter = document.getElementById(`counter${productId}`);
    counter($counter, () => editCartItem(value));
  } else {
    // 수정팝업 이미 있을때
    // value값 다시 가져오기
    $editDialog.querySelector(".num").value = value;

    let $counter = document.getElementById(`counter${productId}`);
    // console.log(productId, $counter);
    // // 다시 열었을 때 버튼 UI 초기화
    counterFunc($counter);
  }
};

const editCartItem = (oldValue) => {
  // 수정 버튼 누르면 작동됨
  // 1. 기존값, 변경값 불러오기
  // 2. 값의 변동이 있으면 장바구니 데이터 변경 요청
  // 3. 카트 리스트 다시 받아오기
  const $editDialog = document.querySelector(".dialog-edit");
  $editDialog.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-primary")) {
      const newValue = e.currentTarget.querySelector(".num").value;
      const cartItemId = e.currentTarget.dataset.cart;
      const productId = e.currentTarget.dataset.product;
      // console.log(oldValue, newValue);
      // console.log(cartItemId, productId, newValue);
      if (oldValue !== newValue) {
        await fetchPutCart(cartItemId, productId, newValue);
        // loadCart();
      }
      // console.log(data);
    }
  });
};

export const showDeleteDialog = (li) => {
  const productId = li.dataset.product;
  const cartItemId = li.dataset.cart;
  const id = "deleteDialog";

  addDialogUi(
    id,
    "dialog-del",
    cartItemId,
    productId,
    "상품을 삭제하시겠습니까?",
    undefined,
    undefined,
    () => {
      // 확인 버튼 -> 장바구니 데이터 삭제 -> 받아오기
    }
  );
  document.getElementById(id).showModal();
};

export const showEditDialog = async (li) => {
  const cartItemId = li.id;
  const productId = li.querySelector(".link-product").id;
  const value = li.querySelector(".num").innerText;
  const max = li.querySelector(".counter").dataset.max;
  // console.log(productInfo);
  // console.log(value);

  addEditDialogUi(cartItemId, productId, value, max);
  document.getElementById(`editDialog${cartItemId}`).showModal();
};
