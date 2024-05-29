export default function MainPageBackground() {
  return (
    <>
      <div className='relative h-full'>
        <div className='absolute right-0 top-0 z-[-1] aspect-square w-[60%] -translate-y-[10%] translate-x-[15%] rounded-full bg-circle1'></div>
        <div className='absolute left-0 top-10 z-[-1] aspect-square w-[32%] -translate-x-[10%] translate-y-[55%] rounded-full bg-circle2'></div>
        <div className='absolute left-0 top-0 z-[-1] aspect-square w-[60%] -translate-x-[10%] translate-y-[110%] rounded-full bg-circle1'></div>
        <div className='absolute right-0 top-0 z-[-1] aspect-square w-[32%] translate-x-[10%] translate-y-[210%] rounded-full bg-circle2'></div>
        <div className='absolute right-0 top-0 z-[-1] aspect-square w-[60%] translate-x-[15%] translate-y-[270%] rounded-full bg-circle1'></div>
        <div className='absolute left-0 top-10 z-[-1] aspect-square w-[32%] -translate-x-[10%] translate-y-[570%] rounded-full bg-circle2'></div>
        <div className='absolute left-0 top-0 z-[-1] aspect-square w-[60%] -translate-x-[10%] translate-y-[390%] rounded-full bg-circle1'></div>
        <div className='absolute right-0 top-0 z-[-1] aspect-square w-[32%] translate-x-[10%] translate-y-[730%] rounded-full bg-circle2'></div>
      </div>
    </>
  )
}
