'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number
  currentPage: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const queryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)

      return params.toString()
    },
    [searchParams],
  )

  function onNextPage() {
    if (currentPage === totalPages) return

    router.push(
      pathName + '?' + queryString('page', (currentPage + 1).toString()),
    )
  }
  function onPreviousPage() {
    if (currentPage === 1) return

    router.push(
      pathName + '?' + queryString('page', (currentPage - 1).toString()),
    )
  }
  function returnToFirstPage() {
    router.push(pathName + '?' + queryString('page', '1'))
  }

  return (
    <div className='mx-auto flex h-[50px] w-fit items-center gap-[10px] rounded-[20px] bg-price px-5 py-[10px]'>
      <button
        className='aspect-square h-[30px] rounded-full p-1 hover:bg-slate-400'
        onClick={onPreviousPage}>
        <LuChevronLeft size={24} className='text-white' />
      </button>

      {/* <button
        className={cn(
          'aspect-square h-[30px] rounded-full p-1 text-white hover:bg-slate-400',
          activePage,
        )}
        onClick={returnToFirstPage}>
        1
      </button> */}
      {[...Array(4)].map((_, idx) => {
        const page = currentPage + idx - 1
        const activePage = page === currentPage ? 'bg-white text-stone-900' : ''
        return page > 0 && page <= totalPages ? (
          <button
            key={idx}
            onClick={() =>
              router.push(pathName + '?' + queryString('page', page.toString()))
            }
            className={cn(
              'aspect-square h-[30px] rounded-full p-1 text-white transition-colors hover:bg-slate-400 ',
              activePage,
            )}>
            {page}
          </button>
        ) : null
      })}

      <button
        className='aspect-square h-[30px] rounded-full p-1 hover:bg-slate-400'
        onClick={onNextPage}>
        <LuChevronRight size={24} className='text-white' />
      </button>
    </div>
  )
}
