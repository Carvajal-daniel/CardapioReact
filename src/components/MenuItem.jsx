import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState, useRef } from "react";
import { useProduct } from "../hooks/useCardProduct";
import { motion } from "framer-motion";

// Menu item data
const menu = [
  { text: "Burgers", icon: <img width={25} src={"/img/icon/burger.png"} alt="" /> },
  { text: "Pizzas", icon: <img width={25} src={"/img/icon/pizza.png"} alt="" /> },
  { text: "Churrasco", icon: <img width={25} src={"/img/icon/chicken.png"} alt="" /> },
  { text: "Sobremesas", icon: <img width={25} src={"/img/icon/sobremesa.png"} alt="" /> },
  { text: "Steaks", icon: <img width={25} src={"/img/icon/bacon.png"} alt="" /> },
];

export const MenuItem = () => {
  const { setNameProduct } = useProduct();
  const [selectedItem, setSelectedItem] = useState("Burgers");
  const swiperRef = useRef(null); // Referência do Swiper

  useEffect(() => {
    setNameProduct(selectedItem);
  }, [selectedItem]);

  return (
    <motion.div
      className="py-2 bg-[#f5f5f5] flex justify-center px-2 w-full xl:w-[980px] xl:mx-auto"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: .6 }}
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{ delay: 3000 }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Guarda a instância do Swiper
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: -40 },
        }}
        className="w-full max-w-7xl"
      >
        {menu.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
            initial={{ opacity: 0, y: 90 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * .1, 
              duration: .5,
              ease: "easeOut",
            }}
            >

            <button
              className={`flex mx-auto font-secondary cursor-pointer items-center justify-center rounded-t gap-2 px-2 text-lg text-text-primary py-2 my-2 w-full xl:py-1 xl:text-sm
                        transform hover:scale-105 transition-all xl:w-40
                        ${selectedItem === item.text ? "bg-white text-text-primary shadow-md border-b-3 border-green-500" : "bg-white shadow-md"}`}
              aria-label={`Menu item: ${item.text}`}
              onClick={() => {
                  setSelectedItem(item.text);
                  swiperRef.current.slideTo(index, 890);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div>{item.icon}</div>
              <p>{item.text}</p>
            </button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
