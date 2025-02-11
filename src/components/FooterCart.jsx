import { FaMotorcycle } from "react-icons/fa";


export const FooterCart = ({dataRender}) => {
  
  const totalPrice = dataRender.reduce((acc, item) => acc + item.price * item.qtd, 0);
  const taxa =  7.50 

  console.log(totalPrice);
  

  return (
    <div className="flex flex-col items-end mr-3 mt-2">
      <div className="flex gap-2 font-medium">
        <h2 className="text-lg text-black">SubTotal:</h2>
        <span>R$ 99</span>
      </div>

      <div className="flex items-center gap-2  text-zinc-400 font-medium text-lg">
        <div className="flex items-center gap-1">
          <FaMotorcycle />
          Entrega:
        </div>
        <span>
          R$ 7,49
        </span>
      </div>

      <div className="flex text-2xl items-center gap-2">
        <h2 className="text-text-primary font-medium">Total:</h2>
        <span className="text-mint-500">R$ {totalPrice + taxa }</span>
      </div>
      <div className='flex items-center gap-3 mt-2'>
        <button className='bg-white shadow px-4 rounded py-1'>Voltar</button>
        <button className='bg-green-500 shadow-lg px-4 rounded text-white font-medium py-1'>Continuar</button>
      </div>
    </div>
  )
}
