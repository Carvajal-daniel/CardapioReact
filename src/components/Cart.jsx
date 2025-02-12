import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCart from "../hooks/useCart";
import useOpenModalCard from "../hooks/useModalCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FooterCart } from "./FooterCart";
import { FaRegTrashAlt } from "react-icons/fa";
import { CepCart } from "./CepCart";
import { EnviarPEdido } from "./EnviarPEdido";

// Classes dos botões de quantidade e remover
const classBtnMenos =
  "border cursor-pointer px-[3px] py-[3px] text-lg rounded-lg bg-white shadow border-zinc-200 hover:scale-105 active:scale-95 transition";
const classBtnMais =
  "border text-white cursor-pointer px-[3px] py-[3px] text-lg rounded-lg shadow bg-green-500 border-zinc-200 hover:scale-105 active:scale-95 transition hover:bg-green-600";
const classBtn =
  "border text-white cursor-pointer px-[3px] py-[3px] text-lg rounded-lg bg-red-500 shadow border-zinc-200 hover:scale-105 active:scale-95 transition hover:bg-red-600";

export const Cart = () => {
  const { isOpenCart, setIsOpenCart } = useCart();
  const { dataRender, setDataRender } = useOpenModalCard();
  const [etapa, setEtapa] = useState(1);
  const [dadosEntrega, setDadosEntrega] = useState()

 

  

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
    <div
      className={`fixed top-0 right-0 h-full w-[90%] max-w-sm bg-zinc-100 shadow-lg text-text-primary z-50 transform ${isOpenCart ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
    >
      {/* Botão de Fechar */}
      <button
        onClick={() => setIsOpenCart(false)}
        className="bg-red-500 text-white p-2 rounded-full absolute top-4 right-4 hover:bg-red-600 transition"
      >
        <IoMdClose size={20} />
      </button>


        <button
          onClick={() => setEtapa(prev => prev - 1)}
          className={`${etapa === 1 ? 'hidden' : " mt-[19px] shadow shadow-green-500 ml-4 border border-zinc-300 text-zinc-600 bg-white  px-4 py-2 rounded-lg hover:bg-zinc-100 transition"}`}>
          <IoIosArrowBack />
        </button>
      {/* Conteúdo do Carrinho */}
      <div className="  p-4 h-[calc(100%-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100">
        <h2 className={`${etapa === 2 ? 'hidden' : "text-xl font-bold mb-4"}`}>Carrinho</h2>

        {Array.isArray(dataRender) && dataRender.length > 0 ? (
          dataRender.map((item, index) => (
            <div
              key={index}
              className="relative flex justify-between items-center w-full bg-white p-3 mb-2 rounded-lg shadow"
            >
              <div className="flex gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-md"
                />
                <div className="leading-4">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-sm text-zinc-600 mt-1">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Botões de Quantidade e Remover */}
              <div className="flex items-center gap-3">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className={`${item.qtd > 1 ? classBtn : classBtnMenos} ${item.qtd <= 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    disabled={item.qtd <= 1}
                  >
                    <IoIosArrowBack />
                  </button>
                  <p className="text-sm font-medium">{item.qtd}</p>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className={classBtnMais}
                  >
                    <IoIosArrowForward />
                  </button>
                </div>

                {/* Botão de Remover */}
                <button
                  onClick={() => handleClear(item.id)}
                  className="text-red-500 text-lg hover:text-red-600 transition"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        )}

        {/* Exibir etapa 2 (CEP) */}
        {etapa === 2 && (
          <div className="absolute top-15 inset-0 bg-white p-4 shadow-lg">
            <CepCart setDadosEntrega={setDadosEntrega} etapa={etapa} setEtapa={setEtapa} />
          </div>
        )}
      </div>

      {
        etapa === 3 && <div className="bg-zinc-100  absolute top-15 inset-0">
        <EnviarPEdido dataRender={dataRender} dadosEntrega={dadosEntrega}/>
      </div>
      }

      {/* Rodapé fixo do carrinho */}
      <div className="absolute bottom-0 w-full bg-white border-t shadow-md">
        <FooterCart dataRender={dataRender} setEtapa={setEtapa} etapa={etapa} />
      </div>
    </div>
  );
};
