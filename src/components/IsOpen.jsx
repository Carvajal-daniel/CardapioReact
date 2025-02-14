import useIsOpen from '../hooks/useIsOpen'; 

import { FaRegClock } from "react-icons/fa";


export const IsOpen = () => {
  const { isOpen } = useIsOpen(); 

  return (
    <div className={ ` flex  items-center xl:text-md gap-2 ${isOpen ? 'text-green-600' : 'text-red-500 '}`}>
         <span>
          <FaRegClock />
        </span>
      {isOpen ? 'Aberto' : 'Fechado'}
    </div>
  );
};