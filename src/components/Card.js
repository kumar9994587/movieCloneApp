import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ trendingData, trending, index, media_type }) => {
  const imageUrl = useSelector((state) => state.movieoData.imageUrl);

  const mediaType = trendingData.media_type ?? media_type;
  // console.log(mediaType);
  return (
    <Link
      to={"/" + mediaType + "/" + trendingData.id}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden rounded block relative hover:scale-110 transition-all "
    >
      {trendingData?.poster_path ? (
        <img src={imageUrl + trendingData?.poster_path} alt="avatar" />
      ) : (
        <div className=" flex justify-center items-center font-semibold text-center bg-neutral-800">
          Image not found
        </div>
      )}

      <div className="absolute top-4">
        {trending && (
          <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden ">
            #{index + 1} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60">
        <h2 className="text-eclipse line-clamp-1 text-lg font-semibold">
          {trendingData?.title || trendingData?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(trendingData.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-black px-1 rounded-l-full text-xs text-white">
            Rating :{Number(trendingData.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
