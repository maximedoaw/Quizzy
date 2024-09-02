"use client"

import Link from "next/link";
import Categories from "./components/Categories";
import CardContainer from "./components/CardContainer";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [user,setUser] = useState(null)

  useEffect(() =>{
    //Ecouter les changements d'etats de l'authentification

    const unsubscribe = auth.onAuthStateChanged((user) =>{
        setUser(user)
    })
   // if(!user) router.push('/auth')

    return () => { unsubscribe() }
},[])
  return (
  <div className="flex flex-col">
      <Categories />

      <CardContainer />






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
