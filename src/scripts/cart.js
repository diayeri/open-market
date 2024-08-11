import { fetchCart, getToken } from "./fetch.js";
import { findProductInfo } from "../scripts/product.js";
import { showDeleteDialog, showEditDialog } from "../components/dialog.js";

// 0. V 장바구니 데이터 불러오기 (fetch)
// 0-1. V 장바구니 데이터가 없으면, 안내문구_on, footer_off, 결제버튼_off
// 0-2. V 장바구니 데이터가 있으면, 리스트_on (addListUi)
// 0-3. V 장바구니 리스트 product_id로 정보 가져오기

// 1. V 삭제/수정 버튼 누르면 -> dialog 요소를 만들고 보여주기 (dialog.js)
// 1-1. V dialog 요소가 기존에 없으면, 새로 만들기 - 아이디 체크
// 1-2. V dialog 요소가 기존에 있으면, 기존것 띄우기

// 2. 삭제/수정 팝업 입력값 적용하기
// 2-1. V 삭제 팝업
// 2-2. V 수정 팝업
// 2-2-1. V 수정 팝업 인풋에 기존 값 불러오기 (value)
// 2-2-2. V 카운터 기능
// 2-2-3. V 최대, 최소 값일 때 버튼 disabled
// 2-2-3-1. V 최대값 불러오기
// 2-3. V 삭제/수정 결과 데이터 전송 (fetch)
// 2-4. V 삭제/수정 데이터 다시 받아오기 (fetch) -> 새로고침

// 3. 아이템 리스트 상품금액, 할인, 배송비 합산
// 3-1. 결제할 가격 나타내기

// 4. 리팩토링
// 4-1. V 상품 정보 불러오는 기존 함수 재활용 가능할지

const $cartList = document.querySelector(".cart-list");

const addListUi = (product, cart) => {
  const quantity = cart.quantity;
  const priceSum = (product.price * quantity).toLocaleString();
  // console.log(product.price, quantity);
  const shipping =
    product.shipping_method === "PARCEL" ? "택배배송" : "무료배송";
  // console.log(product, cart);

  const productLink = "#";

  const $li = `
    <li id="${cart.cart_item_id}" data-cart="${
    cart.cart_item_id
  }" data-product="${product.product_id}">
      <label for="item${cart.cart_item_id}" class="wrap-checkbox">
        <span class="sr-only">선택</span>
        <input type="checkbox" name="item" id="item${cart.cart_item_id}" />
      </label>
      <a href="${productLink}" class="link-product" id="${product.product_id}">
        <img
          src="${product.image}"
          alt="img"
          class="thumb"
        />
        <div class="wrap-text">
          <p class="subt">${product.store_name}</p>
          <h3 class="title">${product.product_name}</h3>
          <p class="price">${product.price.toLocaleString()}원</p>
          <p class="info">${shipping}</p>
        </div>
      </a>
      <div class="w-1/4 text-center ml-auto">
        <div class="counter" data-max="${product.stock}">
          <button type="button" class="btn-edit">
            <img
              src="./src/assets/img/icon-minus-line.svg"
              alt="minus"
            />
          </button>
          <div class="num">${quantity}</div>
          <button type="button" class="btn-edit">
            <img
              src="./src/assets/img/icon-plus-line.svg"
              alt="minus"
            />
          </button>
        </div>
      </div>
      <div class="price-total w-1/4 text-center">
        <p>${priceSum}원</p>
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

// 장바구니 상태에 따른 UI
const cartState = (state) => {
  if (state) {
    const $emptyOff = document.querySelectorAll(".empty-off");
    $emptyOff.forEach((i) => i.classList.remove("!hidden"));
  } else {
    const $emptyOn = document.querySelector(".empty-on");
    $emptyOn.classList.remove("!hidden");
  }
};

// 장바구니 초기화
const clearCart = () => {
  const $cartList = document.querySelector(".cart-list");
  $cartList.replaceChildren();
};

// 장바구니 불러오기
export const loadCart = async () => {
  clearCart();
  if (getToken()) {
    const cartLists = await fetchCart();
    // console.log(cartLists);

    if (cartLists.results.length === 0) {
      cartState(0);
      return;
    } else {
      cartState(1);

      const productsList = await Promise.all(
        cartLists.results.map(async (cart) => {
          const product = await findProductInfo(cart.product_id);
          // console.log(product, cart);
          if (product) {
            addListUi(product, cart);
            return product;
          }
        })
      );
      cartAddUp(productsList);
    }
  } else {
    const logoutText = document.querySelector(".cart-logout");
    logoutText.classList.remove("!hidden");
  }
};
loadCart();

// 리스트 삭제, 수정
$cartList.addEventListener("click", (e) => {
  // console.log(e.target);
  const clickDelBtn = e.target.closest(".btn-del");
  const clickEditBtn = e.target.closest(".btn-edit");
  const $li = e.target.closest("li");

  // 리스트 삭제버튼 누르면
  if (clickDelBtn) {
    showDeleteDialog($li);
  }

  // 리스트 수정버튼 누르면
  if (clickEditBtn) {
    // console.log($li);
    showEditDialog($li);
  }
});

const addUp = (arr, key) => {
  return arr.reduce((a, c) => a + c[key], 0);
};

// 합산 테이블 (하단)
const cartAddUp = async (productsListAll) => {
  const $tfooter = document.querySelector(".cart-table .tfooter");
  const totalPrice = $tfooter.querySelector("#totalPrice");
  const totalDiscount = $tfooter.querySelector("#totalDiscount");
  const deliveryFee = $tfooter.querySelector("#deliveryFee");
  const totalPayment = $tfooter.querySelector("#totalPayment");

  const productsList = productsListAll.filter(
    (i) => i !== null && i !== undefined
  );
  // console.log(productsList);

  totalPrice.innerText = addUp(productsList, "price").toLocaleString();
  deliveryFee.innerText = addUp(productsList, "shipping_fee").toLocaleString();
  totalPayment.innerText = (
    Number(totalPrice.innerText.replace(/,/g, "")) +
    Number(deliveryFee.innerText.replace(/,/g, ""))
  ).toLocaleString();
};
