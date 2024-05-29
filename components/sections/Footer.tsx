import Image from 'next/image'
import logo from '@/app/assets/footer-logo.png'
import logo2 from '@/app/assets/footer-logo-2.png'
import { FaFacebookF, FaInstagram, FaTelegramPlane } from 'react-icons/fa'

export default function Footer() {
  return (
    <section className='bg-stone-900/60 py-[30px] backdrop-blur-md'>
      <div className='container'>
        {/* TOP */}
        <div className='flex'>
          <div className='mr-[185px]'>
            <Image src={logo} alt='logo' className='aspect-square w-[100px]' />
          </div>
          <div className='mr-[30px] w-[255px] text-sm uppercase leading-[100%] text-white'>
            <h4 className='mb-[30px] font-bold'>fulibu</h4>
            <ul className='space-y-[15px] font-medium'>
              <li>О компании</li>
              <li>Публичная оферта</li>
              <li>Служба поддержки</li>
              <li>Контакты</li>
            </ul>
          </div>
          <div className='w-[255px] text-sm uppercase leading-[100%] text-white'>
            <h4 className='mb-[30px] font-bold'>Сотрудничество</h4>
            <ul className='space-y-[15px] font-medium'>
              <li>Издательствам</li>
              <li>Авторам</li>
              <li>Библиотекам</li>
              <li>Вебмастерам</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className='mt-[30px] flex items-center justify-between py-2 text-white'>
          <p className='text-xs'>© ООО «FULIBU»</p>
          <div className='flex space-x-[30px]'>
            <FaInstagram color='white' />
            <FaFacebookF color='white' />
            <FaTelegramPlane color='white' />
          </div>
          <div className='flex items-center gap-5'>
            <p className='text-xs'>Разработано командой</p>
            <div className='flex items-center gap-[5px]'>
              <Image src={logo2} alt='logo' className='h-[31px] w-[25px]' />
              <p className='w-[64px] text-[9px]'>
                Innovative Development Group
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
