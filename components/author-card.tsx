import Link from "next/link"
import Image from "next/image"
import type { AuthorMetadata } from "@/lib/authors"

interface AuthorCardProps {
  author: AuthorMetadata
  showBio?: boolean
}

export function AuthorCard({ author, showBio = true }: AuthorCardProps) {
  if (!author) return null

  return (
    <Link href={`/authors/${author.slug}`}>
      <div className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-md group">
        <Image
          src={author.avatar || "/placeholder.svg"}
          alt={author.name}
          width={48}
          height={48}
          className="rounded-lg object-cover ring-1 ring-border group-hover:ring-primary/20 transition-all"
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors truncate">{author.name}</p>
          {showBio && <p className="text-muted-foreground text-xs line-clamp-1">{author.bio}</p>}
        </div>
      </div>
    </Link>
  )
}
