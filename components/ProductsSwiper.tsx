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
      scrollbar={{ draggable: true, hide: true, el: 'no-scrollbar' }} className='w-full no-scrollbar'>
      {content.map((product: ProductProps) => (
        <SwiperSlide key={product.id}>
          <FeaturedProducts productData={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductsSwiper