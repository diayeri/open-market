// 카운터 기능
// 1. V 버튼을 누르면 숫자가 변한다
// 2. V 최대, 최소값에 도달하면 버튼이 막힌다
// 2-1. V 최대값 가져오기 (상품정보)
// 3. V 최초로 팝업 만들 때, 카운터 기능추가하기
// V FIX: 팝업 다시 열릴 때, 이전 버튼 disabled 가 유지되는 오류

export const counter = ($counter) => {
  // console.log($counter);
  if ($counter) {
    counterFunc($counter);
    const $input = $counter.querySelector("input.num");
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
      counterFunc($counter);
    });

    $input.addEventListener("input", (e) => {
      // console.log("인풋이벤트", e.target.value);
      counterFunc($counter);
    });
  }
};

const setCounterBtnsState = ($minusBtn, $plusBtn, value, max) => {
  $minusBtn.disabled = value <= 1;
  $plusBtn.disabled = value >= max;
};

const setCounterLimits = ($input, min, max) => {
  const value = $input.value;
  if (value < min) {
    alert(`${min} 이상의 숫자를 입력하세요`);
    $input.value = min;
  } else if (value > max) {
    alert(`재고 수량을 초과하였습니다 (재고: ${max}개)`);
    $input.value = max;
  }
};

export const counterFunc = ($counter) => {
  const $minusBtn = $counter.querySelector(".btn-minus");
  const $plusBtn = $counter.querySelector(".btn-plus");
  const $input = $counter.querySelector("label .num");
  const max = Number($counter.dataset.max);

  setCounterBtnsState($minusBtn, $plusBtn, $input.value, max);
  setCounterLimits($input, 1, max);
};
