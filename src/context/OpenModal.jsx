import { createContext, useState } from "react";

const OpenModal = createContext()

const OpenModalCard = ({children}) =>{
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [dataCard, setDataCard] = useState(null)
  const [dataRender, setDataRender] = useState([])



  return(
    <OpenModal.Provider value={{isOpenModal, setIsOpenModal, dataCard, setDataCard, dataRender, setDataRender}}>
      {children}
    </OpenModal.Provider>
  )
}

export {OpenModal, OpenModalCard}