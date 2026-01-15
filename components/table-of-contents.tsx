"use client"

import { useState } from "react"
import { List, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!items || items.length === 0) return null

  return (
    <div className="my-8 rounded-lg bg-primary/5 from-primary/10 border border-border backdrop-blur-sm hover:border-primary/20 transition-all duration-500 group/toc overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-foreground/80 group-hover/toc:text-foreground transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <List size={18} className="text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Table des matières</h2>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[1000px] opacity-100 pb-6 px-6" : "max-h-0 opacity-0"
        )}
      >
        <nav>
          <ol className="space-y-3">
            {items.map((item, index) => (
              <li 
                key={item.id} 
                className="flex gap-3 text-sm leading-relaxed"
                style={{ paddingLeft: `${(item.level - 2) * 1.5}rem` }}
              >
                <span className="text-primary/40 font-mono shrink-0">{index + 1}.</span>
                <a 
                  href={`#${item.id}`}
                  className="text-muted-foreground hover:text-primary transition-colors decoration-primary/20 hover:underline underline-offset-4"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
