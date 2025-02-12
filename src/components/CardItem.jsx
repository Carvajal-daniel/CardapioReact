import { useState, useEffect } from "react";
import { useProduct } from "../hooks/useCardProduct";
import dados from "../mocks/dados2.json";
import useOpenModal from "../hooks/useModalCard";
import { motion } from "framer-motion";
import { LuShoppingBasket } from "react-icons/lu";
import useModalCard from "../hooks/useModalCard";
import useCart from "../hooks/useCart";

const class1 = "flex space-x-6 h-30 rounded-2xl px-3 py-3";
const class2 = "flex space-x-6 bg-white h-30 shadow-md rounded-2xl px-2 py-3 border-b-1 border-green-500";

export const CardItem = () => {
  const { setIsOpenModal, setDataCard, isOpenModal, dataCard } = useOpenModal();
  const { nameProduct } = useProduct();
  const { dataRender } = useModalCard();
  const { isOpenCart, setIsOpenCart } = useCart();

  function handleClick(product) {
    setDataCard(product);
    setIsOpenModal(true);
  }

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  return (
    <>
      {/* Animação do Menu */}
      <motion.div
        className="xl:grid xl:grid-cols-4 xl:gap-x gap-y-2 relative bg-[#f5f5f5] xl:w-[980px] space-y-1 mx-auto xl:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.4 }}
      >
        {dados[nameProduct]?.map((product, index) => (
          <motion.div
            key={product.id}
            onClick={() => handleClick(product)}
            className={`mx-2 xl:h-70 xl:flex xl:flex-col xl:text-center xl:items-center bg-white shadow relative mb-2 cursor-pointer ${
              dataCard?.id === product.id ? class2 : class1
            }`}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.15 },
            }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.15 }}
          >
            <div className="flex items-center gap-5 xl:flex xl:flex-col xl:cursor-pointer">
              <div>
                <img
                  className="w-24 xl:w-32 rounded-lg imgcard"
                  src={product.img}
                  alt={`Imagem do produto ${product.name}`}
                />
              </div>
              <div>
                <h2
                  className={`name-item w-44 font-primary text-lg font-bold ${
                    dataCard?.id === product.id
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
              <div className="flex items-center xl:right-16 xl:bottom-2 absolute h-6 right-5 bottom-2 rounded-md text-white px-2 font-medium bg-green-600">
                R$ {product.price.toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Animação do Botão do Carrinho */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        whileHover={{
          scale: 1,
          transition: { duration: 0.1 },
        }}
        onClick={() => setIsOpenCart(true)}
        className="fixed top-5 right-4 xl:right-64 bg-white shadow-md shadow-zinc-800 cursor-pointer rounded-full flex items-center justify-center text-xl text-black h-12 w-12 hover:bg-green-600 hover:text-white transition-all duration-200"
      >
        <LuShoppingBasket />
        <div className="absolute text-sm flex items-center justify-center text-white -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full">
          <p>{dataRender.length}</p>
        </div>
      </motion.div>
    </>
  );
};
