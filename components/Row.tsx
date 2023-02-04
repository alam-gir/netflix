import { modalState, movieState } from "@/atoms/modalAtom";
import { Movie } from "@/utils/type";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { strict } from "assert";
import React, { useEffect, useRef, useState } from "react";
import Thumbnail from "./Thumbnail";

interface RowProps {
  title: string;
  movies: Movie[];
  // when using firebase
  //   movie: Movie | DcoumentData[];
}

const Row = ({ title, movies }: RowProps) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState<number | undefined>(0);

  const handleScroll = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const needScroll =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: needScroll, behavior: "smooth" });
    }
  };
  useEffect(() => {}, [rowRef.current?.scrollLeft]);

  return (
    <div className="h-40 space-y-.5 flex flex-col lg:gap-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl ">
        {title}
      </h2>
      <div className="group relative md:-ml-2 ">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 opacity-0 cursor-pointer transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleScroll("left")}
        />

        <div
          className="flex scrollbar-hide items-center space-x-1 overflow-x-scroll md:space-x-2.5 md:p-2"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 opacity-0 cursor-pointer transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleScroll("right")}
        />
      </div>
    </div>
  );
};

export default Row;
