// ImageCard.jsx
const ImageCard = ({ photo }) => {
  const { urls, alt_description } = photo;
  return (
    <li>
      <div>
        <img src={urls.small} alt={alt_description} />
      </div>
    </li>
  );
};

export default ImageCard;
