import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizentalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-3 my-10 ">
      <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white capitalize">
        {heading}
      </h2>
      <div className="overflow-hidden relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar_none "
        >
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                trendingData={data}
                index={index}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>
        {/* buttons next and previous  */}
        <div className=" absolute top-0 w-full h-full hidden lg:flex items-center justify-between group-hover:lg:flex ">
          <button
            onClick={handlePrevious}
            className="bg-white text-xl z-10 text-black rounded-full p-2 -mr-2"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white text-xl z-10 text-black rounded-full p-2 -ml-2"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizentalScrollCard;
