
import { CardItem } from "./components/CardItem"
import { Header } from "./components/Header"
import { HeaderInfo } from "./components/HeaderInfo"
import { MenuItem } from "./components/MenuItem"


export const App = () => {
  return (
    <>
      <header>
        <Header />
        <HeaderInfo />
      </header>
      <nav>
        <MenuItem />
      </nav>
      <section>
        <CardItem />
      </section>
    </>

  )
}
