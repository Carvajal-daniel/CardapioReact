import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import useCart from "../hooks/useCart";
import useOpenModalCard from "../hooks/useModalCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FooterCart } from "./FooterCart";

const classBtnMenos =
  "border cursor-pointer px-[3px] py-[3px] text-lg rounded-lg bg-white shadow border-zinc-200 hover:scale-103";
const classBtnMais =
  "border text-white cursor-pointer px-[3px] py-[3px] text-lg rounded-lg shadow border-zinc-200 hover:scale-103";
const classBtn =
  "border text-white cursor-pointer px-[3px] py-[3px] text-lg rounded-lg bg-red-500 shadow border-zinc-200 hover:scale-103";

export const Cart = () => {
  const { isOpenCart, setIsOpenCart } = useCart();
  const { dataRender, setDataRender } = useOpenModalCard();

  // 🔹 Bloqueia o scroll do fundo quando o carrinho está aberto
  useEffect(() => {
    if (isOpenCart) {
      document.body.style.overflow = "hidden"; // Impede o scroll no fundo
    } else {
      document.body.style.overflow = "auto"; // Permite scroll novamente
    }

    return () => {
      document.body.style.overflow = "auto"; // Garante que o scroll volta ao normal quando desmontar
    };
  }, [isOpenCart]);

  const updateQuantity = (index, amount) => {
    setDataRender((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, qtd: Math.max(1, item.qtd + amount) } : item
      )
    );
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-[#f5f5f5] shadow-lg text-text-primary z-50 transform ${
        isOpenCart ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Botão de Fechar */}
      <button
        onClick={() => setIsOpenCart(false)}
        className="bg-red-500 text-white px-2 py-2 rounded-full absolute top-4 right-4"
      >
        <IoMdClose />
      </button>

      {/* 🔹 Adicionamos `overflow-y-auto` para permitir scroll dentro do carrinho */}
      <div className="p-4 h-[calc(100%-5rem)] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>

        {Array.isArray(dataRender) && dataRender.length > 0 ? (
          dataRender.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full bg-white p-3 mb-2 rounded-lg shadow"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-md"
                />
                <div className="leading-6">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-sm">R$ {item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-[6px]">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className={` ${item.qtd > 1 ? classBtn : classBtnMenos}`}
                  disabled={item.qtd <= 1}
                >
                  <IoIosArrowBack />
                </button>
                <p className="text-sm font-medium">{item.qtd}</p>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className={`bg-green-500 ${item.qtd >= 1 && classBtnMais}`}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        )}
      </div>

      {/* Rodapé fixo do carrinho */}
      <div className="absolute bottom-0 h-36 border w-full bg-white">
        <FooterCart dataRender={dataRender} />
      </div>
    </div>
  );
};
