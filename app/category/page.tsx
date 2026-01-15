import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { getCategoryIcon } from "@/lib/icons"
import { HighlightAccent } from "@/components/highlight-accent"

export const metadata: Metadata = {
  title: "Catégories | TechVision",
  description: "Parcourez tous les sujets et catégories de TechVision",
  openGraph: {
    title: "Catégories | TechVision",
    description: "Parcourez tous les sujets et catégories de TechVision",
    url: `${siteConfig.url}/categories`,
    type: "website",
  },
}

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background pt-8 md:pt-12 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold text-foreground leading-[1.1]">
              Explorez nos <HighlightAccent>Catégories</HighlightAccent>
            </h1>
            <p className="text-xl text-muted-foreground">Découvrez tous les sujets technologiques que nous couvrons</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.categories.map((category) => {
              const Icon = getCategoryIcon(category.icon)
              return (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  <div className="group h-64 p-8 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/50 active:scale-[0.98] transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-primary/5">
                    <div>
                      <div className="inline-block p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all mb-4">
                        <Icon size={32} className="text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {category.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 text-primary/70 group-hover:text-primary font-bold group-hover:translate-x-1 transition-all">
                      <span>Voir les articles</span>
                      <span className="font-mono">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
