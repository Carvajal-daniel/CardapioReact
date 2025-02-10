import { useState, useEffect } from "react";
import { useProduct } from "../hooks/useCardProduct";
import dados from "../mocks/dados2.json";
import useOpenModal from "../hooks/useModalCard";
import { motion, AnimatePresence } from "framer-motion";

const class1 = "flex space-x-6 h-30 rounded-2xl px-3 py-3 border-zinc-700";
const class2 = "flex space-x-6 bg-white h-30 shadow-md rounded-2xl px-2 py-3 border-zinc-700";

export const CardItem = () => {
  const { setIsOpenModal, setDataCard, isOpenModal } = useOpenModal();
  const { nameProduct } = useProduct();
  const [selectedItem, setSelectedItem] = useState(null);

  function handleClick(product) {
    setSelectedItem(product);
    setDataCard(product);
    setIsOpenModal(true);
  }

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  return (
    <motion.div
      className="bg-[#f5f5f5] xl:w-[980px] space-y-1 mx-auto xl:px-8"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: .8 }}
    >
      {dados[nameProduct].map((product, index) => (
        <motion.div
          key={product.id}
          onClick={() => handleClick(product)}
          className={`mx-2 px-4 relative cursor-pointer ${
            selectedItem?.id === product.id ? class2 : class1
          }`}
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.2, 
            duration: 0.3, // Duração da animação
            ease: "easeOut",
          }}
        >
          <div>
            <img
              className="w-24 rounded-lg imgcard"
              src={product.img}
              alt={product.name}
            />
          </div>

          <div>
            <h2
              className={`name-item w-40 font-primary text-lg font-bold ${
                selectedItem?.id === product.id
                  ? "uppercase text-black"
                  : "uppercase font-bold text-text-primary"
              }`}
            >
              {product.name}
            </h2>
            <p className="text-sm xl:w-full text-text-secondary font-secondary w-50">
              {product.dsc}
            </p>
          </div>

          <div className="flex items-center absolute h-6 right-5 bottom-2 rounded-md text-text-primary px-2 font-medium bg-mint-500">
            R$ {product.price.toFixed(2)}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
