import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchPhotos } from "./services/unsplashAPI";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchPhotos(query, page);

        setPhotos((prev) => [...prev, ...res]);

        setShowLoadMore(page < Math.ceil(res.total_results / res.per_page));
      } catch (error) {
        console.error("Error fetching photos:", error);
        toast.error("Failed to fetch photos");
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
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      {photos.length > 0 && <ImageGallery photos={photos} />}
      {isLoading && <Loader />}
      {showLoadMore && <button onClick={handleClick}>Load More</button>}
    </>
  );
}

export default App;
