import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function GalleryComponent() {
  return (
    <div style={{backgroundColor:"blue"}}>
      <h4>dfaf</h4>
      <h4>dfaf</h4>
      <h4>dfaf</h4>
      <h4>dfaf</h4>
      <h4>dfaf</h4>
      <h4>dfaf</h4>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide> <img src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1690504702/videojuegos/persona-5-royal-fiicha_sbmpoq.webp" alt="" /></SwiperSlide>
        <SwiperSlide> <img src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1690504702/videojuegos/persona-5-royal-fiicha_sbmpoq.webp" alt="" /></SwiperSlide>
        <SwiperSlide> <img src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1690504702/videojuegos/persona-5-royal-fiicha_sbmpoq.webp" alt="" /></SwiperSlide>
        <SwiperSlide> <img src="https://res.cloudinary.com/dxnzcewsy/image/upload/v1690504702/videojuegos/persona-5-royal-fiicha_sbmpoq.webp" alt="" /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default GalleryComponent;
