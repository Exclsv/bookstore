import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatter'

async function getBooksData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.book.count({ where: { isAvailableForPurchase: true } }),
    db.book.count({ where: { isAvailableForPurchase: false } }),
  ])

  return {
    activeCount,
    inactiveCount,
  }
}

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { price: true },
    _count: true,
  })

  return {
    totalSales: data._sum.price ?? 0,
    numberOfSales: data._count,
  }
}

async function getCustomersData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({ _sum: { price: true } }),
  ])

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.price || 0) / userCount,
  }
}

export default async function AdminDashboard() {
  const [salesData, customerData, bookData] = await Promise.all([
    getSalesData(),
    getCustomersData(),
    getBooksData(),
  ])

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <DashboardCard
        title='Книги'
        subtitle={`${formatNumber(salesData.numberOfSales)} Покупок`}
        body={formatCurrency(salesData.totalSales)}
      />
      <DashboardCard
        title='Пользователи'
        subtitle={`${formatCurrency(customerData.averageValuePerUser)} Средний чек`}
        body={`${formatNumber(customerData.userCount)} Пользователей`}
      />
      <DashboardCard
        title='Активные книги'
        subtitle={`${formatNumber(bookData.inactiveCount)} Неактивных`}
        body={formatNumber(bookData.activeCount)}
      />
    </div>
  )
}

interface DashboardCardProps {
  title: string
  subtitle: string
  body: string
}
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card className='bg-slate-300'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
