import imgPoint from '../../public/img/icon/point.png';

export const EnviarPEdido = ({dataRender, dadosEntrega }) => {

  return (
    <div className=" text-center h-[68%] pb-10 md:h-[350px] xl:h-[80%] overflow-auto">
      <h2 className="font-bold text-xl text-center py-3 border-b border-zinc-300 mb-2">Resumo do pedido</h2>

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
          <div>
            <img width={90} src={imgPoint} alt="Ícone de localização" />
          </div>
          <div>
            <h2 className="text-lg leading-5 font-medium">
              {`${dadosEntrega.logradouro}, ${dadosEntrega.numero}, ${dadosEntrega.bairro}`}
            </h2>
            <h2 className="text-lg font-medium">
              {`${dadosEntrega.cidade}-${dadosEntrega.estado} / ${dadosEntrega.cep}`}
            </h2>
            <h2 className="text-lg font-medium">
             
          <p>Pagamento: {dadosEntrega.formaPagamento}</p>
            </h2>

          </div>
        </div>
      ) : (
        <p className="text-zinc-500 mt-5">Endereço de entrega não informado.</p>
      )}

     
    </div>
  );
};
