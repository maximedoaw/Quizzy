"use client"

import Link from "next/link";
import Card from "./components/Card";
import Categories from "./components/Categories";


export default function Home() {
  
  return (
  <div>
    <Categories />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-6">
      <Card />
      <Card />
      <Card />
      {/* Ajoute d'autres <Card /> si nécessaire */}
    </div>

    <div>
      <Link href="/create-quizz">
        <button
          className="text-white bg-blue-400 items-center rounded-full w-10 h-10 fixed bottom-5 right-5 sm:bottom-7 sm:right-7 md:bottom-10 md:right-10"
        >
          +
        </button>
      </Link>
    </div>
  </div>
  )
}
