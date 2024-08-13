import ImageCard from "./ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ photos, handleOpenModal }) => {
  return (
    <ul className={s.list}>
      {photos.map((photo) => (
        <ImageCard
          key={photo.id}
          photo={photo}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
