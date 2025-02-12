import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

export const CepCart = ({ etapa, setEtapa, setDadosEntrega }) => {
  const [dataCep, setDataCep] = useState({});
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Busca o CEP quando clicado
  const handleSearchCep = () => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setDataCep(data);
          } else {
            alert("CEP não encontrado!");
          }
        })
        .catch((error) => console.error("Erro ao buscar o CEP:", error));
    } else {
      alert("Digite um CEP válido (8 dígitos)");
    }
  };

  // Verifica se todos os campos estão preenchidos
  useEffect(() => {
    if (dataCep.logradouro && dataCep.bairro && dataCep.localidade && dataCep.uf && numero) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [dataCep, numero]);

  // Função para salvar os dados do endereço e avançar etapa
  const handleContinuar = () => {
    if (isComplete) {
      const enderecoCompleto = {
        cep,
        logradouro: dataCep.logradouro,
        bairro: dataCep.bairro,
        numero,
        cidade: dataCep.localidade,
        estado: dataCep.uf,
        complemento,
      };

      setEtapa(prev => prev + 1);
      setDadosEntrega(enderecoCompleto);
    }
  };

  return (
   
    <div className="bg-white leading-7 p-4 mt-5 text-amber-950 rounded-lg max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300">
      <div className="mb-3">
        <h2 className="font-bold">Digite seu CEP</h2>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Ex: 01001000"
            className="border border-zinc-300 shadow-lg outline-none bg-white px-2 py-2 rounded-xl w-full"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button
            onClick={handleSearchCep}
            className="bg-blue-500 text-white flex items-center justify-center w-12 p-2 rounded-md hover:bg-blue-600 transition"
          >
            <CiSearch size={25} />
          </button>
        </div>
      </div>

      {dataCep.logradouro && (
        <>
          <div className="mb-3">
            <h2 className="font-bold">Endereço:</h2>
            <input
              type="text"
              className="border outline-none border-zinc-300 shadow-lg bg-white px-2 py-2 rounded-xl w-full"
              value={dataCep.logradouro || ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold">Bairro:</h2>
            <input
              type="text"
              className="border outline-none border-zinc-300 shadow-lg bg-white px-2 py-2 rounded-xl w-full"
              value={dataCep.bairro || ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold">Número:</h2>
            <input
              type="number"
              className="border outline-none border-zinc-300 shadow-lg bg-white px-2 py-2 rounded-xl w-full"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold">Cidade:</h2>
            <input
              type="text"
              className="border outline-none border-zinc-300 shadow-lg bg-white px-2 py-2 rounded-xl w-full"
              value={`${dataCep.localidade || ""} / ${dataCep.uf || ""}`}
              readOnly
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold">Complemento:</h2>
            <input
              type="text"
              className="border outline-none border-zinc-300 shadow-lg bg-white px-2 py-2 rounded-xl w-full"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>

          {/* Botão para avançar a etapa */}
          <button
            className={`w-full p-3 mt-2 rounded-xl text-white font-bold transition ${
              isComplete ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleContinuar}
            disabled={!isComplete}
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
};
