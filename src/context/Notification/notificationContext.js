import { createContext } from "react";
import { useContext } from "react";

export const NotificationContext = createContext()
export const useNotificationContext = () => useContext(NotificationContext)
