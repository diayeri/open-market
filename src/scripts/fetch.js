const url = "https://openmarket.weniv.co.kr";
const fetchHeaders = { "Content-Type": "application/json" };

export const fetchProducts = async () => {
  const res = await fetch(url + "/products/");
  const products = await res.json();
  return products;
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
    const data = await res.json();
    return { data: data, ok: res.ok };
  } catch (err) {
    console.error(err);
  }
};
