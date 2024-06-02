import React from "react";
import { GifState } from "../context/context";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500 ",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500 ",
  },
  {
    title: "Text",
    value: "text",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500 ",
  },
];

const Filter = ({ alignLeft = false }) => {
  const { setFilter, filter } = GifState();

  return (
    <div
      className={`flex bg-gray-600 rounded-full min-w-80 ${
        alignLeft ? "max-w-2xl" : ""
      }`}
    >
      {filters.map((item) => {
        return (
          <span
            className={`rounded-full w-1/3 p-3 ${
              item.value === filter ? item.background : ""
            } cursor-pointer text-center`}
            key={item.title}
            onClick={() => {
              setFilter(item.value);
            }}
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
};

export default Filter;
