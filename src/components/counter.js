export const counter = ($counter) => {
  $counter.addEventListener("click", (e) => {
    const $minusBtn = e.target.closest(".btn-minus");
    const $plusBtn = e.target.closest(".btn-plus");
    const $input = e.target.closest(".counter").querySelector("label .num");
    let value = $input.value;
    // console.log(value);
    if ($minusBtn) {
      console.log("빼기");
      return $input.value--;
    } else if ($plusBtn) {
      console.log("더하기");
      return $input.value++;
    }
  });
};
