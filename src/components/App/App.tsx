import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { fetchPhotos } from "../../services/unsplashAPI";

import SearchBar from "../SearchBar/SearchBar";

import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
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

        if (res.total === 0) {
          toast.error("Nothing found, please enter a valid query!");
          setIsEmpty(true);
          return;
        }
        setPhotos((prev) => [...prev, ...res.results]);
        setShowLoadMore(page < res.total_pages);
        setIsEmpty(false);
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
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

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

      {isEmpty && <Toaster position="top-right" reverseOrder={false} />}

      {photos.length > 0 && (
        <ImageGallery photos={photos} handleOpenModal={handleOpenModal} />
      )}

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
