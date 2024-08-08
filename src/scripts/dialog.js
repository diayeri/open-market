export const showDialog = (
  id,
  content,
  defalutBtn = "취소",
  activeBtn = "확인"
) => {
  if (!document.getElementById(id)) {
    const $dialogWrapper = document.querySelector("#dialogWrapper");
    const $dialog = `
    <dialog id="${id}">
      <button type="button" class="btn-del btn-close" onclick="close()">
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
  }
  document.getElementById(id).showModal();
};

// 팝업 내 닫기 버튼
// document.querySelector("dialog")?.addEventListener("click", (e) => {
//   console.log("hey");
//   const clickCloseBtn = e.target.closest(".btn-close");
//   if (clickCloseBtn) {
//     // e.target.closest("dialog").close();
//   }
// });
