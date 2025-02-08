import { useContext } from "react";
import { ContextOpen } from "../context/ContextOpen";

const useIsOpen = () => {
  return useContext(ContextOpen);
};

export default useIsOpen;
