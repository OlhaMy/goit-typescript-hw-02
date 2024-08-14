import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { fetchPhotos } from "./services/unsplashAPI";

import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
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
        setIsError(false);
        const res = await fetchPhotos(query, page);
        setPhotos((prev) => [...prev, ...res]);
        setShowLoadMore(page < Math.ceil(res.total_pages / res.per_page));

        if (!res.photos.length) {
          setIsEmpty(true);
          toast.error("Nothing found, please enter a valid query!");
          setIsError(true);
          return;
        }
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
    setPhotos([]);
    setPage(1);
    setShowLoadMore(false);
    setIsError(false);
    setIsEmpty(false);
    setOpenModal(false);
    setModalImg({});
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  const handleOpenModal = (modalImg) => {
    setOpenModal(true);
    setModalImg(modalImg);
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalImg({});
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {isEmpty && <ErrorMessage />}

      {photos.length > 0 && (
        <ImageGallery photos={photos} handleOpenModal={handleOpenModal} />
      )}

      <ImageModal
        modalIsOpen={openModal}
        closeModal={closeModal}
        modalImg={modalImg}
      />

      {isLoading && <Loader />}
      {showLoadMore && <LoadMoreBtn onClick={handleClick} />}
      {isError && <Toaster />}
    </>
  );
}

export default App;
