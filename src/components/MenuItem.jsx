import { FaHamburger, FaIceCream, FaPizzaSlice, FaBacon } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { useProduct } from "../hooks/useCardProduct";

// Menu item data
const menu = [
  { text: 'Burgers', icon: <FaHamburger /> },
  { text: 'Pizzas', icon: <FaPizzaSlice /> },
  { text: 'Churrasco', icon: <GiChickenLeg /> },
  { text: 'Sobremesas', icon: <FaIceCream /> },
  { text: 'Steaks', icon: <FaBacon /> },
];

export const MenuItem = () => {
  const { setNameProduct } = useProduct()
  const [selectedItem, setSelectedItem] = useState('Burgers');


  useEffect(() => {
    setNameProduct(selectedItem)
  }, [selectedItem])


  return (
    <div className="py-2 flex justify-center w-full xl:w-[1000px] xl:mx-auto">
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: -40,
          },
        }}
        className="w-full max-w-7xl"
      >

        {menu.map((item, index) => (
          <SwiperSlide key={index}>
            <button
              className={`flex mx-auto font-secondary cursor-pointer items-center justify-center gap-2 text-black px-5 py-2 rounded-2xl my-2 w-full 
                        transform hover:scale-103 transition-all xl:w-40
                        ${selectedItem === item.text ? 'bg-mint-500 text-white' : 'bg-white shadow-md'}`}
              aria-label={`Menu item: ${item.text}`}
              onClick={() => setSelectedItem(item.text)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div>{item.icon}</div>
              <p>{item.text}</p>
            </button>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
};
