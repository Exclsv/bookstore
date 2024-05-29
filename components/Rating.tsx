import { FaStar } from 'react-icons/fa'

export default function Rating({
  number,
  size = 9,
  position = 'left',
}: {
  number: number
  size?: number
  position?: 'left' | 'center' | 'right'
}) {
  const pos = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }
  const rating = Math.round(number)
  return (
    <div className={`flex gap-[2px] ${pos[position]}`}>
      {Array.from({ length: rating }).map((_, idx) => (
        <FaStar key={idx} size={size} className='text-[#FE8D00]' />
      ))}
      {Array.from({ length: 5 - rating }).map((_, idx) => (
        <FaStar key={idx} size={size} className='text-stone-400' />
      ))}
    </div>
  )
}
