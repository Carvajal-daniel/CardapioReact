import { useState } from "react";
import { useProduct } from "../hooks/useCardProduct";
import dados from '../mocks/dados2.json'

const class1 = 'flex space-x-6 h-30 rounded-2xl px-3 py-3 border-zinc-700  '

const class2 = 'flex space-x-6 bg-white  h-30 shadow-md rounded-2xl px-3  py-3 border-zinc-700  '

export const CardItem = () => {

  
  const { nameProduct } = useProduct();
  const [itemBg, setItemBg] = useState()
  
 
  
  return (
    <div className="bg-[#f5f5f5] xl:w-[980px] mx-auto xl:px-8 ">
      {
        dados[nameProduct].map((product, index) => (
          <div key={product.id} 
          onClick={() =>setItemBg(product.id)}
          className={`  mx-2 cursor-pointer flex relative transform l ${itemBg == product.id  ? class2 : class1}`}>

            <div>
              <img className="w-24 rounded-2xl " src={product.img} alt={product.name} />
            </div>

            <div>
              <h2 className={` font-primary text-xl  font-bold ${itemBg === product.id ? 'uppercase text-black' : 'uppercase font-bold  text-text-primary '}`}>{product.name}</h2>
              <p className="text-sm text-text-secondary font-secondary w-60">{product.dsc}</p>

              <div className="flex absolute right-5 bottom-2 rounded-md text-black px-3 justify-end font-medium bg-mint-500">
                R$ {product.price.toFixed(2)}
              </div>
            </div>

          </div>
        ))
      }
    </div>
  );
};
