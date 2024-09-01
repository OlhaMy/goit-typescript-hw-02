import axios from "axios";

export const fetchPhotos = async (query, page) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: 20,
        page,
        client_id: "hZIgvv_tZy8J3SWbvTilVSuoPAUqYkRrILs3JGwXhZY",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
