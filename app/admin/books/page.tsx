import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatter'
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react'
import Link from 'next/link'
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from '../_components/ProductActions'
import { Button } from '@/components/ui/button'

export default async function page() {
  return (
    <>
      <div className='mb-8 flex items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold text-white'>КНИГИ</h1>
        <Button asChild className='bg-green-500 hover:bg-green-600'>
          <Link href='/admin/books/new' className='rounded-xl'>
            Добавить книгу
          </Link>
        </Button>
      </div>

      <ProdutTable />
    </>
  )
}

async function ProdutTable() {
  const books = await db.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      price: true,
      isAvailableForPurchase: true,

      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: { title: 'asc' },
  })

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-price hover:bg-slate-400'>
          <TableHead className='w-0'>
            <span className='sr-only'>Available for purchase</span>
          </TableHead>
          <TableHead className='text-white'>Название</TableHead>
          <TableHead className='text-white'>Автор</TableHead>
          <TableHead className='text-white'>Цена</TableHead>
          <TableHead className='text-white'>Заказы</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {books.map(book => (
          <TableRow className='font-medium text-white hover:bg-slate-400'>
            <TableCell>
              {book.isAvailableForPurchase ? (
                <>
                  <span className='sr-only'>Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className='sr-only'>Unavailable</span>
                  <XCircle className='stroke-destructive' />
                </>
              )}
            </TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{formatCurrency(book.price)}</TableCell>
            <TableCell>{formatNumber(book._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>Actions</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <a download href={`/admin/books/${book.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/books/${book.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={book.id}
                    isAvailableForPurchase={book.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={book.id}
                    disabled={book._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

async function insertData() {
  const book = await db.book.createMany({
    data: [
      {
        title: 'Тонкое искусство пофигизма',
        author: 'Марк Мэнсон',
        price: 129000,
        isAvailableForPurchase: true,
        rating: 4.1,
        description:
          'Современное общество пропагандирует культ успеха: будь умнее, богаче, продуктивнее – будь лучше всех. Соцсети изобилуют историями на тему, как какой-то малец придумал приложение и заработал кучу денег, статьями в духе «Тысяча и один способ быть счастливым», а фото во френдленте создают впечатление, что окружающие живут лучше и интереснее, чем мы. Однако наша зацикленность на позитиве и успехе лишь напоминает о том, чего мы не достигли, о мечтах, которые не сбылись. Как же стать по-настоящему счастливым? Популярный блогер Марк Мэнсон в книге «Тонкое искусство пофигизма» предлагает свой, оригинальный подход к этому вопросу. Его жизненная философия проста – необходимо научиться искусству пофигизма. Определив то, до чего вам действительно есть дело, нужно уметь наплевать на все второстепенное, забить на трудности, послать к черту чужое мнение и быть готовым взглянуть в лицо неудачам и показать им средний палец.',
        imageSrc: 'bookImages/pofigizm.png',
        filePath: 'public/bookImages/maria.png',
        pages: 180,
        genre: [
          'Зарубежная психология',
          'Саморазвитие / личностный рост',
          'Социальная психология',
        ],
        published: new Date('2017-09-04'),
        slogan: 'Парадоксальный способ жить счастливо',
        tags: [
          'Бестселлеры «New York Times»',
          'Борьба со стрессом',
          'Поиск предназначения, Самореализация',
        ],
        formats: ['fb2', 'txt', 'epub', 'pdf', 'mp3'],
      },
    ],
  })
}
