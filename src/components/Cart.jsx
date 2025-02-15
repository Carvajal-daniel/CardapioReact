import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCart from "../hooks/useCart";
import useOpenModalCard from "../hooks/useModalCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FooterCart } from "./FooterCart";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CepCart } from "./CepCart";
import { EnviarPEdido } from "./EnviarPEdido";
import { FormaPagamento } from "./FormaPagamento";

const STORAGE_KEY = "cartItems";

const classBtnMenos =
  "border cursor-pointer px-3 py-2 text-lg rounded-lg bg-white shadow border-zinc-200 hover:scale-105 active:scale-95 transition";
const classBtnMais =
  "border text-white cursor-pointer px-3 py-2 text-lg rounded-lg shadow bg-green-500 border-zinc-200 hover:scale-105 active:scale-95 transition hover:bg-green-600";
const classBtn =
  "border text-white cursor-pointer px-3 py-2 text-lg rounded-lg bg-red-500 shadow border-zinc-200 hover:scale-105 active:scale-95 transition hover:bg-red-600";

export const Cart = () => {
  const { isOpenCart, setIsOpenCart } = useCart();
  const { dataRender, setDataRender } = useOpenModalCard();
  const [etapa, setEtapa] = useState(1);
  const [dadosEntrega, setDadosEntrega] = useState();
  const [totalPagar, setTotalApagar] = useState();
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (isOpenCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenCart]);

  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      setDataRender(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (dataRender.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataRender));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [dataRender]);

  useEffect(() => {
    if (etapa === 0) {
      setIsOpenCart(false);
      localStorage.clear();
    }
  }, [etapa, setIsOpenCart]);

  const updateQuantity = (index, amount) => {
    setDataRender((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, qtd: Math.max(1, item.qtd + amount) } : item
      )
    );
  };

  function handleClear(id) {
    setDataRender((prevData) => prevData.filter((item) => item.id !== id));
  }

  return (
    <>
      {alertVisible && (
        <div className="w-60 absolute z-50 right-1/2 bottom-3 transform xl:-translate-x-1/2 bg-green-500 text-white text-center py-2 px-4 rounded-md shadow-md">
          <p className="text-sm">Item adicionado ao carrinho!</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isOpenCart && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-100 shadow-lg text-text-primary z-50"
          >
            <div>
              <div className="shadow-lg border-b border-zinc-200 bg-white h-16 flex items-center justify-between px-4">
                <button
                  onClick={() => setEtapa(1)}
                  className="text-xl bg-white border-1 shadow border-zinc-200 px-3 py-2 rounded font-medium"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={() => {
                    setIsOpenCart(false);
                    setEtapa((prev) => prev + 1);
                  }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  <IoMdClose size={22} />
                </button>
              </div>

              {/* Conteúdo do Carrinho */}
              <div className="h-[100vh] p-4 pb-80 xl:h-[750px] md:h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100">
                {Array.isArray(dataRender) && dataRender.length > 0 ? (
                  dataRender.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex justify-between items-center w-full bg-white p-3 mb-3 rounded-lg shadow"
                    >
                      <div className="flex gap-3 flex-1">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 rounded-md"
                        />
                        <div className="leading-4">
                          <h3 className="text-md font-semibold">{item.name}</h3>
                          <p className="text-sm text-zinc-600 mt-1">R$ {item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => updateQuantity(index, -1)}
                            className={`${item.qtd > 1 ? classBtn : classBtnMenos} ${item.qtd <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={item.qtd <= 1}
                          >
                            <IoIosArrowBack />
                          </button>
                          <p className="text-sm font-medium">{item.qtd}</p>
                          <button onClick={() => updateQuantity(index, 1)} className={classBtnMais}>
                            <IoIosArrowForward />
                          </button>
                        </div>
                        <button
                          onClick={() => handleClear(item.id)}
                          className="text-red-500 text-lg cursor-pointer hover:text-red-600 transition"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Seu carrinho está vazio.</p>
                )}
              </div>

              {/* CEP e Envio */}
              {etapa === 2 && (
                <div className="absolute top-12 right-0 inset-0">
                  <CepCart setEtapa={setEtapa} setDadosEntrega={setDadosEntrega} />
                </div>
              )}
              {etapa === 3 && (
                <div className="absolute top-14 min-h-10 right-0 inset-0">
                  <FormaPagamento totalPagar={totalPagar} setEtapa={setEtapa} setDadosEntrega={setDadosEntrega} />
                </div>
              )}

              {etapa === 4 && (
                <div className="absolute top-16 bg-white inset-0">
                  <EnviarPEdido setEtapa={setEtapa} dataRender={dataRender} dadosEntrega={dadosEntrega} />
                </div>
              )}

              {/* Footer */}
              <div className="absolute bottom-0 w-full bg-white border-t shadow-md">
                <FooterCart dadosEntrega={dadosEntrega} dataRender={dataRender} setEtapa={setEtapa} etapa={etapa} setTotalApagar={setTotalApagar} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
