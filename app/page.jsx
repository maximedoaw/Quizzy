"use client"

import Link from "next/link";
import Card from "./components/Card";
import Categories from "./components/Categories";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [user,setUser] = useState(null)
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
    //Ecouter les changements d'etats de l'authentification

    const unsubscribe = auth.onAuthStateChanged((user) =>{
        setUser(user)
    })
   // if(!user) router.push('/auth')

    return () => { unsubscribe() , getQuizz() }
},[])
  return (
  <div className="flex flex-col">
      <Categories />
      <div className="flex flex-wrap  gap-6 p-4">
        {listQuizz.map((quizzProps) => (
          <Card 
            key={quizzProps.id} // Assure-toi d'avoir une clé unique
            username={quizzProps.username}
            category={quizzProps.category}
            quizzName={quizzProps.quizzName}
            timestamp={quizzProps.timestamp}
            imageURL={quizzProps.imageURL}
            className="w-full sm:w-full md:w-1/3 lg:w-1/4" // Largeur ajustable en fonction de la taille de l'écran
          />
        ))}
      </div>




    <div>
      {user ? (<Link href="/create-quizz">
        <button
          className="text-white bg-blue-400 items-center rounded-full w-10 h-10 fixed bottom-5 right-5 sm:bottom-7 sm:right-7 md:bottom-10 md:right-10"
        >
          +
        </button>
      </Link>) : ""}
    </div>
  </div>
  )
}
