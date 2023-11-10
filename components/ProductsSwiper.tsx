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
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
        1328: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
        1712: {
          slidesPerView: 6,
          spaceBetween: 50,
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