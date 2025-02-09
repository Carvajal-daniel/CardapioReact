import { createContext, useEffect, useState } from "react";

const ContextOpen = createContext();

const OpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const data = new Date()
  const hour = data.getHours()

  useEffect(() =>{
      if(hour >= 16 && hour <= 23){
        setIsOpen(true)
      }
  }, [])

  return (
    <ContextOpen.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ContextOpen.Provider>
  );
};

export { ContextOpen, OpenProvider };
