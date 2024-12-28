import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import { InstructorInfo } from "./HomeElements.js";



export default function HomeInstructor() {

  return (
    <div className="w-screen flex flex-col justify-center items-center gap-5">
      {/* Swiper Carousel */}
      <Swiper
        
        effect={"coverflow"}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        spaceBetween={20}
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={false}
              
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full max-w-[1100px] h-[400px]"
      >
        {InstructorInfo.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center overflow-hidden rounded-lg relative group"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-bold mb-2">
                {item.name}
              </h3>
              <p
                className=" text-white px-4 py-2 rounded-lg"
              >
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>      
    </div>
  );
}
