import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GiphyProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [favourits, setFavourits] = useState([]);
  const [filter, setFilter] = useState("gifs");

  const gf = new GiphyFetch(import.meta.env.VITE_API_KEY);

  useEffect(() => {
    const fetchFavs = JSON.parse(localStorage.getItem("favourites"));
    if (fetchFavs) {
      setFavourits(fetchFavs);
    }
    console.log(fetchFavs);
  }, []);

  const HandleFavourits = (gif) => {
    console.log(gif);
    if (favourits.includes(gif)) {
      const updatedFavorites = favourits.filter((item) => item !== gif);
      localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
      setFavourits(updatedFavorites);
    } else {
      const updatedFavorites = [...favourits];
      updatedFavorites.push(gif);
      localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
      setFavourits(updatedFavorites);
    }
  };

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favourits,
        HandleFavourits,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GiphyProvider;
