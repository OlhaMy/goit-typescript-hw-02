import { LoadMoreBtnProps } from "../App/App.types";

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className="s.loadMore" type="button" onClick={onClick}>
      Load More
    </button>
  );
};
export default LoadMoreBtn;
