const url = "https://openmarket.weniv.co.kr";
const fetchHeaders = { "Content-Type": "application/json" };

export const getToken = () => localStorage.getItem("login-token");
export const setToken = (token) => localStorage.setItem("login-token", token);

export const fetchProducts = async () => {
  try {
    const res = await fetch(url + "/products/");
    if (!res.ok) {
      throw new Error("fetch 실패: product data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const fetchProductsData = await fetchProducts();
// productData = {
//     "product_id": 451,
//     "created_at": "2024-06-25T01:53:55.798528",
//     "updated_at": "2024-06-25T01:53:55.798559",
//     "product_name": "Head 번 라켓",
//     "image": "https://openmarket.weniv.co.kr/media/products/2024/06/25/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.03.25_BuNMbWx.png",
//     "price": "200,000",
//     "shipping_method": "PARCEL",
//     "shipping_fee": 2000,
//     "stock": 50,
//     "product_info": "🍊번 라켓 \r\n- 260g, 270g, 280g,300g",
//     "seller": 312,
//     "store_name": "return tennis shop"
// }

export const fetchLogin = async (id, pw, type) => {
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
    if (!res.ok) {
      throw new Error("fetch 실패: login data");
    }
    const data = await res.json();
    return { data: data, ok: res.ok };
  } catch (err) {
    console.error(err);
  }
};

export const fetchCart = async () => {
  const token = getToken();
  try {
    const res = await fetch(url + "/cart/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fetch 실패: cart data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
// cartData = {
//     "my_cart": 5,
//     "cart_item_id": 2750,
//     "product_id": 451,
//     "quantity": 2,
//     "is_active": true
// }

export const fetchPutCart = async (cartItemId, productId, newValue) => {
  const token = getToken();
  try {
    const res = await fetch(url + "/cart/" + cartItemId + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: {
        product_id: productId,
        quantity: newValue,
      },
    });
    if (!res.ok) {
      throw new Error("fetch 실패: cart data 수정");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchDeleteCart = async (cartItemId, productId) => {};
