const url = "https://openmarket.weniv.co.kr";
const fetchHeaders = { "Content-Type": "application/json" };

// 상품목록 UI
const addListUi = (e) => {
  e.price = e.price.toLocaleString();

  const $ul = document.querySelector(".product-list");
  const $li = `
    <li>
      <a href="/product${e.product_id}">
        <img
          src="${e.image}"
          alt="${e.product_name}"
        />
        <div class="wrap-text">
          <p class="subt">${e.store_name}</p>
          <h3 class="title">${e.product_name}</h3>
          <div class="price">
            <p>${e.price}</p>
            <span>원</span>
          </div>
        </div>
      </a>
    </li>
  `;
  $ul.insertAdjacentHTML("beforeend", $li);
};

// 상품목록 불러오기
const loadProducts = async () => {
  const res = await fetch(url + "/products");
  const products = await res.json();

  products.results.forEach((e) => {
    addListUi(e);
  });
};
loadProducts();
