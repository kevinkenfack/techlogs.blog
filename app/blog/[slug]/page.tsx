import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/config"
import { AuthorBadge } from "@/components/author-badge"
import { CategoryBadge } from "@/components/category-badge"
import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"
import { getAuthorBySlug } from "@/lib/authors"
import { MdxContent } from "@/components/mdx-content"
import { ShareButtons } from "@/components/share-buttons"
import { getAllArticles } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"
import { HighlightAccent } from "@/components/highlight-accent"
import { ReadingProgress } from "@/components/reading-progress"
import { TableOfContents } from "@/components/table-of-contents"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    const articlesDir = path.join(process.cwd(), "content", "articles")
    const filePath = path.join(articlesDir, `${slug}.mdx`)
    const content = await fs.readFile(filePath, "utf-8")

    const [frontmatter, mdxContent] = content.split("---").slice(1)

    const metadata: any = {}
    frontmatter.split("\n").forEach((line) => {
      if (line.trim()) {
        const [key, ...valueParts] = line.split(":")
        const value = valueParts.join(":").trim().replace(/^"|"$/g, "")
        metadata[key.trim()] = value
      }
    })

    return { metadata, content: mdxContent }
  } catch {
    return null
  }
}

function extractHeadings(content: string) {
  const headingLines = content.split("\n").filter((line) => line.match(/^#{2,4}\s/))
  
  return headingLines.map((line) => {
    const level = line.match(/^#+/)?.[0].length || 2
    const text = line.replace(/^#+\s/, "").trim()
    const id = text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      
    return { id, text, level }
  })
}
// ... (keep generateMetadata and generateStaticParams as they are, I will target the imports and the main component body)
// Wait, replace_file_content targets a block. I should just update imports and the component body.
// Let's do imports first.

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: "Article introuvable",
    }
  }

  // Handle Author Data for OG
  const authorData = await getAuthorBySlug(article.metadata.author)
  const authorName = authorData ? authorData.name : article.metadata.author

  // Construct OG Image URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set("title", article.metadata.title)
  ogSearchParams.set("author", authorName)
  ogSearchParams.set("date", article.metadata.date)
  if (article.metadata.category) {
    const category = siteConfig.categories.find((c) => c.slug === article.metadata.category)
    if (category) ogSearchParams.set("category", category.name)
  }

  const ogImageUrl = `${baseUrl}/api/og?${ogSearchParams.toString()}`

  return {
    title: `${article.metadata.title}`,
    description: article.metadata.description,
    keywords: article.metadata.keywords?.split(", "),
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
      type: "article",
      publishedTime: article.metadata.date,
      authors: [authorName],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metadata.title,
      description: article.metadata.description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), "content", "articles")
  const files = await fs.readdir(articlesDir)

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(".mdx", ""),
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  // Fetch author data from new MDX-based system
  const author = await getAuthorBySlug(article.metadata.author)
  const category = siteConfig.categories.find((c) => c.slug === article.metadata.category)

  const tocItems = extractHeadings(article.content)

  // Fetch related articles
  const allArticles = await getAllArticles()
  const relatedArticles = allArticles
    .filter((a) => a.category === article.metadata.category && a.slug !== slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background pt-8 md:pt-12 pb-20">
      <ReadingProgress />
      <article className="max-w-4xl mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-8">

            <div className="space-y-6">
              {category && (
                <div className="mb-6">
                  <CategoryBadge slug={category.slug} name={category.name} />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                {article.metadata.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-medium">
                {article.metadata.description}
              </p>
            </div>
          </div>

          {/* Image */}
          {article.metadata.image && (
            <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden border border-border shadow-2xl">
              <Image
                src={article.metadata.image || "/placeholder.svg"}
                alt={article.metadata.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Author Badge */}
          {author && <AuthorBadge author={author} date={article.metadata.date} />}

          {/* Table of Contents */}
          <TableOfContents items={tocItems} />

          {/* Content */}
          <div className="relative group mt-12 text-left">
            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent rounded-lg -z-10 md:group-hover:from-primary/10 group-active:from-primary/10 transition-colors duration-500" />
            <div className="md:rounded-lg md:bg-card/50 md:p-12 md:border md:border-border md:backdrop-blur-sm md:shadow-sm">
              <MdxContent source={article.content} />
            </div>
          </div>

          {/* Social Share Bottom */}
          <div className="pt-8 border-t border-border flex justify-center">
            <ShareButtons title={article.metadata.title} slug={slug} />
          </div>

          {/* Related Articles */}
          <div className="border-t border-border pt-12 mt-12 mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 tracking-tight">
              Articles <HighlightAccent>Similaires</HighlightAccent>
            </h2>
            {relatedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
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
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-lg bg-card border border-border shadow-inner">
                <p className="text-muted-foreground font-medium text-lg">Aucun article similaire trouvé pour le moment.</p>
                <Link href="/blog" className="text-primary font-bold hover:underline transition-all mt-4 inline-block">
                  Parcourir tous les articles <span className="font-mono">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  )
}
