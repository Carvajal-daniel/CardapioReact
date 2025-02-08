import { useState } from "react";
import { useProduct } from "../hooks/useCardProduct";
import dados from '../mocks/dados2.json'

const class1 = 'flex space-x-6 h-30 rounded-2xl px-3 py-3 border-zinc-700 mt-3 '

const class2 = 'flex space-x-6 bg-amber-500 h-30  rounded-2xl px-3 border-b py-3 border-zinc-700 mt-3  '

export const CardItem = () => {

  
  const { nameProduct } = useProduct();
  const [itemBg, setItemBg] = useState()
  
 
  
  return (
    <div>
      {
        dados[nameProduct].map((product, index) => (
          <div key={product.id} 
          onClick={() =>setItemBg(product.id)}
          className={` flex  ${itemBg == product.id  ? class2 : class1}`}>

            <div>
              <img className="w-24 rounded-2xl " src={product.img} alt={product.name} />
            </div>

            <div>
              <h2 className={`${itemBg === product.id ? 'uppercase font-bold text-black tracking-wide' : 'uppercase font-bold  text-mint-500 tracking-wide'}`}>{product.name}</h2>
              <p className="text-sm w-60">{product.dsc}</p>

              <div className="flex absolute right-5 -mt-2 rounded-md text-black px-3 justify-end font-medium bg-mint-500">
                R$ {product.price.toFixed(2)}
              </div>
            </div>

          </div>
        ))
      }
    </div>
  );
};
