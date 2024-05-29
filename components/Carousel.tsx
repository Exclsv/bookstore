'use client'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { carouselSlides } from '@/lib/images'

import 'swiper/css'

export default function Carousel() {
  return (
    <section className='py-12'>
      <Swiper
        slidesPerView={1}
        loop
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        className='relative w-full rounded-2xl'>
        {/* <ArrowRight color='white' />
        <ArrowLeft color='white' /> */}
        {carouselSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <Slide title={slide.title} text={slide.text} icon={slide.src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

import Image from 'next/image'
import { ReactElement } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface SlideProps {
  title: ReactElement
  text: string
  icon: string
}

function Slide({ title, text, icon }: SlideProps) {
  return (
    <div className='flex select-none gap-[30px] rounded-2xl bg-stone-900/60 p-[50px] backdrop-blur-md'>
      <div className='max-w-[480px] text-white'>
        {title}
        <p className='mt-[10px] text-[18px] leading-7'>{text}</p>
      </div>
      <Image
        src={icon}
        alt='sitting'
        priority
        className='block h-[330px] w-[500px]'
      />
    </div>
  )
}
