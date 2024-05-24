import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageUrl = useSelector((state) => state.movieoData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrvious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentImage < bannerData?.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [bannerData, imageUrl, currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          return (
            <div
              key={data.id + "bannerHome" + index}
              className=" relative min-w-full min-h-[450px] lg:min-h-full overflow-hidden group transition-all "
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {/* Banner Images  */}
              <div className="w-full h-full">
                <img
                  src={imageUrl + data.backdrop_path}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Buttons for next and previous images  */}
              <div className="absolute top-0 w-full h-full hidden flex items-center justify-between p-4 group-hover:lg:flex">
                <button
                  onClick={handlePrvious}
                  className="bg-white text-xl z-10 text-black rounded-full p-2"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white text-xl z-10 text-black rounded-full p-2"
                >
                  <FaAngleRight />
                </button>
              </div>

              {/* shadowing  */}
              <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container mx-auto ">
                <div className=" w-full absolute bottom-0 max-w-md px-3">
                  <h1 className="text-3xl font-bold lg:text-4xl text-white drop-shadow-2xl ">
                    {data?.title || data?.name}
                  </h1>
                  <p className="text-eclipse line-clamp-4 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-400 shadow-md transition-all scale-75">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
