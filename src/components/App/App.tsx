import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { fetchPhotos } from "../../services/unsplashAPI";

import SearchBar from "../SearchBar/SearchBar";

import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Photo, ModalImage, FetchPhotosResult } from "./App.types";
import "./App.css";

function App() {
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);

  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<ModalImage>({ src: "", alt: "" });
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetchPhotos<FetchPhotosResult>(query, page);

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

  const handleSubmit = (searchTerm: string) => {
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
    setModalImg({ src: "", alt: "" });
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  const handleOpenModal = (modalImg: ModalImage) => {
    setOpenModal(true);
    setModalImg(modalImg);
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalImg({ src: "", alt: "" });
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
