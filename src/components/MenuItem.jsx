import { FaHamburger, FaIceCream, FaPizzaSlice, FaBacon } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { useProduct } from "../hooks/useCardProduct";

// Menu item data
const menu = [
  { text: 'Burgers', icon: <img width={25} src={'/img/icon/hamburger.png'} alt="" /> },
  { text: 'Pizzas', icon: <img width={25} src={'/img/icon/pizza.png'} alt="" /> },
  { text: 'Churrasco', icon: <img width={25} src={'/img/icon/chicken.png'} alt="" /> },
  { text: 'Sobremesas', icon: <img width={25} src={'/img/icon/ice-cream.png'} alt="" /> },
  { text: 'Steaks', icon: <img width={25} src={'/img/icon/bacon.png'} alt="" /> },
];

export const MenuItem = () => {
  const { setNameProduct } = useProduct()
  const [selectedItem, setSelectedItem] = useState('Burgers');


  useEffect(() => {
    setNameProduct(selectedItem)
  }, [selectedItem])


  return (
    <div className="py-2 bg-[#f5f5f5] flex justify-center px-2 w-full xl:w-[980px] xl:mx-auto">
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
              className={`flex mx-auto font-secondary cursor-pointer items-center justify-center gap-2 text-lg text-text-primary py-2 rounded-xl my-2 w-full 
                        transform hover:scale-105 transition-all xl:w-40
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
