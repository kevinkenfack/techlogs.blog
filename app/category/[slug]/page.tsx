import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { getCategoryIcon } from "@/lib/icons"
import BlogCard from "@/components/blog-card"
import { promises as fs } from "fs"
import path from "path"
import { HighlightAccent } from "@/components/highlight-accent"
import { getAuthorBySlug } from "@/lib/authors"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = siteConfig.categories.find((c) => c.slug === slug)

  if (!category) {
    return {
      title: "Catégorie introuvable",
    }
  }

  return {
    title: `${category.name} | TechVision`,
    description: `Articles sur ${category.name}`,
    openGraph: {
      title: `${category.name} | TechVision`,
      description: `Articles sur ${category.name}`,
      url: `${siteConfig.url}/categories/${slug}`,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  return siteConfig.categories.map((category) => ({
    slug: category.slug,
  }))
}

async function getArticlesByCategory(categorySlug: string) {
  const articlesDir = path.join(process.cwd(), "content", "articles")
  const files = await fs.readdir(articlesDir)

  const articles = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const content = await fs.readFile(path.join(articlesDir, file), "utf-8")
        const metadata = content.split("---")[1]
        const title = metadata.match(/title: "([^"]*)"/)?.[1] || ""
        const description = metadata.match(/description: "([^"]*)"/)?.[1] || ""
        const date = metadata.match(/date: "([^"]*)"/)?.[1] || ""
        const category = metadata.match(/category: "([^"]*)"/)?.[1] || ""
        const image = metadata.match(/image: "([^"]*)"/)?.[1] || ""
        const author = metadata.match(/author: "([^"]*)"/)?.[1] || ""
        const slug = file.replace(".mdx", "")

        return { slug, title, description, date, category, image, author }
      }),
  )

  return articles.filter((article) => article.category === categorySlug)
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = siteConfig.categories.find((c) => c.slug === slug)
  const rawArticles = await getArticlesByCategory(slug)
  
  // Resolve authors for each article to show their names/avatars in BlogCard
  const articles = await Promise.all(
    rawArticles.map(async (article) => {
      const author = await getAuthorBySlug(article.author)
      return { ...article, authorData: author }
    })
  )

  const Icon = category ? getCategoryIcon(category.icon) : null

  if (!category) {
    return (
      <main className="min-h-screen bg-background pt-8 md:pt-12 pb-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">Catégorie introuvable</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-8 md:pt-12 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
              <HighlightAccent>{category.name}</HighlightAccent>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg md:text-xl font-medium">Articles et innovations en {category.name}</p>
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  author={article.authorData || article.author}
                />
              ))
            ) : (
              <div className="col-span-full py-24 text-center space-y-4 rounded-3xl bg-card border border-border shadow-inner mt-8">
                <p className="text-muted-foreground text-lg italic">
                  Aucun article n'a été publié dans cette catégorie pour le moment.
                </p>
                <Link href="/blog" className="text-primary font-bold hover:underline inline-block">
                   Revenir au blog <span className="font-mono">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
