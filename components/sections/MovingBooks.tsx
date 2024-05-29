export default function MovingBooks({
  Component,
  quantity = 10,
}: {
  Component: React.ComponentType<any>
  quantity?: number
}) {
  return (
    <section className='mb-[20px]'>
      <div className='slides animate-slide flex gap-4 '>
        {Array.from({ length: quantity }).map((_, idx) => (
          <Component key={idx} />
        ))}
      </div>
      <div className='-translate-x-20'>
        <div className='slides animate-slide mt-10 flex gap-4'>
          {Array.from({ length: quantity }).map((_, idx) => (
            <Component key={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
