export const counter = ($counter) => {
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
    disableCounterBtn($counter);
  });
};

export const disableCounterBtn = ($counter, max = 3) => {
  const $minusBtn = $counter.querySelector(".btn-minus");
  const $plusBtn = $counter.querySelector(".btn-plus");
  const $input = $counter.querySelector("label .num");
  console.log($input);

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
