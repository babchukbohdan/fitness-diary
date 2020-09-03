import { createContext } from "react";
import { useContext } from "react";

export const TodayContext = createContext()
export const useTodayContext = () => useContext(TodayContext)
