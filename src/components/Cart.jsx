import useCart from "../hooks/useCart";
import useOpenModalCard from "../hooks/useModalCard";

export const Cart = () => {
  const { isOpenCart, setIsOpenCart } = useCart();
  const { dataRender } = useOpenModalCard();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-[#f5f5f5] shadow-lg text-text-primary z-50 transform ${isOpenCart ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
    >
      {/* Botão de Fechar */}
      <button
        onClick={() => setIsOpenCart(false)}
        className="bg-mint-500 text-white px-3 py-1 rounded-full absolute top-4 right-4"
      >
        X
      </button>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>


        {
          dataRender.length > 0 ? dataRender.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-3 mb-2 rounded-lg shadow"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-md font-semibold">{item.name}</h3>
                <p className="text-sm">R$ {item.price.toFixed(2)}</p>
                <p className="text-sm">Qtd: {item.qtd}</p>
              </div>
            </div>
          )
          )
            : <p className="text-gray-500">Seu carrinho está vazio.</p>}
      </div>
    </div>
  );
};

