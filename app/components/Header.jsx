"use client"

import { usePathname, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { useState,useEffect } from "react";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const router = useRouter()
  const path = usePathname()
  const [user,setUser] = useState(null)
  useEffect(() =>{
      //Ecouter les changements d'etats de l'authentification

      const unsubscribe = auth.onAuthStateChanged((user) =>{
          setUser(user)
      })
     // if(!user) router.push('/auth')

      return () => unsubscribe()
  },[])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Vous pouvez également rediriger l'utilisateur après la déconnexion, par exemple:

      router.push('/auth')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="flex p-3 items-center justify-between sticky ">
      <img 
        src="/vercel.svg" 
        alt="Quizz logo"
        className="h-5 mr-4"
      />
      {path === '/' ? (<div className="flex w-100 items-center bg-gray-200 rounded-full justify-between">
                <input 
                    type="text" 
                    placeholder="Search quizz"
                    className="bg-gray-200 p-3 focus:outline-none rounded-full w-full"
                />
                
                <FaSearch className='mr-[10px]'/>
        </div>) : ""
     }
    {user ? (
          <>
 
              <button className='p-2 bg-blue-500 text-[#fff] font-semibold rounded-lg
              w-[80px]'
              onClick={handleLogout}
              >
                Logout
              </button>
          </>
      ):(
        <div>
              <div className="flex w-100 items-center  rounded-full justify-between">
              </div>
          <button className='p-2 bg-blue-500 text-[#fff] font-semibold rounded-lg
            w-[80px]'
            onClick={() => router.push('/auth')}
            >
              Login
          </button>
        </div>
        )
      }

    </div>
  )
}

export default Header