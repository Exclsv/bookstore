import fs from 'fs/promises'
import db from '@/db/db'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const book = await db.book.findUnique({ where: { id } })
  // console.log(book);
  

  if (book == null) return notFound()

  const { size } = await fs.stat(book.filePath)
  const file = await fs.readFile(book.filePath)
  const extension = book.filePath.split('.').pop()

  return new NextResponse(file, {
    headers: {
      // 'Content-Disposition': `attachment; filename=${book.title}.${extension}`,
      'Content-Disposition': `attachment; filename=book.${extension}`,
      'Content-Length': size.toString(),
    },
  })
}
