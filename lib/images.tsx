import sitting from '@/app/assets/slide_sitting.svg'
import book from '@/app/assets/slide_book.svg'
import invite from '@/app/assets/slide_invite.svg'
import earn from '@/app/assets/slide_earn.svg'
import car from '@/app/assets/slide_car.svg'

export const carouselSlides = [
  {
    src: sitting,
    alt: 'First',
    title: (
      <h2 className='text-5xl font-bold text'>
        <span className='text-price'>Регистрируйся</span> и читай книги
      </h2>
    ),
    text: 'В нашей платформе более 5000 книг и журналов на разные темы и увлечения. У нас ты найдешь книгу души, можешь не выходя из дома путешествовать или окунутся в запутанный криминальный детектив.',
  },
  {
    src: book,
    alt: 'book',
    title: (
      <h2 className='text-5xl font-bold'>
        Покупай книгу и <span className='text-price'>наслаждайся</span>
      </h2>
    ),
    text: 'Во всех книгах вложена душа писатьеля. Все эмоции передаются через платформе ',
  },
  {
    src: invite,
    alt: 'invite',
    title: (
      <h2 className='text-5xl font-bold'>
        <span className='text-price'>Приглашай </span>и зарабатывай
      </h2>
    ),
    text: 'Чем больше друзей позовешь, тем больше покупок. Чем больше покупок, тем больше кэшбэков. Таким нехитрым способом можно зарабатывать и шанс выиграть супер приз.',
  },
  {
    src: earn,
    alt: 'earn',
    title: (
      <h2 className='text-5xl font-bold'>
        <span className='text-price'>КЭШБЭК </span>это не только возврат!
      </h2>
    ),
    text: 'За покупку каждого дуга можно получать кэшбэк. Даже ели твой друг позовет своего друга, то кэшбэк получишь и ты. Приглашай друзей, зарабатывай и читай вместе.',
  },
  {
    src: car,
    alt: 'car',
    title: (
      <h2 className='text-5xl font-bold'>
        Наконец <span className='text-price'>Spark</span>
      </h2>
    ),
    text: 'Никогда такого не было, что бы за прочтение книг дарили автомобили. А вот мы дарим, быстрее читай книги и побеждай. Не упусти шанс!',
  },
]
