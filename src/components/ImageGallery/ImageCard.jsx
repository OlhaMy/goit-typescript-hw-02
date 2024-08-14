import s from "./ImageGallery.module.css";

const ImageCard = ({ alt_description, urls, handleOpenModal }) => {
  return (
    <li
      className={s.item}
      onClick={() =>
        handleOpenModal({ src: urls.regular, alt: alt_description })
      }
    >
      <div className={s.imgBox}>
        <img src={urls.small} alt={alt_description} />
      </div>
    </li>
  );
};

export default ImageCard;
