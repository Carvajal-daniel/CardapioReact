import { useContext } from "react";
import { OpenModal } from "../context/OpenModal";

const useOpenModal = () =>{
  return useContext(OpenModal)
}

export default useOpenModal