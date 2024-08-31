import Image from "next/image";
import { AiFillStar } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import Moment from "react-moment";

function Card({ username, category, quizzName, timestamp, imageURL }) {
  return (
    <div className="flex flex-col border shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300 m-5 w-[350px] h-[350px] bg-white
    cursor-pointer ">
      {/* Image Section */}
      <div className="relative h-full w-full">
        <Image 
          src={imageURL}
          alt="Quiz image" 
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-6 space-y-4 items-center">
        {/* User and Category */}
        <div className="flex items-center justify-between w-full">
          <p className="font-medium text-blue-600 truncate">{username}</p>
          <span className="text-xs font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Quiz Name */}
        <h3 className="font-bold text-xl text-gray-800 truncate text-center">
          {quizzName}
        </h3>

        {/* Timestamp */}
        <div className="text-xs text-gray-500 text-center">
          <Moment fromNow>{timestamp?.toDate()}</Moment>
        </div>

        {/* Footer Icons */}
        <div className="flex justify-between items-center w-full mt-4">
          <AiFillStar className="text-gray-300 hover:text-yellow-400 text-3xl cursor-pointer transition-transform transform hover:scale-110" />
          <FaPlay className="text- bg-blue-500 text-2xl rounded-full p-3 hover:bg-blue-600 cursor-pointer transition-transform transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
}

export default Card;
