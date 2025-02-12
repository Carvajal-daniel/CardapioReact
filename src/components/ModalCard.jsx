import useOpenModal from "../hooks/useModalCard";
import imgLogo from "../assets/menuLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const classBtnMenos = 'cursor-pointer border px-3 py-2 text-lg rounded-lg bg-white shadow-md border-gray-300 hover:scale-105 transition';
const classBtnMais = ' cursor-pointer border px-3 py-2 text-lg rounded-lg text-white bg-green-600 shadow-md border-green-500 hover:scale-105 transition';
const classBtn = 'cursor-pointer border px-3 py-2 text-lg rounded-lg text-white bg-red-600 shadow-md border-red-500 hover:scale-105 transition';

export const ModalCard = () => {
  const { dataCard, dataRender, setIsOpenModal, isOpenModal, setDataCard, setDataRender } = useOpenModal();
  const [qtd, setQtd] = useState(1);

  function zerarValue() {
    setQtd(1);
  }

  function valueTotaL(item, index) {
    setDataRender((prev) => {
      const itemIndex = prev.findIndex((item) => item.name === dataCard.name);

      if (itemIndex !== -1) {
        return prev.map((item, index) =>
          index === itemIndex ? { ...item, qtd: item.qtd + qtd } : item
        );
      } else {
        return [
          ...prev,
          {
            name: dataCard.name,
            img: dataCard.img,
            price: dataCard.price,
            qtd: qtd,
            id: dataCard.id
          },
        ];
      }
    });
  }

  const handleClose = () => {
    setIsOpenModal(false);
    zerarValue();
  };

  const handleAddToCart = () => {
    setIsOpenModal(false);
    zerarValue();
    valueTotaL(dataCard, qtd);
  };

  return (
    <AnimatePresence>
      {isOpenModal && dataCard && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal principal */}
          <motion.div
            className="relative w-[85%] xl:max-w-80 max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button onClick={handleClose} className="cursor-pointer absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 transition">
              <X size={20} />
            </button>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {/* Imagem do Produto */}
              <div className="flex items-center justify-center w-full">
                <img className="w-70 max-h-60 object-fit rounded-xl shadow-md" src={dataCard.img} alt={dataCard.name} />
              </div>

              <div className="mt-4 flex flex-col space-y-4 text-gray-800">
                {/* Logo e título */}
                <div className="flex items-center">
                  <img width={30} src={imgLogo} alt="logo" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-700">Menu Online</h2>
                </div>

                {/* Nome do Produto */}
                <h1 className="text-2xl font-primary font-bold text-gray-900">{dataCard.name}</h1>

                {/* Preço e Quantidade */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg text-gray-900 font-bold">
                    R$ {dataCard.price.toFixed(2)}
                  </h2>

                  <div className="flex space-x-3">
                    <button onClick={() => setQtd((prev) => (prev > 1 ? prev - 1 : 1))} className={`${qtd === 1 ? classBtnMenos : classBtn}`}>
                      <IoIosArrowBack />
                    </button>
                    <span className="text-lg font-bold">{qtd}</span>
                    <button onClick={() => setQtd((prev) => prev + 1)} className={classBtnMais}>
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <h2 className="font-semibold text-xl">Sobre:</h2>
                  <p className="text-gray-600 text-sm">{dataCard.dsc}</p>
                </div>

                {/* Botão de Adicionar */}
                <button onClick={handleAddToCart} className="cursor-pointer bg-green-600 hover:bg-green-700 w-full py-3 rounded-xl text-white text-lg font-semibold shadow-lg transition">
                  Adicionar à Sacola
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
