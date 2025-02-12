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
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpenModal]);

  return (
    <>
      {/* Animação do Menu */}
      <motion.div
        className="xl:grid xl:grid-cols-4 xl:gap-x gap-y-2 relative bg-[#f5f5f5] xl:w-[980px] space-y-1 mx-auto xl:px-8"
        initial={{ opacity: 0, y: 50 }}  // Define a opacidade inicial e a posição
        animate={{ opacity: 1, y: 0 }}   // Anima para opacidade 1 e posição normal
        transition={{ ease: "easeOut", duration: 0.8 }}  // Duração de 0.8 segundos
      >
        {dados[nameProduct]?.map((product, index) => (
          <motion.div
            key={product.id}
            onClick={() => handleClick(product)}
            className={`mx-2 xl:h-70 xl:flex xl:flex-col xl:text-center xl:items-center bg-white shadow relative cursor-pointer ${dataCard?.id === product.id ? class2 : class1}`}
            whileHover={{
              scale: 1.03,  // Aumenta um pouco a escala quando hover
              transition: { duration: 0.2 }  // Transição mais rápida
            }}
            initial={{ opacity: 0, y: 30 }}  // Animação inicial dos cards
            animate={{ opacity: 1, y: 0 }}   // Animação de chegada para os cards
            transition={{ delay: 0.2, duration: 0.2 }}  // Delay para iniciar a animação dos cards
          >
            <div className="flex items-center gap-3 xl:flex xl:flex-col xl:cursor-pointer">
              <div>
                <img className="w-24 xl:w-32 rounded-lg imgcard" src={product.img} alt={`Imagem do produto ${product.name}`} />
              </div>
              <div>
                <h2 className={`name-item w-44 font-primary text-lg font-bold ${dataCard?.id === product.id ? "uppercase text-black" : "uppercase font-bold text-text-primary"}`}>
                  {product.name}
                </h2>
                <p className="text-sm xl:w-full text-text-secondary font-secondary w-50">{product.dsc}</p>
              </div>
              <div className="flex items-center xl:right-16 xl:bottom-4 absolute h-6 right-5 bottom-2 rounded-md text-white px-2 font-medium bg-green-600">
                R$ {product.price.toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Animação do Botão do Carrinho */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}   // Animação inicial (invisível e pequeno)
        animate={{ opacity: 1, scale: 1 }}     // Animação de chegada (visível e tamanho normal)
        transition={{ delay: 0.2, duration: .1 }} // Tempo de delay e duração da animação
        whileHover={{
          scale: 1.1,  // Aumenta a escala quando hover
          transition: { duration: 0.2 }  // Transição rápida para o hover
        }}
        onClick={() => setIsOpenCart(true)}
        className="fixed bottom-4 right-4 xl:right-64 bg-[#1b1b1b] shadow-md shadow-zinc-800 cursor-pointer rounded-full flex items-center justify-center text-xl text-white h-12 w-12 hover:bg-mint-500 hover:text-white transition-all duration-300"
      >
        <LuShoppingBasket />
        <div className="absolute text-sm flex items-center justify-center text-white -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full">
          <p>{dataRender.length}</p>
        </div>
      </motion.div>
    </>
  );
};
