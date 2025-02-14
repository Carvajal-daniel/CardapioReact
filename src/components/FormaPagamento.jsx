import React, { useState } from 'react';

export const FormaPagamento = ({ totalPagar, setEtapa }) => {
  const [formaPagamento, setFormaPagamento] = useState('');
  const [troco, setTroco] = useState('');
  const [erroTroco, setErroTroco] = useState(false);

  const taxa = 7.5

  const handleFormaPagamentoChange = (event) => {
    setFormaPagamento(event.target.value);
    setTroco(''); 
    setErroTroco(false); 
  };

  const handleTrocoChange = (event) => {
    setTroco(event.target.value);
    setErroTroco(false); 
  };

  const verificarTroco = () => {
    if (parseFloat(troco) < totalPagar + taxa) {
      setErroTroco(true);
    } else {
      setErroTroco(false);
    }
  };

  const handleContinuar = () => {
    if (formaPagamento === 'dinheiro' && !troco) {
      alert('Por favor, insira o valor do troco para continuar.');
      return; 
    }

    setEtapa(prev => prev + 1);
  };

  const podeContinuar = () => {
    if (formaPagamento === 'dinheiro') {
      return troco && !erroTroco;
    }
    return formaPagamento !== ''; 
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Escolha a forma de pagamento</h3>

      <div className="mb-4">
        <select
          onChange={handleFormaPagamentoChange}
          value={formaPagamento}
          className="w-full cursor-pointer p-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecione</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
          <option value="pix">PIX</option>
        </select>
      </div>

      {formaPagamento === 'dinheiro' && (
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Quer troco?</label>
          <input
            type="number"
            placeholder="Valor do troco"
            value={troco}
            onChange={handleTrocoChange}
            onBlur={verificarTroco}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {erroTroco && <p className="text-red-500 mt-2">O valor do troco é insuficiente!</p>}
        </div>
      )}

      <div className="mb-4">
        <p className="text-lg font-medium">Valor Total a Pagar: R${totalPagar + taxa}</p>
      </div>

      <div className="text-center">
        <button
          onClick={handleContinuar}
          className="px-6 cursor-pointer py-2 bg-green-500 text-white rounded-md hover:bg-orange-600"
          disabled={!podeContinuar()} // Desabilitado até as condições serem atendidas
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
