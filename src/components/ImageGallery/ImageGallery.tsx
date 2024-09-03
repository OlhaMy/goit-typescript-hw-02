import ImageCard from "./ImageCard";
import { Photo, ImageGalleryProps } from "../App/App.types";
import s from "./ImageGallery.module.css";

const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  handleOpenModal,
}) => {
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
