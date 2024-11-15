import { fetchProductsData } from "./fetch.js";

// 상품목록 UI
const addListUi = (e) => {
  e.price = e.price.toLocaleString();

  const $ul = document.querySelector(".product-list");
  const $li = `
    <li>
      <a href="/product${e.id}">
        <img
          src="${e.image}"
          alt="${e.name}"
        />
        <div class="wrap-text">
          <p class="subt">${e.seller.name}</p>
          <h3 class="title">${e.name}</h3>
          <div class="price">
            <p>${e.price}</p>
            <span>원</span>
          </div>
        </div>
      </a>
    </li>
  `;
  $ul?.insertAdjacentHTML("beforeend", $li);
};

// 상품목록 불러오기
const loadProducts = () => {
  const products = fetchProductsData;

  products.results.forEach((e) => {
    addListUi(e);
  });
};
loadProducts();
