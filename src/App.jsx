import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { fetchPhotos } from "./services/unsplashAPI";

import SearchBar from "./components/SearchBar/SearchBar";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";
import { date } from "yup";

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
        if (res.total === 0) {
          toast.error("Nothing found, please enter a valid query!");
          setIsEmpty(true);
          return;
        }
        console.log(res);
        setPhotos((prev) => [...prev, ...res.results]);
        setShowLoadMore(page < res.total_pages);
      } catch (error) {
        toast.error("Something went wrong, try again later!");
        setIsError(true);
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

      {photos.length > 0 && (
        <ImageGallery photos={photos} handleOpenModal={handleOpenModal} />
      )}
      {setIsEmpty && <Toaster position="top-right" reverseOrder={false} />}

      <ImageModal
        modalIsOpen={openModal}
        closeModal={closeModal}
        modalImg={modalImg}
      />

      {isLoading && <Loader />}
      {showLoadMore && photos.length > 0 && (
        <LoadMoreBtn onClick={handleClick} />
      )}

      {isError && <Toaster position="top-right" reverseOrder={false} />}
    </>
  );
}

export default App;
