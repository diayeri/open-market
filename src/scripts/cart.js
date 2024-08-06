// 모달 기능
const dialog = document.getElementById("checkModal");
// const showDialogBtn = document.getElementById("showDialogBtn");
const closeBtn = document.getElementById("closeBtn");

// showDialogBtn.addEventListener("click", () => {
//   dialog.showModal();
//   console.log("오르미 FE 짱짱");
// });

closeBtn.addEventListener("click", () => {
  dialog.close();
});
