'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

export default function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav className='flex justify-center gap-3 bg-circle1 px-4 text-primary-foreground'>
      {children}
    </nav>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathName = usePathname()
  const activeClass =
    pathName === props.href ? 'bg-circle2 text-foreground ' : ''
  return (
    <Link
      {...props}
      className={cn(
        'rounded-2xl p-4 transition-colors duration-200 hover:bg-rose-300 hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        activeClass,
      )}
    />
  )
}
