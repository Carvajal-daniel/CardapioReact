import useOpenModal from "../hooks/useModalCard";
import imgLogo from "../assets/menuLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const classBtnMenos = 'border cursor-pointer px-[6px] py-[6px] text-lg rounded-lg bg-white shadow border-zinc-200 hover:scale-103';
const classBtnMais = 'border text-white cursor-pointer px-[6px] py-[6px] text-lg rounded-lg bg-mint-500 shadow border-zinc-200 hover:scale-103';

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
          className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal principal */}
          <motion.div
            className="relative w-[90%] max-w-md bg-[#f5f5f5] h-auto rounded-lg shadow-lg overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
          >
            {/* Botão de fechar */}
            <button onClick={handleClose} className="absolute top-2 right-2 bg-mint-500 text-white rounded-full p-[10px] shadow-md hover:bg-red-600 transition">
              <X size={24} />
            </button>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {/* Imagem do Produto */}
              <div className="flex shadow-xl rounded-2xl items-center justify-center w-full">
                <img className="w-full max-h-60 object-cover rounded-lg" src={dataCard.img} alt={dataCard.name} />
              </div>

              <div className="mt-3 flex flex-col space-y-4 text-gray-800">
                {/* Logo */}
                <div className="flex items-center">
                  <img width={30} src={imgLogo} alt="logo" />
                  <h2 className="ml-2 text-md ">Menu-Online</h2>
                </div>

                {/* Nome do Produto */}
                <h1 className="text-2xl font-primary -mt-2 font-medium">{dataCard.name}</h1>

                {/* Preço e Quantidade */}
                <div className="flex items-center -mt-4 justify-between">
                  <h2 className="text-lg text-text-primary font-bold">
                    R$ {((dataCard.price ?? 0) * qtd).toFixed(2)}
                  </h2>

                  <div className="flex space-x-3">
                    <button onClick={() => setQtd((prev) => (prev > 1 ? prev - 1 : 1))} className={`${qtd === 1 ? classBtnMenos : classBtnMais}`}>
                      <IoIosArrowBack />
                    </button>
                    <span className="text-lg">{qtd}</span>
                    <button onClick={() => setQtd((prev) => prev + 1)} className={classBtnMais}>
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <h2 className="font-semibold font-primary text-xl">Sobre:</h2>
                  <p className="text-gray-600 text-sm">{dataCard.dsc}</p>
                </div>

                {/* Ingredientes */}
                <div>
                  <h2 className="font-semibold font-primary text-xl">Ingredientes:</h2>
                  <p className="text-gray-600 text-sm">{dataCard.dsc}</p>
                </div>

                {/* Botão de Adicionar */}
                <button onClick={handleAddToCart} className="bg-mint-500 w-full py-2 rounded-xl text-white text-lg">
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
