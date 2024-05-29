import z from 'zod'

export const accountSchema = z.object({
  email: z
    .string()
    .email({ message: 'Provide a valid email' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

const fileSchema = z.instanceof(File, {
  message: 'File is required',
})

const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith('image/'),
  {
    message: 'File must be an image',
  },
)
export const bookFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  slogan: z.string().min(1, { message: 'Slogan is required' }),
  author: z.string().min(1, { message: 'Author is required' }),
  rating: z.string().min(1, { message: 'Rating is required' }),
  published: z
    .string()
    .date()
    .min(1, { message: 'Published date is required' }),
  pages: z.coerce.number().int().min(1, { message: 'Pages is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  genre: z.string(), //array
  tags: z.string(), //array
  price: z.coerce.number().int().min(1, { message: 'Price is required' }),

  file: fileSchema.refine(file => file.size > 0, {
    message: 'File is required',
  }),
  image: imageSchema.refine(file => file.size > 0, {
    message: 'Image is required',
  }),
})

// export type BookType = z.infer<typeof bookFormSchema>

export const bookEditSchema = bookFormSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
})

export const collectionFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  author: z.string().min(1, { message: 'Author is required' }),
  rating: z.string().min(1, { message: 'Rating is required' }),
  price: z.coerce.number().int().min(1, { message: 'Price is required' }),
})
