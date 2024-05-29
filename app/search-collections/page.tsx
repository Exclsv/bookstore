'use client'

import Header from '@/components/Header'
import Image from 'next/image'
import logo from '@/app/assets/logo-search-page.png'
import { Suspense, useEffect, useState } from 'react'
import { getCollections } from '../_actions/actions'
import Pagination from '@/components/Pagination'
import MainPageBackground from '@/components/backgrounds/MainPage'
import { Collection } from '@prisma/client'
import Link from 'next/link'
import SearchFormCollection from '@/components/SearchFormCollection'
import CollectionGrid from '@/components/CollectionGrid'

export default function Page({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string }
}) {
  const [collectionsData, setCollectionsData] = useState<Collection[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(
    [],
  )

  useEffect(() => {
    const fetchCollection = async () => {
      const collections = await getCollections()
      setCollectionsData(collections)
      setFilteredCollections(applyFilters(collections, searchParams))
    }
    fetchCollection()
  }, [])

  useEffect(() => {
    setFilteredCollections(applyFilters(collectionsData, searchParams))
  }, [searchParams, collectionsData])

  const applyFilters = (
    collections: Collection[],
    params: { [key: string]: string },
  ) => {
    let filtered = collections
    if (params.collectionName) {
      filtered = filtered.filter(collection =>
        collection.title
          .toLowerCase()
          .includes(params.collectionName.toLowerCase()),
      )
    }
    return filtered
  }

  const pageSize = 10
  const totalPages = Math.ceil(filteredCollections.length / pageSize)
  const currentPage = Number(searchParams.page) || 1
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = currentPage * pageSize
  const currentCollections = filteredCollections.slice(startIndex, endIndex)

  return (
    <>
      <div className='absolute left-0 top-0 z-[-1] h-full w-full overflow-hidden'>
        <MainPageBackground />
      </div>
      <Header />

      <div className='container mt-4 flex items-center gap-[57px]'>
        <h1 className='text-5xl font-bold text-white'>
          НАЙДИ СЕБЕ CБОРНИК ПО ДУШЕ
        </h1>
        <Image src={logo} alt='logo' width={212} height={212} />
      </div>

      <section className='container rounded-[20px] bg-stone-900/60 p-5 backdrop-blur-md'>
        <SearchFormCollection />
      </section>

      <div className='container mt-5 flex items-center gap-5'>
        <h2 className='text-2xl font-bold text-white'>Результаты</h2>
        <p className='text-2xl text-stone-400'>{filteredCollections.length}</p>
      </div>

      <section className='container mt-10 grid grid-cols-2 justify-items-stretch gap-[10px] gap-y-5 sm:grid-cols-3 sm:gap-x-[30px] md:grid-cols-5 md:gap-x-[15px]'>
        <Suspense fallback={<p>Loading...</p>}>
          <CollectionGrid collection={currentCollections} />
        </Suspense>
      </section>

      <div className='mt-5'>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>

      <div className='container mt-10 w-full'>
        <Link
          href='/search'
          className='mx-auto block w-fit rounded-[20px] bg-[#FE8D00] px-5 py-[10px] text-center text-white transition-colors duration-200 hover:bg-orange-600'>
          Перейти к книгам
        </Link>
      </div>
    </>
  )
}
