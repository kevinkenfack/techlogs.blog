"use client"

import Link from "next/link"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"

interface BlogCardProps {
  title: string
  description: string
  date: string
  category: string
  slug: string
  image?: string
  author?: string | { name: string; slug: string; avatar?: string } // Support both string and object
}

export function BlogCard({ title, description, date, category, slug, image, author }: BlogCardProps) {
  const formattedDate = format(parseISO(date), "d MMMM yyyy", { locale: fr })

  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 active:scale-[0.98] transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md">
      {image && (
        <div className="relative w-full h-48 overflow-hidden bg-accent/50">
          <Image
            src={image || "/authors/placeholder-user.jpg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
        </div>
      )}

      <div className="p-6 flex flex-col grow">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 rounded-lg border border-primary/20">
            {category}
          </span>
          <span className="text-xs text-muted-foreground font-medium">{formattedDate}</span>
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors text-foreground tracking-tight leading-tight">
          <Link href={`/blog/${slug}`} className="before:absolute before:inset-0">
            {title}
          </Link>
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 grow mb-6 leading-relaxed">{description}</p>

        {author && (
          <div className="border-t border-border pt-4 flex items-center gap-3 relative z-10 mt-auto">
            {typeof author !== "string" && author.avatar && (
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border shrink-0 ring-1 ring-border/50">
                <Image src={author.avatar} alt={author.name} fill className="object-cover" />
              </div>
            )}
            <Link
              href={`/authors/${typeof author === "string" ? author : author.slug}`}
              className="text-xs text-foreground hover:text-primary transition-colors font-bold"
            >
              <span className="text-muted-foreground font-medium">Par</span>{" "}
              {typeof author === "string"
                ? author.charAt(0).toUpperCase() + author.slice(1).replace(/-/g, " ")
                : author.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogCard
