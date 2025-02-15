import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import imgLogo from "../assets/menuLogo.png";
import useOpenModal from "../hooks/useModalCard";
import { useAlert } from '../hooks/useAlert'

export const ModalCard = () => {
  const { dataCard, setIsOpenModal, isOpenModal, setDataRender } = useOpenModal();
  const [qtd, setQtd] = useState(1);
  const { setAlertItem } = useAlert()



  function resetQuantity() {
    setQtd(1);
  }

  function updateCart() {
    setDataRender((prev) => {
      const existingItem = prev.find((item) => item.name === dataCard.name);
      if (existingItem) {
        return prev.map((item) =>
          item.name === dataCard.name ? { ...item, qtd: item.qtd + qtd } : item
        );
      }
      return [...prev, { ...dataCard, qtd }];
    });
  }

  const handleClose = () => {
    setIsOpenModal(false);
    setTimeout(resetQuantity, 300);
  };

  const handleAddToCart = () => {
    updateCart();

    handleClose();
    setAlertItem(true)
  };

  return (
    <>
      <AnimatePresence>
        {isOpenModal && dataCard && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="relative w-full max-w-[85%] xl:max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden p-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full cursor-pointer p-2 shadow-md hover:bg-red-600 transition"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center space-y-4 text-gray-800">
                <img className="w-48 xl:w-60 h-48 object-cover rounded-xl shadow-md" src={dataCard.img} alt={dataCard.name} />
                <div className="flex items-center space-x-2">
                  <img width={30} src={imgLogo} alt="logo" />
                  <h2 className="text-lg font-semibold text-gray-700">Menu Online</h2>
                </div>
                <h1 className="text-2xl font-primary font-bold text-gray-900 text-center">{dataCard.name}</h1>
                <h2 className="text-lg text-gray-900 font-bold">R$ {dataCard.price.toFixed(2)}</h2>

                <div className="flex items-center space-x-4">
                  <button onClick={() => setQtd(qtd > 1 ? qtd - 1 : 1)} className="bg-gray-200 px-2 py-2  cursor-pointer rounded-lg">
                    <IoIosArrowBack />
                  </button>
                  <span className="text-lg font-bold">{qtd}</span>
                  <button onClick={() => setQtd(qtd + 1)} className="bg-green-500 text-white cursor-pointer px-2 py-2 rounded-lg">
                    <IoIosArrowForward />
                  </button>
                </div>

                <p className="text-gray-600 text-sm text-center max-w-xs">{dataCard.dsc}</p>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 hover:bg-green-700 cursor-pointer py-2 rounded-xl text-white text-lg font-semibold shadow-lg transition"
                >
                  Adicionar à Sacola
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
};
