const MODAL_ID = "modal";
const MODAL_CONTENT_ID = "modal-content";

export const handleModalState = () => {
  const modal = document.getElementById(MODAL_ID);
  const modalContent = document.getElementById(MODAL_CONTENT_ID);

  const openModal = ({ content }) => {
    modal.classList.remove("hidden");
    modalContent.innerHTML = content;
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modalContent.innerHTML = "";
  };

  return {
    openModal,
    closeModal,
  };
};
