'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTransition } from 'react'
import { deleteBook, toggleProductAvailability } from '../_actions/products'
import { useRouter } from 'next/navigation'
import { deleteCollection } from '../_actions/collections'

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string
  isAvailableForPurchase: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase)
          router.refresh()
        })
      }}>
      {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
    </DropdownMenuItem>
  )
}

export function DeleteDropdownItem({
  id,
  disabled,
  type='book',
}: {
  id: string
  disabled: boolean
  type: 'collection' | 'book'
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      variant='destructive'
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          if(type === 'book') await deleteBook(id)
          if(type === 'collection') await deleteCollection(id)
          router.refresh()
        })
      }}>
      Delete
    </DropdownMenuItem>
  )
}
