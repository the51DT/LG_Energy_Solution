const dim = document.querySelector(".mgm-dim");
const popup = document.querySelector(".mgm-popup");
const participationPopup = document.querySelector("#participationPopup");
const popupButton = document.querySelector(
    ".mgm-share-button.mgm-share-button--icon"
);
const body = document.querySelector("body");
const bottomSheetOpenBtn = document.querySelector(
    "#participationPopup .mgm-popup__button"
);
const bottomSheet = document.querySelector(".mgm-bottom-sheet");
const bottomSheetClose = document.querySelector(".mgm-bottom-sheet__close");

const closePopup = () => {
    popup.classList.remove("active");
    participationPopup.classList.remove("active");
    dim.classList.remove("active");
    body.style.overflow = "initial";
    bottomSheet.classList.remove("active");
};
const openPopup = () => {
    popupButton.addEventListener("click", () => {
        popup.classList.add("active");
        participationPopup.classList.add("active");
        dim.classList.add("active");
        body.style.overflow = "hidden";
    });
};
const dimClosePopup = () => {
    dim.addEventListener("click", closePopup);
};
const shareBottomSheet = () => {
    bottomSheetOpenBtn.addEventListener("click", () => {
        bottomSheet.classList.add("active");
        participationPopup.classList.remove("active");
    });
};
const shareBottomSheetClose = () => {
    bottomSheetClose.addEventListener("click", closePopup);
};

openPopup();
dimClosePopup();
shareBottomSheet();
shareBottomSheetClose();
