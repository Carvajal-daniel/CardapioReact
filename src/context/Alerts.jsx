import { createContext, useState, useEffect } from "react";


const ContextAlert = createContext();

const AlertProvider = ({ children }) => {
  const [alertItem, setAlertItem] = useState(false);
  const [message, setMessage] = useState("Adicionado com susseco");

 
  return (
    <ContextAlert.Provider value={{ alertItem, message, setAlertItem, setMessage }}>
      {children}
    </ContextAlert.Provider>
  );
};

export { ContextAlert, AlertProvider };
