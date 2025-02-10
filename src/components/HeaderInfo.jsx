
import logo from '../assets/menuLogo.png'
import { FaStar } from "react-icons/fa";
import { IsOpen } from './IsOpen';

export const HeaderInfo = () => {
  return (
    <div className="flex  justify-between -mt-5 xl:px-9 xl:py-1 xl:w-[980px] bg-[#f5f5f5] rounded-t-2xl px-5 py-2 border-b border-zinc-300 md:w-[1150px] md:mx-auto flex-col ">


      <div className='flex items-center w-full justify-between'>

        <div className="flex items-center py-2 gap-2">
          <img className="w-14 xl:w-12rounded-full " src={logo} alt="Logo do Menu Online" />
          <div className='text-base/5'>
            <h2 className="text-2xl xl:text-lg font-semibold text-text-primary font-primary">Menu-Online</h2>
            <p className="opacity-50 xl:text-sm text-text-secondary font-secondary">Fast Food</p>
          </div>


        </div>
        <div className="flex  cursor-pointer bg-white shadow items-center border rounded-2xl h-7 w-[70px] justify-center gap-2 xl:w-15 border-gray-500 px-2">
          <FaStar className="text-amber-400" />
          <p className="font-medium text-text-primary">4.8</p>
        </div>

      </div>
      <div className=' font-medium px-2 mt-1 md:text-lg md:mt-2 xl:font-normal xl:mt-1'>
        <div>
          <IsOpen />
        </div>
      </div>

    </div>
  );
};
