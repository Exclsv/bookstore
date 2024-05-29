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
        <h1 className='text-2xl font-bold text-white'>Сборники</h1>
        <Button asChild className='bg-green-500 hover:bg-green-600'>
          <Link href='/admin/collections/new' className='rounded-xl'>
            Добавить Сборник
          </Link>
        </Button>
      </div>

      <ProdutTable />
    </>
  )
}

async function ProdutTable() {
  const collections = await db.collection.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      author: true,
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
        {collections.map(collection => (
          <TableRow className='font-medium text-white hover:bg-slate-400'>
            <TableCell>
              {collection.isAvailableForPurchase ? (
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
            <TableCell>{collection.title}</TableCell>
            <TableCell>{collection.author}</TableCell>
            <TableCell>{formatCurrency(collection.price)}</TableCell>
            <TableCell>{formatNumber(collection._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>Actions</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/collections/${collection.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={collection.id}
                    isAvailableForPurchase={collection.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    type='collection'
                    id={collection.id}
                    disabled={collection._count.orders > 0}
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
