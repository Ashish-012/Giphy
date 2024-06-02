import React, { useEffect } from "react";
import { GifState } from "../context/context";
import Gif from "../components/Gif";
import banner from "/banner.gif";
import { IoIosTrendingUp } from "react-icons/io";
import Filter from "../components/Filter";

const Home = () => {
  const { gf, gifs, setGifs, filter} = GifState();

  const fetchTrending = async () => {
    const result = await gf.trending({
      sort: "relevant",
      lang: "es",
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(result.data);
  };

  useEffect(() => {
    fetchTrending();
  }, [filter]);

  return (
    <div>
      <img
        src={banner}
        className="w-full mt-4 mb-4 rounded-md"
        alt="earth banner"
      />
      <div className="flex justify-between mb-4 flex-col sm:flex-row">
        <div className="flex gap-4 items-center mt-2 mb-2">
          <IoIosTrendingUp size={35} style={{ color: "cyan" }} />
          <span className="text-xl font-mono font-bold">Trending</span>
        </div>
        <Filter />
      </div>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5">
        {gifs?.map((gif) => {
          return <Gif gif={gif} key={gif.id}></Gif>;
        })}
      </div>
    </div>
  );
};

export default Home;
