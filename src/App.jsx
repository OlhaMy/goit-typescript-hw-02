import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchPhotos } from "./services/unsplashAPI";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImg, setModalImg] = useState({});

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchPhotos(query, page);
        if (!res.photos.length) {
          setIsEmpty(true);
          toast.error("Nothing found, please enter a valid query!");
          return;
        }
        setPhotos((prev) => [...prev, ...res]);

        setShowLoadMore(page < Math.ceil(res.total_pages / res.per_page));
      } catch (error) {
        setIsError(true);
        toast.error("Something went wrong, try again later!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const handleSubmit = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
    setPhotos([]);
    setShowLoadMore(false);
    setIsError(false);
    setIsEmpty(false);
    setOpenModal(false);
    setModalImg({});
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  const handleOpenModal = ({ src, alt }) => {
    setOpenModal(true);
    setModalImg({ url: src, alt });
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalImg({});
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isEmpty && <Toaster />}

      {photos.length > 0 && (
        <ImageGallery photos={photos} handleOpenModal={handleOpenModal} />
      )}
      {openModal && (
        <ImageModal
          modalIsOpen={openModal}
          closeModal={closeModal}
          url={modalImg.url}
          alt={modalImg.alt}
        />
      )}
      {isLoading && <Loader />}
      {showLoadMore && (
        <button className onClick={handleClick}>
          Load More
        </button>
      )}
      {isError && <Toaster />}
    </>
  );
}

export default App;
