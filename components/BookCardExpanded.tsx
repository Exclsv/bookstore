import { formatTextSize } from '@/lib/utils'
import Image from 'next/image'
import arrowRightGray from '@/app/assets/arrow-right-gray.svg'
import Rating from './Rating'

export default function BookCardExpanded() {
  return (
    <div className='slide flex h-[260px] w-[435px] min-w-[435px] gap-5 rounded-[20px] bg-stone-900/60 p-5'>
      <div className='relative -top-10  min-w-[160px]'>
        <Image
          src='/bookImages/pofigizm.png'
          width={160}
          height={230}
          alt='book'
          // className='z-50 relative'
          className='rounded-[10px]'
        />
        <Image
          src='/bookImages/pofigizm.png'
          width={160}
          height={230}
          quality={30}
          alt='book'
          className='image-shadow rounded-[10px]'
        />
        <div className='mt-[10px] flex justify-center'>
          <button className='rounded-lg bg-[#479EFC] px-[6px] py-1 text-[8px] text-white'>
            Текст
          </button>
          <button className='ml-1 rounded-lg bg-[#FE8D00] px-[6px] py-1 text-[8px] text-white'>
            Аудио
          </button>
        </div>
      </div>

      <div className='flex w-auto flex-col'>
        <div className='flex-1 space-y-[10px]'>
          <h4 className='text-sm font-bold text-white'>
            Тонкое искусство пофигизма
          </h4>
          <p className='text-[10px] text-gray-400'>Марк Мэнсон</p>
          <Rating number={4} size={12} />
          <p className='text-[10px] leading-[14px] text-gray-400'>
            {formatTextSize(
              220,
              `Современное общество пропагандирует культ успеха: будь умнее, богаче,
          продуктивнее – будь лучше всех. Как какой-то малец придумал приложение
          и заработал кучу денег, статьями в духе`,
            )}
          </p>
        </div>
        <div className='flex justify-between'>
          <p className='text-[10px] font-bold text-price'>1 222 230 USZ</p>
          <button className='h-[16px] w-[16px] rounded-full bg-price'>
            <Image src={arrowRightGray} alt='arrow-right-icon' />
          </button>
        </div>
      </div>
    </div>
  )
}
