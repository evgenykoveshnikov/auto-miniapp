'use client'

import CarCard from "@/components/CarCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { Car } from '@/types/types'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const LIMIT = 12;

const SORT_OPTION = [
  {label: 'Без сортироки', value: 'none'},
  {label: 'Цена по возрастанию', value: 'asc'},
  {label: 'Цена по убыванию', value: 'desc'}
]

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const sort = searchParams.get('sort') || '';

  const [cars, setCars] = useState<Car[]>([]);
  const [meta, setMeta] = useState<{ page: number, last_page: number}>({
    page: 1,
    last_page: 1
  })

  useEffect(() => {
    const fetchCars = async () => {
      const params: Record<string, string | number> = {_limit: LIMIT, _page: page};
      if (sort) {
        params._sort = 'price';
        params._order = sort;
      }

      const res = await axios.get('/api/cars', {params})
      setCars(res.data.data);
      setMeta({
        page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      })
    }

    fetchCars();
  }, [page, sort])

  const handleChangeSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if(value === 'none') {
      router.push('/')
    } else {
      params.set('sort', value);
      params.set('page', '1')
      router.push('/?' + params.toString());
    }
  }

  const handleChangePage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', p.toString());
    router.push('/?' + params.toString())
  }

  console.log(cars)
  return (
    <main className="flex flex-col items-center">
      <Suspense fallback={<p>Loading...</p>}>
          <div className="px-2 py-4 w-full">
          <Select value={sort} onValueChange={handleChangeSort}>
            <SelectTrigger>
              <SelectValue placeholder='Сортировка'/>
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTION.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full items-stretch mx-[10px]">
              {cars.map((item) => (
                <CarCard car={item} key={item.unique_id}></CarCard>
              ))}
        </div>
        <div className="mt-2 p-4 w-full">
    <Pagination>
      <PaginationContent>
        {meta.page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleChangePage(meta.page - 1)
              }}
            />
          </PaginationItem>
        )}

        {(() => {
          const pageWindow = 5
          const half = Math.floor(pageWindow / 2)

          let start = Math.max(meta.page - half, 1)
          let end = start + pageWindow - 1

          if (end > meta.last_page) {
            end = meta.last_page
            start = Math.max(end - pageWindow + 1, 1)
          }

          return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={meta.page === p}
                onClick={(e) => {
                  e.preventDefault()
                  handleChangePage(p)
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))
        })()}

        {meta.page < meta.last_page && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleChangePage(meta.page + 1)
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  </div>
      </Suspense>
    </main>
  );
}
