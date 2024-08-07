import { fetchProductsData } from "./fetch.js";

// 상품 아이디로 상품 정보 불러오기
export const findProductInfo = (productId) => {
  const products = fetchProductsData;
  const productInfo = products.results?.find(
    (e) => e.product_id === Number(productId)
  );
  // console.log("productInfo", productInfo);
  return productInfo;
};
