import React from "react";
import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ModalComponent({modalIsOpen, setIsOpen, children, handleSubmit}) {
  function closeModal() {
    document.body.style.overflow = "scroll";
    setIsOpen(false);
  }

  const buttonClick = () => {
    if (handleSubmit) handleSubmit();
    closeModal();
  };

  if (!handleSubmit) {
    customStyles.content.width = "90%";
  }
  if (modalIsOpen) document.body.style.overflow = "hidden";

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        overlayClassName="Overlay"
      >
        {children}
        {handleSubmit ? (
          <center>
            <button
              style={{marginTop: "10px"}}
              type="submit"
              onClick={buttonClick}
              className="btn btn-success"
            >
              Post review
            </button>
          </center>
        ) : null}
      </Modal>
    </div>
  );
}

export default ModalComponent;
