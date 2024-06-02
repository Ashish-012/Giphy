import React, { useState } from "react";
import { GifState } from "../context/context";
import Gif from "../components/Gif";

const Favourites = () => {
  const { favourits, gf } = GifState();
  const [favGifs, setFavGifs] = useState([]);

  const fetchFav = async () => {
    const { data } = await gf.gifs(favourits);
    setFavGifs(data);
  };

  useState(() => {
    fetchFav();
  }, []);

  return (
    <div className="mt-4 columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5">
      {favGifs?.map((gif) => {
        return <Gif gif={gif} key={gif.id}></Gif>;
      })}
    </div>
  );
};

export default Favourites;
