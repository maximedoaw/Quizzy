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
  <div>
    <Categories />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-6">
      {listQuizz.map((quizzProps) =>(
        <Card 
        username={quizzProps.username}
        category={quizzProps.category}
        quizzName={quizzProps.quizzName}
        timestamp={quizzProps.timestamp}
        imageURL={quizzProps.imageURL}
        />
      ))}
      {/* Ajoute d'autres <Card /> si nécessaire */}
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
