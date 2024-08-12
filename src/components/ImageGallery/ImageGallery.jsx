import ImageCard from "./ImageCard";

const ImageGallery = ({ photos }) => {
  return (
    <ul>
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};

export default ImageGallery;
