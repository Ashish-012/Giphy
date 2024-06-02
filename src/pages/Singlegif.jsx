import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/context";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import Gif from "../components/Gif";
import { FaHeart } from "react-icons/fa";
import { ImEmbed } from "react-icons/im";
import { FaSquareShareNodes } from "react-icons/fa6";

const Singlegif = () => {
  const { type, id } = useParams();
  let slug = id.split("-").pop();

  const [gif, setGif] = useState({});
  const [related, setRelated] = useState(null);
  const { gf, HandleFavourits, favourits } = GifState();
  const fetchCategories = async () => {
    const { data } = await gf.gif(slug);
    const { data: relatedData } = await gf.related(slug, { limit: 20 });
    setGif(data);
    setRelated(relatedData);
  };

  useEffect(() => {
    fetchCategories();
  }, [slug]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row mt-10 w-100">
        <div className="flex-col  mt-4  sm:w-1/4">
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
          <div className="h-0.5 mt-4 bg-gray-800 mb-4"></div>
          <div className="text-xl mb-2">Source</div>
          <a href={gif?.source} className="mt-4 text-wrap break-words">
            {gif?.source}
          </a>
        </div>
        <div className="sm:ml-4 w-2/4 m-auto mt-5 sm:mt-0">
          {gif && (
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 ">{`${gif?.title} `}</h1>
          )}
          <img
            src={gif?.images?.fixed_height.webp}
            className=" rounded-md w-full"
          />
        </div>
        <div className=" sm:w-1/4 ml-6 md:ml-8 lg:ml-20 mt-10 m-auto">
          <div className="mb-5">
            <button
              className="flex gap-5"
              onClick={() => HandleFavourits(gif.id)}
            >
              <FaHeart
                size={35}
                color={favourits.includes(gif.id) ? "red" : ""}
              />
              <span className="text-lg">Favourite</span>
            </button>
          </div>
          <div className="mb-5">
            <button
              className="flex gap-5"
              onClick={() => {
                navigator.clipboard.writeText(gif.bitly_url);
              }}
            >
              <FaSquareShareNodes size={35} />
              <span className="text-lg">Share</span>
            </button>
          </div>
          <div className="mb-5">
            <button
              className="flex gap-5"
              onClick={() => {
                navigator.clipboard.writeText(gif.embed_url);
              }}
            >
              <ImEmbed size={35} />
              <span className="text-lg">Embed</span>
            </button>
          </div>
        </div>
      </div>
      <div className="text-3xl font-mono">Related Gifs</div>
      <div className="mt-4 columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5">
        {related &&
          related.map((relatedGif) => {
            return <Gif gif={relatedGif} key={relatedGif.id}></Gif>;
          })}
      </div>
    </div>
  );
};

export default Singlegif;
