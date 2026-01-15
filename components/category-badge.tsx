"use client"

import Link from "next/link"
import { getCategoryIcon } from "@/lib/icons"

interface CategoryBadgeProps {
  slug: string
  name: string
}

export function CategoryBadge({ slug, name }: CategoryBadgeProps) {
  const Icon = getCategoryIcon(slug)

  return (
    <Link href={`/categories/${slug}`}>
      <div className="inline-flex items-center text-muted-foreground gap-2 px-4 py-1.5 rounded-lg bg-primary/5 border border-border hover:bg-primary/10 hover:border-primary/50 hover:text-primary active:scale-95 transition-all cursor-pointer group shadow-sm">
        <Icon size={14} className="text-primary group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold text-primary uppercase tracking-tight">{name}</span>
      </div>
    </Link>
  )
}
