import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/context";
import Gif from "../components/Gif";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Categories = () => {
  const { categories } = useParams();
  const [gifs, setGifs] = useState([]);
  const { gf } = GifState();

  const fetchCategories = async () => {
    const { data } = await gf.gifs(categories, categories);
    setGifs(data);
  };

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex-col  mt-4 sm:w-72">
        {gifs.length > 0 && <Gif gif={gifs[0]} />}
        <h1 className="text-slate-400">Don't tell it to me, GIF it to me!</h1>
        <h1 className="mt-2 mb-2 font-extrabold font-mono text-slate-400">
          Follow on:{" "}
        </h1>
        <div className="flex gap-3 mt-2 text-slate-400 pb-3">
          <a
            href="https://github.com/Ashish-012"
            target="_blank"
            className="faded-text"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/as-joshi/"
            target="_blank"
            className="faded-text"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
        <div className="w-full h-0.5 mt-4 bg-gray-800" />
      </div>
      <div className="mt-4 sm:ml-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{`${categories} GIF's`}</h1>
        <h1>{`@${categories}`}</h1>
        {gifs.length > 0 && (
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5 mt-2">
            {gifs?.slice(1)?.map((gif) => {
              return <Gif gif={gif} key={gif.id}></Gif>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
