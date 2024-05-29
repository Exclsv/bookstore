import { Collection } from '@prisma/client'
import BooksCardExpanded from './BooksCardExpanded'

export default function CollectionGrid({ collection }: { collection: Collection[] }) {
  return (
    <>
      {collection.map(collection => (
        <BooksCardExpanded key={collection.id} collection={collection} />
      ))}
    </>
  )
}
