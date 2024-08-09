// 카운터 기능
// 1. V 버튼을 누르면 숫자가 변한다
// 2. 최대, 최소값에 도달하면 버튼이 막힌다
// 2-1. 최대값 가져오기 (상품정보)
// 3. 최초로 팝업 만들 때, 카운터 기능추가하기

export const counter = ($counter, max) => {
  // console.log($counter);
  if ($counter) {
    disableCounterBtn($counter, max);
    $counter.addEventListener("click", (e) => {
      const $minusBtn = e.target.closest(".btn-minus");
      const $plusBtn = e.target.closest(".btn-plus");
      const $input = e.target.closest(".counter").querySelector("label .num");
      // console.log($input.value);
      if ($minusBtn) {
        // console.log("빼기");
        $input.value--;
      } else if ($plusBtn) {
        // console.log("더하기");
        $input.value++;
      }
      disableCounterBtn($counter, max);
    });
  }
};

const disableCounterBtn = ($counter, max) => {
  const $minusBtn = $counter.querySelector(".btn-minus");
  const $plusBtn = $counter.querySelector(".btn-plus");
  const $input = $counter.querySelector("label .num");
  // console.log($input);

  // 최소값 1, 최대값 max
  if ($input.value <= 1) {
    $minusBtn.disabled = true;
    $plusBtn.disabled = false;
  } else if ($input.value >= max) {
    $plusBtn.disabled = true;
    $minusBtn.disabled = false;
  } else {
    $minusBtn.disabled = false;
  }
};
