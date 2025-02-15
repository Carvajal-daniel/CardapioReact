import { useContext } from "react";
import { ContextAlert } from "../context/Alerts";

export const useAlert = () =>{
  return useContext(ContextAlert)
}