import Image from "next/image"
import { AiFillStar } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';


function Card() {
  return (
    <div className="flex flex-col border w-[320px] h-[370px]  m-5 shadow-lg rounded-lg
    space-y-4">
      <Image 
        src="/HxH.jpg" 
        alt="image" 
        width={350}
        height={120}
     />
     <div className="flex items-center mt-2 justify-between">
        <p className="font-semibold text-blue-500 truncate">Maxime Doaw</p>
        <span className="bg-gray-200 p-2 rounded-full ml-auto font-bold">Manga</span>
        <span className="ml-2 flex items-center">3.1<AiFillStar style={{ color: 'gold', fontSize: '20px' }} /></span>
     </div>
     <div className="font-bold truncate text-center">
        Quizz sur les personnage de HxH
     </div>
     <div className="flex justify-between">
        <AiFillStar style={{ color: 'gray', fontSize: '30px' }} className="ml-1 hover:scale-125 transition-transform 
              duration-200 case-out"/>
        <FaPlay style={{  fontSize: '30px' }} className="bg-black text-white rounded-full p-2 hover:scale-125 transition-transform 
              duration-200 mb-1 mr-1 case-out"/>

     </div>
    </div>
  )
}

export default Card
