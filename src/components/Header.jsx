import { LuShoppingBasket } from "react-icons/lu";

export const Header = () => {
  return (
    <div className="h-[140px] w-full md:w-[1150px] xl:w-full xl:px-[4%] lg:h-[110px] bg-[url('/src/assets/cabezalho.jpg')] bg-cover bg-center flex justify-end">
      <div className="h-10 w-10 bg-white  cursor-pointer rounded-full flex xl:mt-[3%] xl:mr-[5%] items-center justify-center text-xl text-black mt-4 mr-4">
        <LuShoppingBasket />
      </div>
    </div>
  );
};
