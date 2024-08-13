import s from "./ImageGallery.module.css";
const ImageCard = ({ photo, handleOpenModal }) => {
  const { urls, alt_description } = photo;
  return (
    <li className={s.item}>
      <div className={s.imgBox}>
        <img
          onClick={() =>
            handleOpenModal({ src: urls.regular, alt: alt_description })
          }
          src={urls.small}
          alt={alt_description}
        />
      </div>
    </li>
  );
};

export default ImageCard;
