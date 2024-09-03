import React from "react";
import Modal from "react-modal";
import { ImageModalProps } from "../App/App.types";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    width: "auto",
    height: "auto",
    maxWidth: "90vw",
    maxHeight: "90vh",
    border: "none",
  },
};

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({
  modalImg,
  modalIsOpen,
  closeModal,
}) => {
  console.log(modalImg);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <img src={modalImg.src} alt={modalImg.alt} />
    </Modal>
  );
};

export default ImageModal;
