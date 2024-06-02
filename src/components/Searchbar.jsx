import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const searchbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchGifs = () => {
    if (search.trim() === "") return;
    navigate(`/search/${search}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchGifs();
    }
  };

  return (
    <div className="flex relative">
      <input
        type="text"
        className=" w-full p-5 pl-6 pr-14 text-xl rounded-tl-md rounded-bl-md outline-none text-neutral-700"
        placeholder="Search all the GIF's and Stickers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {search && (
        <button
          className="absolute right-20 mr-1 w-6 top-6 text-white bg-gray-300 rounded-full"
          onClick={() => setSearch("")}
        >
          X
        </button>
      )}

      <button
        className="flex justify-center rounded-tr-md rounded-br-md p-5 bg-gradient-to-tr from-red-400 via-red-400 to-red-400 cursor-pointer"
        onClick={() => searchGifs()}
      >
        <FaSearch size={30} style={{ transform: "rotate(90deg)" }} />
      </button>
    </div>
  );
};

export default searchbar;
