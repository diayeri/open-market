const url = "https://openmarket.weniv.co.kr";
const fetchHeaders = { "Content-Type": "application/json" };

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

export const fetchCart = async (token) => {
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
