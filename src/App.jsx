import { CardItem } from "./components/CardItem"
import { Cart } from "./components/Cart"
import { Header } from "./components/Header"
import { HeaderInfo } from "./components/HeaderInfo"
import { MenuItem } from "./components/MenuItem"
import { ModalCard } from "./components/ModalCard"
import useOpenModal from "./hooks/useModalCard"
import useCart from './hooks/useCart'

export const App = () => {
  const { isOpenModal } = useOpenModal()
  const {isOpenCart} = useCart()
 
  

  return (
    <>
      <header>
        <Header />
        <HeaderInfo />
      </header>
      <nav>
        <MenuItem />
      </nav>

    <section className={`fixed top-0 z-50 left-0 right-0 bottom-0 modalCard ${!isOpenCart && 'hidden'}`}>
        <Cart />
    </section>
      
      <section>
        <CardItem />
      </section>

      <section className={`fixed top-0 z-50 left-0 right-0 bottom-0 modalCard ${!isOpenModal && 'hidden'}`}>
        <ModalCard />
      </section>

      <footer>
        <p>Criado e desenhado por: Daniel Carvajal</p>
      </footer>
    </>

  )
}
