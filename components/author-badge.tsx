import Link from "next/link"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import type { AuthorMetadata } from "@/lib/authors"

interface AuthorBadgeProps {
  author: AuthorMetadata
  date: string
}

export async function AuthorBadge({ author, date }: AuthorBadgeProps) {
  const formattedDate = format(parseISO(date), "d MMMM yyyy", { locale: fr })

  if (!author) {
    return null
  }

  return (
    <Link href={`/authors/${author.slug}`}>
      <div className="flex items-center gap-4 p-6 rounded-lg bg-primary/5 from-primary/10 border border-border hover:border-primary/20 active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-md group">
        <Image
          src={author.avatar || "/placeholder.svg"}
          alt={author.name}
          width={64}
          height={64}
          className="rounded-lg object-cover ring-2 ring-border/20 group-hover:ring-primary/20 transition-all"
        />
        <div className="flex-1">
          <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">Par {author.name}</p>
          <p className="text-muted-foreground text-xs">{formattedDate}</p>
        </div>
        <div className="text-primary text-xl group-hover:translate-x-1 transition-transform">→</div>
      </div>
    </Link>
  )
}
