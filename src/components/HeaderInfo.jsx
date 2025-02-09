
import logo from '../assets/logo.png'
import { FaStar } from "react-icons/fa";
import { IsOpen } from './IsOpen';

export const HeaderInfo = () => {
  return (
    <div className="flex  justify-between -mt-8 xl:px-9 xl:py-1 xl:w-[980px] bg-[#261B11] rounded-t-[40px] px-5 py-2 border-b border-zinc-700 md:w-[1150px] md:mx-auto flex-col ">


      <div className='flex items-center w-full justify-between'>
        <div className="flex items-center gap-2">
          <img className="w-14 xl:w-12 bg-white rounded-full " src={logo} alt="Logo do Menu Online" />
          <div className='text-base/5'>
            <h2 className="text-lg xl:text-lg font-semibold text-[#F2DEA2]">Menu-Online</h2>
            <p className="opacity-50 xl:text-sm text-gray-300">Fast Food</p>
          </div>


        </div>
        <div className="flex  cursor-pointer items-center border rounded-2xl h-7 w-[70px] justify-center gap-2 xl:w-15 border-gray-500 px-2">
          <FaStar className="text-amber-400" />
          <p className="font-medium text-white">4.8</p>
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
