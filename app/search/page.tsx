'use client'
import Header from '@/components/Header'
import Image from 'next/image'
import logo from '@/app/assets/logo-search-page.png'
import { Suspense, useEffect, useState } from 'react'
import { getBooks, getCollections } from '../_actions/actions'
import BooksGrid from '@/components/BooksGrid'
import Pagination from '@/components/Pagination'
import MainPageBackground from '@/components/backgrounds/MainPage'
import SearchForm from '@/components/SearchForm'
import { Book, Collection } from '@prisma/client'
import Link from 'next/link'

export default function Page({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string }
}) {
  const [booksData, setBooksData] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [genres, setGenres] = useState<string[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks()
      setBooksData(books)
      setFilteredBooks(applyFilters(books, searchParams))
      const allGenres = books.flatMap(book => book.genre)
      const uniqueGenres = Array.from(new Set(allGenres))
      setGenres(uniqueGenres)
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    setFilteredBooks(applyFilters(booksData, searchParams))
  }, [searchParams, booksData])

  const applyFilters = (books: Book[], params: { [key: string]: string }) => {
    let filtered = books
    if (params.bookName) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(params.bookName.toLowerCase()),
      )
    }
    if (params.genre && params.genre !== 'all') {
      filtered = filtered.filter(book => {
        return book.genre.some(genre => genre === params.genre)
      })
    }
    if (params.date && params.date !== 'all') {
      const [startYear, endYear] = params.date.split('-').map(Number)
      filtered = filtered.filter(book => {
        const publishYear = new Date(book.published).getFullYear()
        return publishYear >= startYear && publishYear <= endYear
      })
    }
    if (params.rating && params.rating !== 'all') {
      const minRating = Number(params.rating)
      filtered = filtered.filter(book => book.rating >= minRating)
    }
    return filtered
  }

  const pageSize = 10
  const totalPages = Math.ceil(filteredBooks.length / pageSize)
  const currentPage = Number(searchParams.page) || 1
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = currentPage * pageSize
  const currentBooks = filteredBooks.slice(startIndex, endIndex)

  return (
    <>
      <div className='absolute left-0 top-0 z-[-1] h-full w-full overflow-hidden'>
        <MainPageBackground />
      </div>
      <Header />

      <div className='container mt-4 flex items-center gap-[57px]'>
        <h1 className='text-5xl font-bold text-white'>
          НАЙДИ СЕБЕ КНИГУ ПО ДУШЕ
        </h1>
        <Image src={logo} alt='logo' width={212} height={212} />
      </div>

      <section className='container rounded-[20px] bg-stone-900/60 p-5 backdrop-blur-md'>
        <SearchForm genres={genres} />
      </section>

      <div className='container mt-5 flex items-center gap-5'>
        <h2 className='text-2xl font-bold text-white'>Результаты</h2>
        <p className='text-2xl text-stone-400'>{filteredBooks.length}</p>
      </div>

      <section className='container mt-5 grid grid-cols-2 justify-items-stretch gap-[10px] gap-y-5 sm:grid-cols-3 sm:gap-x-[30px] lg:grid-cols-5 md:gap-x-[15px]'>
        <Suspense fallback={<p>Loading...</p>}>
          <BooksGrid books={currentBooks} />
        </Suspense>
      </section>

      <div className='mt-5'>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>

      <div className='container mt-10 w-full'>
        <Link
          href='/search-collections'
          className='mx-auto block w-fit rounded-[20px] bg-[#FE8D00] px-5 py-[10px] text-center text-white transition-colors duration-200 hover:bg-orange-600'>
          Перейти в сборники
        </Link>
      </div>
    </>
  )
}
