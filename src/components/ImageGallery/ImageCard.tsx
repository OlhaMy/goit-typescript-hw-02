import { ImageCardProps } from "../App/App.types";
import s from "./ImageGallery.module.css";

const ImageCard: React.FC<ImageCardProps> = ({
  alt_description,
  urls,
  handleOpenModal,
}) => {
  return (
    <li
      className={s.item}
      onClick={() =>
        handleOpenModal({ src: urls.regular, alt: alt_description })
      }
    >
      <img src={urls.small} alt={alt_description} />
    </li>
  );
};

export default ImageCard;
