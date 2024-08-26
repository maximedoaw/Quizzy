"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

function Progress() {
  const [step,setStep] = useState(1)
  const router = useRouter()
  const quizzId = useSearchParams()
  const handleNext = () =>{
    setStep((step) => step + 1)
  }
  const handleBack = () => {
    setStep((step) => step === 1 ? 1 : step - 1)
  }

  useEffect(() =>{
    router.push(`/create-quizz/Question?step=${step}&quizId=${quizzId.get('quizId')}`)
  },[step])

  return (
    <div className="w-full flex justify-center space-x-14">
      <button
       className={`disabled:bg-gray-300 disabled:text-gray-500 py-2 px-5 rounded-lg bg-purple-600 text-white 
       font-semibold hover:brightness-125 hover:scale-110
       transition-transform duration-200`} 
       onClick={handleBack}
       disabled={step === 1 ? true : false}
      >Back</button>

      <button 
       className={`disabled:bg-gray-300 disabled:text-gray-500 py-2 px-5 rounded-lg bg-purple-600 text-white 
        font-semibold hover:brightness-125 hover:scale-110
        transition-transform duration-200`}  
        onClick={handleNext}
        disabled={step === 4 ? true : false}

      >Next</button>
    </div>
  )
}

export default Progress
