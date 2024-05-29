'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export default function FilterSelect({
  label,
  values,
  searchParam,
  name,
  defaultValue,
  onChange,
}: {
  label: string
  values: string[]
  searchParam: string
  name: string
  defaultValue: string
  onChange: (value: string) => void
}) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()

  function onSelect(value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set(searchParam, value)
    const newPathName = `${pathName}?${newSearchParams.toString()}`
    router.push(newPathName)
    onChange(value)
  }

  return (
    <div>
      <Label className='mb-[5px] inline-block text-[10px] text-stone-400'>
        {label}
      </Label>

      <Select onValueChange={value => onSelect(value)} name={name} defaultValue={defaultValue}>
        <SelectTrigger className='flex h-[50px] justify-between gap-3 rounded-[20px] border-transparent bg-stone-900/60 px-[20px] py-[14px] font-bold text-white backdrop-blur-md'>
          <SelectValue placeholder='Все' />
        </SelectTrigger>
        <SelectContent className='rounded-[20px] border-transparent bg-stone-900/60 text-white backdrop-blur-md'>
          <SelectGroup className='font-bold'>
            {values.map(value => (
              <SelectItem
                key={value}
                value={value}
                className='focus:bg-stone-900 focus:text-white'>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
