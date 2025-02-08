import useIsOpen from '../hooks/useIsOpen'; 

import { FaRegClock } from "react-icons/fa";


export const IsOpen = () => {
  const { isOpen } = useIsOpen(); 

  return (
    <div className={ ` flex items-center xl:text-sm gap-2 ${isOpen ? 'text-green-500' : 'text-red-700 '}`}>
         <span>
          <FaRegClock />
        </span>
      {isOpen ? 'Aberto' : 'Fechado'}
    </div>
  );
};