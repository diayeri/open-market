import { showDialog, showEditDialog } from "../components/dialog.js";
const url = "https://openmarket.weniv.co.kr";
const fetchHeaders = { "Content-Type": "application/json" };

// 0. 완 - 장바구니 데이터 불러오기 (fetch)
// 0-1. 완 - 장바구니 데이터가 없으면, 안내문구_on, footer_off, 결제버튼_off
// 0-2. 완 - 장바구니 데이터가 있으면, 리스트_on (addListUi)
// 0-3. 완 - 장바구니 리스트 product_id로 정보 가져오기

// 1. 완 - 삭제/수정 버튼 누르면 -> dialog 요소를 만들고 보여주기 (dialog.js)
// 1-1. 완 - dialog 요소가 기존에 없으면, 새로 만들기 - 아이디 체크
// 1-2. 완 - dialog 요소가 기존에 있으면, 기존것 띄우기

// 2. 삭제/수정 팝업 입력값 적용하기
// 2-2. 수정 팝업
// 2-2-1. 완 - 수정 팝업 인풋에 기존 값 불러오기 (value)
// 2-2-2. 최대, 최소 값일 때 버튼 disabled
// 2-3. 삭제/수정 결과 데이터 전송 (fetch)
// 2-4. 삭제/수정 데이터 다시 받아오기 (fetch)

// 3. 아이템 리스트 상품금액, 할인, 배송비 합산
// 3-1. 결제할 가격 나타내기

const $cartList = document.querySelector(".cart-list");

const addListUi = (product, cart) => {
  const quantity = cart.quantity;
  const priceSum = (product.price * quantity).toLocaleString();
  product.price = product.price.toLocaleString();
  const shipping =
    product.shipping_method === "PARCEL" ? "택배배송" : "무료배송";

  const $li = `
    <li id="${cart.cart_item_id}">
      <label for="item${cart.cart_item_id}" class="wrap-checkbox">
        <span class="sr-only">선택</span>
        <input type="checkbox" name="item" id="item${cart.cart_item_id}" />
      </label>
      <img
        src="${product.image}"
        alt="img"
        class="thumb"
      />
      <div class="wrap-text">
        <p class="subt">${product.store_name}</p>
        <h3 class="title">${product.product_name}</h3>
        <p class="price">${product.price}원</p>
        <p class="info">${shipping}</p>
      </div>
      <div class="w-1/4 text-center ml-auto">
        <div class="counter">
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

// 장바구니 상품 정보 불러오기
const loadProductInfo = async (productId) => {
  const res = await fetch(url + "/products/");
  const products = await res.json();

  let productInfo = products.results?.find((e) => e.product_id === productId);
  // console.log(productInfo);
  return productInfo;
};

// 장바구니 불러오기
const loadCart = async () => {
  const token = localStorage.getItem("login-token");
  const res = await fetch(url + "/cart/", {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  const cartLists = await res.json();
  // console.log(cartLists.results);

  if (cartLists.results.length === 0) {
    cartState(0);
    return;
  } else {
    cartState(1);

    cartLists.results.forEach(async (cart) => {
      const product = await loadProductInfo(cart.product_id);
      // console.log(product, cart);
      addListUi(product, cart);
    });
  }
};
loadCart();

// 리스트 삭제, 수정
$cartList.addEventListener("click", (e) => {
  // console.log(e.target);
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
    const $li = e.target.closest("li");
    // console.log($li);
    showEditDialog($li);
  }
});
