import Nav, { NavLink } from '@/components/AdminNav'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav>
        <NavLink href='/admin'>Главная</NavLink>
        <NavLink href='/admin/books'>Все книги</NavLink>
        <NavLink href='/admin/collections'>Все коллекции</NavLink>
        <NavLink href='/admin/users'>Все пользователи</NavLink>
      </Nav>
      <div className='container my-6'>{children}</div>
    </>
  )
}
