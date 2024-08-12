import s from "./ImageGallery.module.css";
const ImageCard = ({ photo }) => {
  const { urls, alt_description } = photo;
  return (
    <li className={s.item}>
      <div>
        <img src={urls.small} alt={alt_description} />
      </div>
    </li>
  );
};

export default ImageCard;
