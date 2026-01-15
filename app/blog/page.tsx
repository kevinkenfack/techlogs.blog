import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { siteConfig } from "@/lib/config"
import { getAllArticles } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"
import { getCategoryIcon } from "@/lib/icons"
import { HighlightAccent } from "@/components/highlight-accent"
import { CategorySelect } from "@/components/category-select"

export const metadata: Metadata = {
  title: `Nos Articles`,
  description: `Découvrez tous nos articles technologiques et innovations`,
  openGraph: {
    title: `Nos Articles`,
    description: `Découvrez tous nos articles technologiques et innovations`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    type: "website",
    siteName: siteConfig.name,
    locale: "fr_FR",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Nos Articles`,
    description: `Découvrez tous nos articles technologiques et innovations`,
    images: [siteConfig.ogImage],
  },
}

export default async function BlogPage(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams
  const activeCategory = searchParams.category
  const allArticles = await getAllArticles()
  
  const articles = activeCategory
    ? allArticles.filter((article) => article.category === activeCategory)
    : allArticles

  return (
    <main className="min-h-screen bg-background pt-8 md:pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Notre <HighlightAccent>Blog Technologique</HighlightAccent>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Découvrez nos articles sur les dernières tendances, innovations et meilleures pratiques en développement
              web, infrastructure et sécurité.
            </p>
          </div>

          {/* Category Navigation */}
          <Suspense fallback={<div className="h-10 w-full animate-pulse bg-accent/50 rounded-lg md:hidden" />}>
            <CategorySelect />
          </Suspense>

          <div className="hidden md:flex flex-wrap gap-2 md:gap-3">
            <Link href="/blog">
              <button
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-bold transition-all active:scale-95 ${
                  !activeCategory
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all cursor-pointer active:scale-90 shadow-sm"
                }`}
              >
                Tous les articles
              </button>
            </Link>
            {siteConfig.categories.map((category) => {
              const Icon = getCategoryIcon(category.icon)
              const isActive = activeCategory === category.slug
              return (
                <Link key={category.slug} href={`/blog?category=${category.slug}`}>
                  <button
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg border transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base font-bold active:scale-95 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all cursor-pointer active:scale-90 shadow-sm"
                    }`}
                  >
                    <Icon size={16} className="w-3 h-3 md:w-4 md:h-4" />
                    {category.name}
                  </button>
                </Link>
              )
            })}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length > 0 ? (
              articles.map((article) => (
                <BlogCard
                  key={article.slug}
                  slug={article.slug}
                  title={article.title}
                  description={article.description}
                  date={article.date}
                  category={article.category}
                  image={article.image}
                  author={article.author}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <p className="text-muted-foreground text-lg">Aucun article trouvé dans cette catégorie.</p>
                <Link href="/blog" className="text-primary font-bold hover:underline">
                  Voir tous les articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
