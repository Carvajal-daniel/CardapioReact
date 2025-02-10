import { useContext } from "react";
import { ContextCard } from "../context/ContexCart";

 const useContextCart = () =>{
  return useContext(ContextCard)
}

export default useContextCart