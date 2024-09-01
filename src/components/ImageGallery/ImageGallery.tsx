import ImageCard from "./ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ photos, handleOpenModal }) => {
  return (
    <ul className={s.list}>
      {photos?.map((photo) => {
        return (
          <ImageCard
            key={photo.id}
            handleOpenModal={handleOpenModal}
            {...photo}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
