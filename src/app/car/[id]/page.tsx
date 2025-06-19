'use client'

import type { Car } from '@/types/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, FreeMode } from 'swiper/modules'


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';


export default  function CarInfo() {
    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`/api/cars/${id}`);
                setCar(res.data.data[0]);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }

        }

        if (id) {
            fetchCar();
        }
    }, [id])

     if (loading) {
    return <p className="text-center mt-10">Загрузка...</p>;
    }
    console.log(car)
  return (
    <main className='py-4 px-2 max-w-[1200px] mx-auto'>
        <div className='mb-4 sm:flex items-center justify-between'>
            <h1 className='font-bold text-[16px] sm:text-2xl'>{car?.mark_id} {car?.folder_id}</h1>
            <p className='font-bold text-[16px] sm:text-2xl'>{car?.price.toLocaleString('ru-RU')  + ' ₽'}</p>
        </div>
        <div className='flex flex-col-reverse gap-2 lg:flex-row justify-between'>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between gap-4'>
                    <p className='text-gray-400 font-[14px]'>Наличие</p>
                    <p>{car?.availability}</p>
                </div>
                <div className='flex justify-between gap-4'>
                    <p className='text-gray-400 font-[14px]'>Поколение</p>
                    <p>{car?.generation_name}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Год выпуска</p>
                    <p>{car?.year}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Пробег</p>
                    <p>{car?.run}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Кузов</p>
                    <p>{car?.body_type}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Цвет</p>
                    <p>{car?.color}</p>
                </div>
                <div className='flex justify-between gap-4'>
                    <p className='text-gray-400 font-[14px]'>Двигатель</p>
                    <p>{car?.engine_volume / 1000}л/{car?.engine_power}/{car?.engine_type}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Комплектация</p>
                    <p>{car?.complectation_name}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Коробка</p>
                    <p>{car?.gearbox}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Привод</p>
                    <p>{car?.drive || 'нет данных'}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Руль</p>
                    <p>{car?.wheel}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Состояние</p>
                    <p>{car?.state}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>Таможня</p>
                    <p>{car?.custom}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-400 font-[14px]'>ПТС</p>
                    <p>{car?.pts}</p>
                </div>
            </div>
            <div className='relative lg:max-w-3/4'>
                <Swiper
                modules={[Navigation, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                thumbs={{ swiper: thumbsSwiper}}>
                        {car?.images.image.map((item) => (
                            <SwiperSlide key={item}>
                                <img src={item} alt='car' className='w-full aspect-[4/3] object-cover max-h-[500px]'/>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <Swiper
                        modules={[FreeMode, Navigation, Thumbs]}
                        spaceBetween={8}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        onSwiper={setThumbsSwiper}
                        className="mt-2 flex flex-col"
                    >
                        {car?.images.image.map((item) => (
                            <SwiperSlide key={item} className="cursor-pointer hover:opacity-100">
                                <img 
                                    src={item} 
                                    alt="car thumbnail" 
                                    className="w-full aspect-[4/3] object-cover max-h-40"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
            </div>
        </div>
    </main>
  )
}
