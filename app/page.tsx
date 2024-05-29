import MainPageBackground from '@/components/backgrounds/MainPage'
import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import MovingBooks from '@/components/sections/MovingBooks'

import BookGrid from '@/components/sections/BookGrid'
import Footer from '@/components/sections/Footer'
import BookCardExpanded from '@/components/BookCardExpanded'
import BooksCardExpanded from '@/components/BooksCardExpanded'

export default function Home() {
  return (
    <>
      {/* Background */}
      <div className='absolute top-0 left-0 z-[-1] min-h-fit w-full'>
        <MainPageBackground />
      </div>

      {/* Content */}
      <Header />

      <main className='mb-[90px]'>
        <Hero />

        <h3 className='container mb-5 text-2xl font-bold text-white'>
          Рекомендации
        </h3>
        <BookGrid />

        <h3 className='container mb-10 mt-5 text-2xl font-bold text-white'>
          Хиты продаж
        </h3>
        <MovingBooks Component={BookCardExpanded} />

        <h3 className='container mb-10 mt-5 text-2xl font-bold text-white'>
          Сборники
        </h3>
        <MovingBooks Component={BooksCardExpanded} />

        <h3 className='container mb-5 text-2xl font-bold text-white'>
          Новинки
        </h3>
        <BookGrid />
      </main>

      <Footer />
    </>
  )
}
