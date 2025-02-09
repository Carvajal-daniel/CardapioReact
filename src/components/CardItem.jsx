import { useState, useEffect } from "react";
import { useProduct } from "../hooks/useCardProduct";
import dados from "../mocks/dados2.json";
import useOpenModal from "../hooks/useModalCard";

const class1 = "flex space-x-6 h-30 rounded-2xl px-3 py-3 border-zinc-700";
const class2 = "flex space-x-6 bg-white h-30 shadow-md rounded-2xl px-3 py-3 border-zinc-700";

export const CardItem = () => {
  const { setIsOpenModal, setDataCard, isOpenModal } = useOpenModal();
  const { nameProduct } = useProduct();
  const [selectedItem, setSelectedItem] = useState(null); 

  function handleClick(product) {
    setSelectedItem(product); 
    setDataCard(product); 
    setIsOpenModal(false); 
  }

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isOpenModal]);


  

  return (
    <div className="bg-[#f5f5f5]  xl:w-[980px] space-y-1 mx-auto xl:px-8">
      {dados[nameProduct].map((product) => (
        <div
          key={product.id}
          onClick={() => handleClick(product)}
          className={`mx-2 relative cursor-pointer flex justify-center  ${
            selectedItem?.id === product.id ? class2 : class1
          }`}
        >
          <div>
            <img className="w-24 rounded-lg imgcard" src={product.img} alt={product.name} />
          </div>

          <div>
            <h2
              className={`name-item w-40 font-primary text-lg font-bold ${
                selectedItem?.id === product.id ? "uppercase text-black" : "uppercase font-bold text-text-primary"
              }`}
            >
              {product.name}
            </h2>
            <p className="text-sm xl:w-full text-text-secondary font-secondary w-50">{product.dsc}</p>
          </div>

          <div className="flex items-center absolute h-6 right-5 bottom-2 rounded-md text-text-primary px-2 font-medium bg-mint-500">
            R$ {product.price.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};
