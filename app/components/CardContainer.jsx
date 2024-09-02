"use client"

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Card from "./Card";

function CardContainer() {
    const [listQuizz,setListQuizz] = useState([])

    const getQuizz = async ()  =>{
      const querySnapshot = await getDocs(collection(db,'quizz'))
      const response = await querySnapshot.docs.map((doc) =>{
        console.log(doc.data());
        
        return { id:doc.id,...doc.data() }
      }
    ) 
  
      setListQuizz(response)
    }

    useEffect(() =>{
        return () => { getQuizz() }
    },[])

  return (
    <div>
      <div className="flex flex-wrap gap-6 p-4">
        {listQuizz.map((quizzProps) => (
          <Card 
            key={quizzProps.id} // Assure-toi d'avoir une clé unique
            username={quizzProps.username}
            category={quizzProps.category}
            quizzName={quizzProps.quizzName}
            timestamp={quizzProps.timestamp}
            imageURL={quizzProps.imageUrl}
            className="w-full sm:w-full md:w-1/3 lg:w-1/4" // Largeur ajustable en fonction de la taille de l'écran
          />
        ))}
      </div>            
    </div>
  )
}

export default CardContainer
