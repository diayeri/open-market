import { fetchProducts } from "./fetch.js";

// 상품 아이디로 상품 정보 불러오기
export const findProductInfo = async (productId) => {
  const products = await fetchProducts();
  const productInfo = products.results?.find((e) => e.product_id === productId);
  console.log("productInfo", productInfo);
  return productInfo;
};
