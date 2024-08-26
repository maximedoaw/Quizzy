"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function QuizForm() {
  const [quizzName,setQuizzName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizz = addDoc(collection(db,'quizz'),{
      quizzName,
      timestamp:serverTimestamp()
    })
    setLoading(true);
    router.push(`/create-quizz/Question?step=1&quizId=${(await quizz).id}`)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold mb-6">Create Your Quizz</h2>

        
              <div className="mb-4">
                <input
                  type="text"
                  className="
                  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="question"
                  placeholder=" Name of quizz"
                  onChange={(e) => setQuizzName(e.target.value)}
                  value={quizzName}
                  required
                  autoFocus
                />
              </div>
              <button className={`${loading ? 'bg-gray-200 text-gray-700' : 'bg-purple-600 text-white'} font-semibold w-full max-w-md h-10
                border-none rounded-lg hover:brightness-100 hover:scale-105 transition-transform
                duration-200`}
                disabled = {loading}
                >{loading ?'loading...':'Create'}</button>
    
          </form>
 
      </div>

    </div>
  );
}
