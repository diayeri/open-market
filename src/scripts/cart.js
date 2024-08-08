import { showDialog } from "./dialog.js";
const url = "https://openmarket.weniv.co.kr";
const fetchHeaders = { "Content-Type": "application/json" };

// 0. 장바구니 데이터 불러오기 (fetch)
// 0-1. 완료 - 장바구니 데이터가 없으면, 안내문구_on, footer_off, 결제버튼_off
// 0-2. 완료 - 장바구니 데이터가 있으면, 리스트_on (addListUi)
// 0-3. 완료 - 장바구니 리스트 product_id로 정보 가져오기

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

const addListUi = (product, cartId, quantity) => {
  const priceSum = (product.price * quantity).toLocaleString();
  product.price = product.price.toLocaleString();
  const shipping =
    product.shipping_method === "PARCEL" ? "택배배송" : "무료배송";

  // const data = {
  //   product_id: 455,
  //   created_at: "2024-06-25T01:58:13.039260",
  //   updated_at: "2024-06-26T22:54:22.350531",
  //   product_name: "yonex 테니스 라켓",
  //   image:
  //     "https://openmarket.weniv.co.kr/media/products/2024/06/25/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.00.39_wWpDrY7.png",
  //   price: 240000,
  //   shipping_method: "PARCEL",
  //   shipping_fee: 3000,
  //   stock: 100,
  //   product_info: "yonex 테니스 라켓 🩵",
  //   seller: 312,
  //   store_name: "return tennis shop",
  // };

  const $li = `
    <li>
      <label for="item${cartId}" class="wrap-checkbox">
        <span class="sr-only">선택</span>
        <input type="checkbox" name="item" id="item${cartId}" />
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

// 장바구니 아이템의 정보 불러오기
const loadProductInfo = async (productId, cartId, quantity) => {
  const res = await fetch(url + "/products/");
  const products = await res.json();

  if (products.results.length === 0) {
    cartState(0);
  } else {
    cartState(1);
    products.results.forEach((e) => {
      if (e.product_id === productId) {
        console.log(e);
        addListUi(e, cartId, quantity);
      }
    });
  }
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
  console.log(cartLists.results);

  // const data = {
  //   my_cart: 3,
  //   cart_item_id: 2759,
  //   product_id: 455,
  //   quantity: 3,
  //   is_active: true,
  // };

  cartLists.results?.forEach((e) => {
    // console.log(e.product_id);
    loadProductInfo(e.product_id, e.cart_item_id, e.quantity);
  });
};
loadCart();

// 리스트 삭제, 수정
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
