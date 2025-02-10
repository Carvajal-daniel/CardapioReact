import useOpenModal from "../hooks/useModalCard";
import imgLogo from "../assets/menuLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Ícone de fechar

export const ModalCard = () => {
  const { dataCard, setIsOpenModal, isOpenModal, setDataCard } = useOpenModal();

  function handleClick() {
    setIsOpenModal(false);
    setDataCard({})
  }

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
            className="relative w-[90%] max-w-md bg-[#f5f5f5] h-auto rounded-lg shadow-lg overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, "easeInOut": "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
          >
            {/* Botão de fechar melhor posicionado */}
            <button
              onClick={handleClick}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-[10px] shadow-md hover:bg-red-600 transition"
            >
              <X size={24} />
            </button>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {/* Imagem do Produto */}
              <div className="flex items-center justify-center w-full">
                <img
                  className="w-full max-h-60 object-cover rounded-lg"
                  src={dataCard.img}
                  alt={dataCard.name}
                />
              </div>

              <div className="mt-6 flex flex-col space-y-4 text-gray-800">
                {/* Logo */}
                <div className="flex items-center">
                  <img width={40} src={imgLogo} alt="logo" />
                  <h2 className="ml-2 text-xl font-bold">Menu-Online</h2>
                </div>

                {/* Nome do Produto */}
                <h1 className="text-2xl font-medium">{dataCard.name}</h1>

                {/* Preço e Quantidade */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Preço</h2>
                  <button className="bg-gray-200 px-4 py-2 rounded-lg">
                    - 1 +
                  </button>
                </div>

                {/* Descrição */}
                <div>
                  <h2 className="font-semibold">Sobre:</h2>
                  <p className="text-gray-600">{dataCard.dsc}</p>
                </div>

                {/* Ingredientes */}
                <div>
                  <h2 className="font-semibold">Ingredientes:</h2>
                  <p className="text-gray-600">{dataCard.dsc}</p>
                </div>

                {/* Botão de Adicionar */}
                <button className="bg-green-500 w-full py-2 rounded-xl text-white text-lg">
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
