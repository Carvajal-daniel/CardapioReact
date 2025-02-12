import { FaMotorcycle } from "react-icons/fa";

export const FooterCart = ({ dataRender, setEtapa, etapa }) => {
  const totalPrice = dataRender.reduce((acc, item) => acc + item.price * item.qtd, 0);
  const taxa = 7.50;
console.log(dataRender);



  return (
    <div className="flex flex-col items-end p-4 bg-white shadow-md rounded-lg ">
      {/* Subtotal */}
      <div className="flex gap-2 font-medium text-zinc-700">
        <h2 className="text-lg">SubTotal:</h2>
        <span className="text-zinc-900 font-semibold">R$ {totalPrice.toFixed(2)}</span>
      </div>

      {/* Taxa de Entrega */}
      <div className="flex items-center gap-2 text-zinc-500 font-medium text-lg">
        <div className="flex items-center gap-1">
          <FaMotorcycle className="text-green-500 text-2xl" />
          <span>Entrega:</span>
        </div>
        <span className="text-zinc-700">R$ {taxa.toFixed(2)}</span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between w-full border-t pt-3 mt-2 border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-900">Total:</h2>
        <span className="text-emerald-500 text-2xl font-bold">R$ {(totalPrice + taxa).toFixed(2)}</span>
      </div>


      {/* Botões */}
      <div className={`${etapa === 2 ? " hidden justify-center items-center gap-3 mt-3 w-full" : 'flex'}`}>
       
        <button
          onClick={() => etapa >= 1  &&  setEtapa( prev => prev + 1)}
          className={`${etapa >= 3 ? 'hidden' : "mt-2 bg-green-500 shadow-lg px-6 py-2 rounded-lg text-white font-medium hover:bg-green-600 transition"}`}>
          Continuar
        </button>

        <button
          className={`${etapa === 1 ? 'hidden' : " mt-2 bg-green-500 shadow-lg px-6 py-2 rounded-lg text-white font-medium hover:bg-green-600 transition"}`}>
          Enviar pedido
        </button>
      </div>
    </div>
  );
};
