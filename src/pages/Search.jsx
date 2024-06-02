import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Filter from "../components/Filter";
import { GifState } from "../context/context";
import Gif from "../components/Gif";

const Search = () => {
  const { id } = useParams();
  const { gf, gifs, setGifs, filter } = GifState();
  const fetchSearch = async () => {
    const result = await gf.search(id, {
      sort: "relevant",
      lang: "es",
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(result.data);
  };

  useEffect(() => {
    fetchSearch();
  }, [filter, id]);

  return (
    <div>
      <div className="mt-4 font-mono text-4xl font-extrabold mb-4">{id}</div>
      <Filter alignLeft="true" />
      <div className="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5">
        {gifs?.length > 0 ? (
          gifs?.map((gif) => {
            return <Gif gif={gif} key={gif.id}></Gif>;
          })
        ) : (
          <div>{`No GIF's found for the query :(`}</div>
        )}
        {}
      </div>
    </div>
  );
};

export default Search;
