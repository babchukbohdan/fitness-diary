import { createContext } from "react";
import { useContext } from "react";

export const FirebaseContext = createContext()
export const useFirebaseContext = () => useContext(FirebaseContext)
