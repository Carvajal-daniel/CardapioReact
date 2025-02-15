import { useEffect } from "react";
import { FaMotorcycle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

export const FooterCart = ({ dataRender, setEtapa, etapa, dadosEntrega, setTotalApagar }) => {
  const totalPrice = dataRender.reduce((acc, item) => acc + item.price * item.qtd, 0);
  const taxa = 7.50;

  useEffect(() => {
    setTotalApagar(totalPrice);
  }, [totalPrice, setTotalApagar]);

  const enviarPedidoWhatsApp = (dadosEntrega, dataRender) => {
    if (!dadosEntrega || !dadosEntrega.logradouro) {
      alert("Endereço de entrega incompleto!");
      return;
    }
  
    const numeroWhatsApp = "+5585921518460"; // Substitua pelo número correto
  
    let mensagem = `📦 *Resumo do Pedido* 📦\n\n`;
  
    mensagem += `🛒 *Itens do Pedido:*\n`;
    dataRender.forEach((item, index) => {
      mensagem += `  ${index + 1}. ${item.name} - Quantidade: ${item.qtd}\n`;
    });
  
    mensagem += `\n🏠 *Endereço de Entrega:*\n`;
    mensagem += `  ${dadosEntrega.logradouro}, ${dadosEntrega.numero}, ${dadosEntrega.bairro}\n`;
    mensagem += `  ${dadosEntrega.cidade}-${dadosEntrega.estado} / ${dadosEntrega.cep}\n`;
    mensagem += dadosEntrega.complemento ? `  Complemento: ${dadosEntrega.complemento}\n` : "";
  
    // Adiciona a forma de pagamento
    mensagem += `\n💳 *Forma de Pagamento:* ${dadosEntrega.formaPagamento || "Não informado"}\n`;
  
    if (dadosEntrega.formaPagamento === "dinheiro" && dadosEntrega.trocoPara) {
      const troco = parseFloat(dadosEntrega.trocoPara);
      if (!isNaN(troco)) {
        mensagem += `💰 *Troco para:* R$ ${troco.toFixed(2)}\n`;
      }
    }
  
    mensagem += `\n✅ Pedido pronto para envio!`;
  
    const mensagemEncoded = encodeURIComponent(mensagem);
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemEncoded}`;
  
    localStorage.clear();
    setEtapa(0);
    window.open(urlWhatsApp, "_blank");
  };
  
  

  return (
    <div className="flex flex-col mb-5 p-4 bg-white shadow-md rounded-lg">
      {/* Subtotal */}
      <div className="flex -mt-5 gap-2 justify-end font-medium text-zinc-700">
        <h2 className="text-lg">SubTotal:</h2>
        <span className="text-zinc-900 font-semibold">R$ {totalPrice.toFixed(2)}</span>
      </div>

      {/* Taxa de Entrega (condicional) */}
      {dataRender.length > 0 && (
        <div className="flex justify-end gap-2 text-zinc-500 font-medium text-lg">
          <div className="flex items-center gap-1">
            <FaMotorcycle className="text-green-500 text-2xl" />
            <span>Entrega:</span>
          </div>
          <span className="text-zinc-700">R$ {parseFloat(taxa).toFixed(2)}</span>
          
        </div>
      )}

      {/* Total */}
      <div className="flex items-center justify-between w-full border-t pt-3 mt-2 border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-900">Total:</h2>
        <span className="text-emerald-500 text-2xl font-bold">
          R$ {(totalPrice + (dataRender.length > 0 ? taxa : 0)).toFixed(2)}
        </span>
      </div>

 
      {/* Botões */}
      <div className={`${etapa === 2 ? "hidden justify-center items-center gap-3 mt-3 w-full" : 'flex'}`}>
        <button
          onClick={() => etapa >= 1 && dataRender.length > 0 ? setEtapa(prev => prev + 1) : alert('Seu carrinho está vazio')}
          className={`${etapa >= 3 ? 'hidden' : "cursor-pointer mt-2 bg-green-500 shadow-lg px-6 py-2 rounded-lg text-white font-medium hover:bg-green-600 transition"}`}>
          Continuar
        </button>
        {etapa === 4 && (
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => enviarPedidoWhatsApp(dadosEntrega, dataRender)}
              className="cursor-pointer bg-green-500 text-white px-4 py-2 mt-5 rounded-lg font-bold hover:bg-green-600 transition"
            >
              📩 Enviar Pedido via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};