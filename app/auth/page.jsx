"use client" 

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter()
  const provider = new GoogleAuthProvider()
  const handleSignIn = async () =>{
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Récupérer le jeton d'accès Google
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // Récupérer les informations de l'utilisateur


      // Rediriger l'utilisateur vers la page principale
      router.push('/'); // Remplacez '/' par le chemin de la page où vous souhaitez rediriger l'utilisateur
      
    } catch (error) {
      console.error("Error during signInWithPopup:", error);

      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      // Vous pouvez gérer les erreurs ici
      console.error("Error Code:", errorCode);
      console.error("Error Message:", errorMessage);
      if (email) console.error("Email used:", email);
      if (credential) console.error("Credential used:", credential);
    }
  }
  
  
  return (
  <div className="flex items-center justify-center min-h-screen">
    <button
      type="button"
      className="transition-colors duration-300 ease-in-out py-3 px-4 pl-10 
        border-none rounded-md shadow-sm text-gray-600 text-sm font-medium 
        bg-white bg-no-repeat bg-[length:18px_18px] bg-[position:12px_11px] 
        hover:shadow-lg active:bg-gray-200 focus:outline-none focus:ring-2 
        focus:ring-blue-300 focus:ring-opacity-50 disabled:grayscale disabled:bg-gray-200 
        disabled:cursor-not-allowed btn"
        onClick={handleSignIn}
    >
      Sign in with Google
    </button>
  </div>

  )
}

export default SignIn
