import { Children, createContext, useState } from "react";

const ContextCard = createContext()

const CartProvider = ({children}) =>{

    const [isOpenCart, setIsOpenCart] = useState(false)
    const [dataCart, setDataCart] = useState(null)

  return(
    <ContextCard.Provider value={{isOpenCart, dataCart, setDataCart, setIsOpenCart}}>
      {children}
    </ContextCard.Provider>
  )
}

export {CartProvider, ContextCard}