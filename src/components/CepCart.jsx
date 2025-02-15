import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

export const CepCart = ({ etapa, setEtapa, setDadosEntrega }) => {
  const [dataCep, setDataCep] = useState({});
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  // Carregar endereço salvo e carrinho do localStorage
  useEffect(() => {
    const enderecoSalvo = JSON.parse(localStorage.getItem("enderecoEntrega"));
    if (enderecoSalvo) {
      setCep(enderecoSalvo.cep || "");
      setDataCep({
        logradouro: enderecoSalvo.logradouro || "",
        bairro: enderecoSalvo.bairro || "",
        localidade: enderecoSalvo.cidade || "",
        uf: enderecoSalvo.estado || "",
      });
      setNumero(enderecoSalvo.numero || "");
      setComplemento(enderecoSalvo.complemento || "");
    }

    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoSalvo);
  }, []);

  // Salva o CEP no localStorage sempre que ele for alterado
  useEffect(() => {
    if (cep.length === 8) {
      localStorage.setItem("cep", cep);
    }
  }, [cep]);

  // Quando busca o CEP, já salva os dados no localStorage
  const handleSearchCep = () => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setDataCep(data);
            localStorage.setItem("enderecoEntrega", JSON.stringify({
              cep,
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
              numero,
              complemento,
            }));
          } else {
            alert("CEP não encontrado!");
          }
        })
        .catch((error) => console.error("Erro ao buscar o CEP:", error));
    } else {
      alert("Digite um CEP válido (8 dígitos)");
    }
  };

  // Verifica se todos os campos obrigatórios foram preenchidos
  useEffect(() => {
    setIsComplete(!!(dataCep.logradouro && dataCep.bairro && dataCep.localidade && dataCep.uf && numero));
  }, [dataCep, numero]);

  // Salva os dados no localStorage e avança para a próxima etapa
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

      localStorage.setItem("enderecoEntrega", JSON.stringify(enderecoCompleto));
      setEtapa((prev) => prev + 1);
      setDadosEntrega(enderecoCompleto);
    }
  };

  return (
    <div className="bg-white h-[400px] md:h-[450px] xl:h-[780px] p-4 mt-4 text-amber-950 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100">

      <div className="mb-2">
        <h2 className="font-bold mb-1 text-lg">Digite seu CEP</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ex: 01001000"
            className="border border-zinc-300 shadow-md outline-none bg-white px-3 py-2 rounded-lg w-full"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
          />
          <button
            onClick={handleSearchCep}
            className="bg-blue-500 text-white flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-600 transition"
          >
            <CiSearch size={22} />
          </button>
        </div>
      </div>

      {dataCep.logradouro && (
        <div className="mt-3">
          <div className="mb-3">
            <h2 className="font-bold mb-1 text-md">Endereço:</h2>
            <input
              type="text"
              className="border border-zinc-300 shadow-md bg-white px-3 py-2 rounded-lg w-full"
              value={dataCep.logradouro || ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold mb-1 text-md">Bairro:</h2>
            <input
              type="text"
              className="border border-zinc-300 shadow-md bg-white px-3 py-2 rounded-lg w-full"
              value={dataCep.bairro || ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold mb-1 text-md">Número:</h2>
            <input
              type="number"
              className="border border-zinc-300 shadow-md bg-white px-3 py-2 rounded-lg w-full"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold mb-1 text-md">Cidade / Estado:</h2>
            <input
              type="text"
              className="border border-zinc-300 shadow-md bg-white px-3 py-2 rounded-lg w-full"
              value={`${dataCep.localidade || ""} / ${dataCep.uf || ""}`}
              readOnly
            />
          </div>

          <div className="mb-3">
            <h2 className="font-bold mb-1 text-md">Complemento:</h2>
            <input
              type="text"
              className="border border-zinc-300 shadow-md bg-white px-3 py-2 rounded-lg w-full"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>

          <button
            className={`w-full p-3 mt-2 rounded-lg text-white font-bold transition ${isComplete ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={handleContinuar}
            disabled={!isComplete}
          >
            Continuar
          </button>
        </div>
      )}
    </div>

  );
};
