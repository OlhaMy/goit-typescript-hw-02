import toast from "react-hot-toast";

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formImg = form.elements.query.value.trim();

    if (formImg === "") {
      toast.error("Please enter a search term.");
      return;
    }

    console.log("Searching for:", formImg); // Тут можна розмістити логіку для обробки запиту
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
