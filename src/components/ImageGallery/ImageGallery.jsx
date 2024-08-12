import ImageCard from "./ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ photos }) => {
  return (
    <ul className={s.list}>
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};

export default ImageGallery;
