import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { TrangChuImages1 } from "../../data";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function SwipperHomePage() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative mt-6">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000 }}
        loop
        slidesPerView={2}
        spaceBetween={20}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {TrangChuImages1?.map((img, idx) => (
          <SwiperSlide key={idx}>
            <motion.img
              whileHover={{}} // bỏ scale
              transition={{ duration: 0.4 }}
              src={img}
              alt={`Promo ${idx + 1}`}
              className="w-full h-[198px] object-cover rounded-3xl shadow-lg"
            />{" "}
          </SwiperSlide>
        ))}{" "}
      </Swiper>

      <button
        ref={prevRef}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-linear-to-r from-yellow-400 to-yellow-500 text-white rounded-full p-3 shadow-lg hover:brightness-110 transition"
      >
        &#10094;
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-linear-to-r from-yellow-400 to-yellow-500 text-white rounded-full p-3 shadow-lg hover:brightness-110 transition"
      >
        &#10095;
      </button>
    </div>
  );
}
