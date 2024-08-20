"use client"

import { useEffect } from "react"

function error({error,reset}) {
  useEffect(() =>{
     console.error("An error was happened");
     
  },[error])  
  return (
        <div className="flex flex-col justify-center items-center pt-10" >
            <h1>Something went wrong</h1>
            <button className="text-blue-500" onClick={() => reset()}>Try again</button>
        </div>
   )
}

export default error
