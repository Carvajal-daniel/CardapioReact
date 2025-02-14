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
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  function handleClick(product) {
    setDataCard(product);
    setIsOpenModal(true);
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  }

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  return (
    <>
      <motion.div
        className="xl:grid xl:grid-cols-4 md:px-6 gap-y-2 relative bg-[#f5f5f5] xl:w-[990px] space-y-1 mx-auto xl:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.4 }}
      >
        {dados[nameProduct]?.map((product, index) => (
          <motion.div
            key={product.id}
            onClick={() => handleClick(product)}
            className={`mx-2 xl:h-80 xl:flex xl:flex-col xl:text-center xl:items-center bg-white shadow relative mb-2 cursor-pointer ${
              dataCard?.id === product.id ? class2 : class1
            }`}
            whileHover={{
              scale: window.innerWidth >= 1024 ? 1.03 : .8,
              transition: { duration: 0.15 },
            }}
            initial={{ opacity: 0, y: 20, }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.15 }}
          >
            <div className="flex xl:gap-6 items-center gap-2 xl:flex xl:flex-col xl:cursor-pointer">
              <div>
                <img
                  className="w-24 xl:w-36 rounded-lg imgcard"
                  src={product.img}
                  alt={`Imagem do produto ${product.name}`}
                />
              </div>
              <div>
                <h2
                  className={`w-44 font-primary text-lg font-bold ${
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
              <div className="flex  items-center xl:right-16 xl:bottom-4 absolute h-6 right-5 bottom-2 rounded-md text-white px-2 font-medium bg-green-600">
                R$ {product.price.toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {dataRender.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          whileHover={{
            scale: window.innerWidth >= 1024 ? 1.05 : 1.02,
            transition: { duration: 0.1 },
          }}
          onClick={() => setIsOpenCart(true)}
          className="fixed bottom-7 right-9 xl:right-[22%] xl:bottom-8 xl:z-40 bg-white shadow-md shadow-zinc-800 cursor-pointer rounded-full flex items-center justify-center text-xl text-black h-12 w-12 hover:bg-green-600 hover:text-white transition-all duration-200"
        >
          <LuShoppingBasket />
          <div className="absolute text-sm flex items-center justify-center text-white -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full">
            <p>{dataRender.length}</p>
          </div>
        </motion.div>
      )}
    </>
  );
};
