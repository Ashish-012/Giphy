import React from "react";
import { Link } from "react-router-dom";

const Gif = ({ gif }) => {
  return (
    <Link to={`/${gif.type}s/${gif.slug}`} key={gif.id}>
      <div className="relative w-full mb-5 group aspect-video">
        <img
          src={`${gif?.images?.fixed_width.webp}`}
          alt={`${gif?.title}`}
          className="w-full object-cover rounded translation-all duration-300"
        />
        {gif?.user?.avatar_url && (
          <div className="absolute inset-0 flex opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-gray-800  items-end font-bold gap-2 p-2 rounded">
            <img
              src={`${gif?.user?.avatar_url}`}
              alt={`${gif?.user?.display_name}`}
              className="w-10"
            />
            <span>{gif?.user?.display_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Gif;
