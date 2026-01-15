"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function CategorySelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") || "all"

  const onValueChange = (value: string) => {
    if (value === "all") {
      router.push("/blog")
    } else {
      router.push(`/blog?category=${value}`)
    }
  }

  return (
    <div className="w-full md:hidden">
      <Select value={activeCategory} onValueChange={onValueChange}>
        <SelectTrigger className="w-full h-12 bg-primary/5 border-border text-foreground text-lg font-medium backdrop-blur-sm active:scale-[0.98] transition-all rounded-lg shadow-sm">
          <SelectValue placeholder="Choisir une catégorie" />
        </SelectTrigger>
        <SelectContent className="bg-popover/98 border-border text-popover-foreground backdrop-blur-xl rounded-lg shadow-sn">
          <SelectItem value="all" className="text-lg py-3 focus:bg-accent focus:text-accent-foreground rounded-lg transition-colors cursor-pointer">
            Tous les articles
          </SelectItem>
          {siteConfig.categories.map((category) => (
            <SelectItem 
              key={category.slug} 
              value={category.slug}
              className="text-lg py-3 focus:bg-primary/5 focus:text-accent-foreground rounded-lg transition-colors cursor-pointer"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
