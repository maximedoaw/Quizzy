import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// Créez un contexte pour l'utilisateur
const UserContext = createContext(null);

//creer un fournisseur de contexte pour envelopper l'application
export const UserProvider = ({children}) =>{

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext)