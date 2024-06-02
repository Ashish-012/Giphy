import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GifState } from "../context/context";
import Searchbar from "../components/Searchbar";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { gf, favourits } = GifState();
  const categoriesRef = useRef(null);
  const location = useLocation();

  const fetchCategories = async () => {
    const result = await gf.categories();
    setCategories(result.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // To close the categories modal when you click outside

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
  //       setShowCategories(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [categoriesRef]);

  useEffect(() => {
    setShowCategories(false);
  }, [location]);

  return (
    <nav>
      <div className="relative flex w-full justify-between items-center mb-4 gap-4">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" alt="Giphy Logo" className="w-8" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="flex gap-4 text-md">
          {categories?.slice(0, 5).map((item) => (
            <Link
              className="p-2 hover:gradient border-b-2 hidden lg:block font-bold text-lg"
              key={item.name}
              to={`/${item.name_encoded}`}
            >
              {item.name}
            </Link>
          ))}
          <button onClick={() => setShowCategories(!showCategories)}>
            <BsThreeDotsVertical
              className={`p-2 ${
                showCategories ? "gradient" : ""
              } hover:gradient border-b-2 hidden lg:block`}
              size={45}
            />
          </button>
          {favourits.length > 0 && (
            <div
              className={`px-4 py-2 bg-gray-600 hidden lg:block rounded-md font-bold`}
              size={45}
            >
              <Link to={`/favourites`}>Favourite GIFs</Link>
            </div>
          )}
          <button
            className="block lg:hidden"
            onClick={() => setShowCategories(!showCategories)}
          >
            <FaAlignRight
              className={`p-2 hover:gradient border-b-2`}
              size={45}
            />
          </button>
        </div>
        {showCategories && (
          <div
            ref={categoriesRef}
            className="absolute left-0 right-0 top-16 p-10 gradient z-20 rounded-md"
          >
            <h1 className="pb-4 font-bold text-3xl font-sans">Categories</h1>
            <hr />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5 gap-2">
              {categories?.map((item) => (
                <Link
                  className="p-2 text-xl font-bold font-mono"
                  key={item.name}
                  to={`/${item.name_encoded}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Searchbar />
    </nav>
  );
};

export default Header;
