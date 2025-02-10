import { useState, useEffect } from "react";
import { useProduct } from "../hooks/useCardProduct";
import dados from "../mocks/dados2.json";
import useOpenModal from "../hooks/useModalCard";
import { motion, AnimatePresence } from "framer-motion";
import { LuShoppingBasket } from "react-icons/lu";
import useModalCard from '../hooks/useModalCard'
import useCart from '../hooks/useCart'



const class1 = "flex space-x-6 h-30 rounded-2xl px-3 py-3 ";
const class2 = "flex space-x-6 bg-white h-30 shadow-md rounded-2xl px-2 py-3  border-b-1 border-green-500";

export const CardItem = () => {
  const { setIsOpenModal, setDataCard, isOpenModal } = useOpenModal();
  const { nameProduct } = useProduct();
  const [selectedItem, setSelectedItem] = useState(null);
  const { dataRender } = useModalCard()
  const { isOpenCart, setIsOpenCart } = useCart()

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
      className=" relative bg-[#f5f5f5] xl:w-[980px] space-y-1 mx-auto xl:px-8"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: .8 }}
    >
      {dados[nameProduct].map((product, index) => (
        <motion.div
          key={product.id}
          onClick={() => handleClick(product)}
          className={` mx-2 bg-white px-4 shadow relative cursor-pointer ${selectedItem?.id === product.id ? class2 : class1
            }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.3,
            duration: 0.4, // Duração da animação
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
              className={`name-item w-40 font-primary text-lg font-bold ${selectedItem?.id === product.id
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


          <div className="flex items-center absolute h-6 right-5 bottom-2 rounded-md text-white px-2 font-medium bg-green-600 ">
            R$ {product.price.toFixed(2)}
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          delay: .6,
          duration: 1, // Duração da animação
          ease: "easeOut",
        }}
        onClick={() => setIsOpenCart(true)}
        className=" bottom-4 right-1 fixed h-12 w-12 xl:right-64 bg-[#1b1b1b] shadow-md shadow-zinc-800  cursor-pointer rounded-full flex xl:mt-[3%] xl:mr-[5%] items-center justify-center text-xl text-white mt-4 mr-4 hover:bg-mint-500 hover:text-white transition-all duration-300">
        <LuShoppingBasket />

        <div className="absolute text-sm flex items-center justify-center text-white -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full">
          <p>{dataRender.length}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
