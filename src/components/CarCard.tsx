'use client'
import React  from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import Image from 'next/image'
import { Car } from '@/types/types'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface ICarProps {
  car: Car
}

export default function CarCard({ car }: ICarProps) {
  const router = useRouter()

  const handleCarInfo = (carId: number) => {
    router.push(`/car/${carId}`)
  }

  return (
    <Card className='p-0 mx-[10px] pb-4 gap-2'>
        <div className='relative w-full aspect-[4/3]'>
          <Image placeholder='blur' 
            blurDataURL='/blur-placeholder.png' 
            src={car.images.image[0]} alt='car'  
            className='w-full rounded-t-md'
            style={{ objectFit: 'cover'}} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h2 className='font-bold text-[16px] px-4'>{car.mark_id} {car.folder_id}</h2>
        <CardContent className='px-4 mt-auto flex gap-4 justify-between'>
          <div>
              <p className='text-gray-400 text-[14px]'>{car.engine_volume / 1000}л/{car.engine_power}/{car.engine_type}</p>
              <p className='text-gray-400 text-[14px]'>{car.gearbox}</p>
              <p className='text-gray-400 text-[14px]'>{car.body_type}</p>
              <p className='text-gray-400 text-[14px]'>{car.drive}</p>
              <p className='text-gray-400 text-[14px]'>{car.color}</p>
          </div>
          <div>
            <p className='text-gray-400 text-[14px]'>{car.year}</p>
            <p className='text-gray-400 text-[14px]'>Пробег: {car.run} км</p>
          </div>
        </CardContent>
        <CardFooter className='px-4 flex justify-between mt-auto'>
          <p className='font-bold'>{car.price.toLocaleString('ru-RU') + ' ₽'}</p>
          <Button variant={'default'} onClick={() => handleCarInfo(car.unique_id)} >Подробнее</Button>
        </CardFooter>
    </Card>
  )
}
