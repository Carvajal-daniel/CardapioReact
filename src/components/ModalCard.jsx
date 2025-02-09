import useOpenModal from '../hooks/useModalCard'
import imgLogo from '../assets/menuLogo.png'
export const ModalCard = () => {

  const { dataCard, setIsOpenModal, isOpenModal, setDataCard } = useOpenModal()


  function handleClick() {
    setIsOpenModal(!isOpenModal)
    setDataCard({})
  }


  return (
    <div className='relative'>

{dataCard && (
        <div className=" w-[90%] max-w-md bg-[#f5f5f5] h-screen rounded-lg shadow-lg">
          {/* Imagem do Produto */}
          <div className="flex  items-center justify-center w-full h-90 ">
            <img
              className="w-100 h-90 mt-7 z-0 rounded-2xl"
              src={dataCard.img}
              alt={dataCard.name}
            />
          </div>

          <div className="bg-[#f5f5f5] mt-6 flex flex-col space-y-6 h-[70vh]  text-text-primary z-50 px-4 py-6 rounded-t-2xl">

            {/* Logo */}
            <div className="flex items-center">
              <img width={40} src={imgLogo} alt="logo" />
              <h2 className="ml-2 text-xl font-bold">Menu-Online</h2>
            </div>

            {/* Nome do Produto */}
            <div className="text-2xl font-medium">
              <h1>{dataCard.name}</h1>
            </div>

            {/* Preço e Quantidade */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Preço</h2>
              <button className="bg-gray-200 px-4 py-2 rounded-lg">- 1 +</button>
            </div>

            {/* Descrição */}
            <div>
              <span className="font-semibold">Sobre:</span>
              <p className="text-gray-600">{dataCard.dsc}</p>
            </div>

            {/* Ingredientes */}
            <div>
              <h2 className="font-semibold">Ingredientes:</h2>
              <p className="text-gray-600">{dataCard.dsc}</p>
            </div>

            {/* Botão de Adicionar */}
            <div>
              <button className="bg-mint-500 w-full py-2 rounded-xl text-white text-lg">
                Adicionar a Sacola
              </button>
            </div>
          </div>

          {/* Botão de Fechar */}
          <button
            onClick={handleClick}
            className="absolute top-3 right-2 bg-mint-500 px-5 py-2 rounded-lg text-white font-medium text-lg shadow-lg"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}
