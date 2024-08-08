export const showDialog = (
  id,
  content,
  defalutBtn = "취소",
  activeBtn = "확인",
  onActiveBtnClick = () => {}
) => {
  if (!document.getElementById(id)) {
    const $dialogWrapper = document.querySelector("#dialogWrapper");
    const $dialog = `
    <dialog id="${id}">
      <button type="button" class="btn-del btn-close">
        <img src="./src/assets/img/icon-delete.svg" alt="삭제" />
      </button>
      <p class="mt-[60px]">${content}</p>
      <div class="wrap-btn">
        <button type="button" class="btn btn-sm btn-close">${defalutBtn}</button>
        <button type="button" class="btn btn-sm btn-primary">${activeBtn}</button>
      </div>
    </dialog>
  `;
    $dialogWrapper.insertAdjacentHTML("beforeend", $dialog);

    // 팝업 내 닫기 버튼 기능
    $dialogWrapper.addEventListener("click", (e) => {
      if (e.target.closest(".btn-close")) {
        e.target.closest("dialog").close();
      } else if (e.target.closest(".btn-primary")) {
        onActiveBtnClick(); // 확인 버튼 클릭시 콜백 호출
        e.target.closest("dialog").close();
      }
    });
  }
  document.getElementById(id).showModal();
};

export const showEditDialog = (li) => {
  const id = li.id;
  const value = li.querySelector(".num").innerText;
  const $counter = `
    <div class="counter">
      <button type="button" class="btn-edit">
        <img
          src="./src/assets/img/icon-minus-line.svg"
          alt="minus"
        />
      </button>
      <label for="amount00">
        <span class="sr-only">수량</span>
        <input type="number" id="amount00" class="num" value="${value}" />
      </label>
      <button type="button" class="btn-edit">
        <img
          src="./src/assets/img/icon-plus-line.svg"
          alt="minus"
        />
      </button>
    </div>
  `;
  showDialog(`editDialog${id}`, $counter, undefined, "수정", () => {
    // 확인버튼 누르면 콜백 함수 작동
  });
};
