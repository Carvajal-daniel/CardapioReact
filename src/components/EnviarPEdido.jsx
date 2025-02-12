import imgPoint from '../../public/img/icon/point.png';

export const EnviarPEdido = ({ dataRender, dadosEntrega }) => {
  console.log(dadosEntrega);

  const enviarPedidoWhatsApp = (dadosEntrega, dataRender) => {
    if (!dadosEntrega || !dadosEntrega.logradouro) {
      alert("Endereço de entrega incompleto!");
      return;
    }
  
    const numeroWhatsApp = "+5585921518460"; // Substitua pelo número correto
  
    let mensagem = `📦 *Resumo do Pedido* 📦\n\n`;
  
    mensagem += `🛒 *Itens do Pedido:*\n`;
    dataRender.map((item, index) => {
      mensagem += `  ${index + 1}. ${item.name} - Quantidade: ${item.qtd}\n`;
    });
  
    mensagem += `\n🏠 *Endereço de Entrega:*\n`;
    mensagem += `  ${dadosEntrega.logradouro}, ${dadosEntrega.numero}, ${dadosEntrega.bairro}\n`;
    mensagem += `  ${dadosEntrega.cidade}-${dadosEntrega.estado} / ${dadosEntrega.cep}\n`;
    mensagem += dadosEntrega.complemento ? `  Complemento: ${dadosEntrega.complemento}\n` : "";
  
    mensagem += `\n✅ Pedido pronto para envio!`;
  
    const mensagemEncoded = encodeURIComponent(mensagem);
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemEncoded}`;
  
    window.open(urlWhatsApp, "_blank");
  };
  

  return (
    <div className="text-center">
      <h2 className="font-bold text-xl text-start ml-7">Resumo do pedido</h2>

      <h2 className="mt-5 text-lg font-bold mb-3">Itens do pedido</h2>

      <div className="w-full px-7">
        {dataRender && dataRender.length > 0 ? (
          dataRender.map((item) => (
            <div key={item.id} className="flex mb-1 pb-1 border-b border-zinc-300 items-center justify-between">
              <img className="rounded-lg shadow" width={50} src={item.img} alt={item.name} />
              <h2>{item.name}</h2>
              <span>X{item.qtd}</span>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">Nenhum item no pedido.</p>
        )}
      </div>

      {/* Verifica se há dados de entrega antes de exibir */}
      {dadosEntrega && dadosEntrega.logradouro ? (
        <div className="flex items-center  px-5 justify-center text-left gap-2 mt-5">
          <div >
            <img width={90} src={imgPoint} alt="Ícone de localização" />
          </div>
          <div>
            <h2 className="text-lg leading-5 font-medium ">
              {`${dadosEntrega.logradouro}, ${dadosEntrega.numero}, ${dadosEntrega.bairro}`}
            </h2>
            <h2 className="text-lg font-medium">
              {`${dadosEntrega.cidade}-${dadosEntrega.estado} / ${dadosEntrega.cep}`}
            </h2>
          </div>
        </div>
      ) : (
        <p className="text-zinc-500 mt-5">Endereço de entrega não informado.</p>
      )}

<button 
  onClick={() => enviarPedidoWhatsApp(dadosEntrega, dataRender)}
  className="bg-green-500 text-white px-4 py-2 mt-5 rounded-lg font-bold hover:bg-green-600 transition"
>
  📩 Enviar Pedido via WhatsApp
</button>

    </div>
  );
};
