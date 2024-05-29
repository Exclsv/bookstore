import { Search, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import headerIcon from '@/app/assets/header-icon.svg'

export default function Header() {
  return (
    <header className='flex justify-center'>
      <nav className='flex items-center gap-[10px]'>
        <Link
          href='/search'
          className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-price'>
          <Search color='white' />
        </Link>
        <div className='flex h-[37px] w-[37px] items-center justify-center rounded-full bg-menuIcon text-xs font-bold text-white'>
          USD
        </div>
        <Link href={'/'}>
          <Image
            src={headerIcon}
            alt='icon'
            className='w-[65px] translate-y-6'
          />
        </Link>
        <div className='flex h-[37px] w-[37px] items-center justify-center rounded-full bg-menuIcon text-xs font-bold text-white'>
          UZ
        </div>
        <Link
          href='/profile'
          className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-price'>
          <User color='white' />
        </Link>
      </nav>
    </header>
  )
}
