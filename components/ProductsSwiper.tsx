import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ProductProps } from '@/types/types';
import FeaturedProducts from './FeaturedProducts';

const ProductsSwiper = ({ content }: { content: ProductProps[] }) => {
  return (
    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={8}
      scrollbar={{ draggable: true, hide: true, el: 'no-scrollbar' }} className='w-full no-scrollbar' breakpoints={{
        500: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1328: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1712: {
          slidesPerView: 6,
          spaceBetween: 40,
        },
        2000: {
          slidesPerView: 7,
          spaceBetween: 50,
        },
        2525: {
          slidesPerView: 8,
          spaceBetween: 50,
        }
      }}>
      {content.map((product: ProductProps) => (
        <SwiperSlide key={product.id}>
          <FeaturedProducts productData={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductsSwiper