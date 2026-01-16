import type { Metadata } from "next"
import Image from "next/image"
import BlogCard from "@/components/blog-card"
import { promises as fs } from "fs"
import path from "path"
import { getAuthorBySlug, getAllAuthors } from "@/lib/authors"
import { HighlightAccent } from "@/components/highlight-accent"
import { AuthorMdxContent } from "@/components/author-mdx-content"
import { Mail, Twitter, Github } from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { siteConfig } from "@/lib/config"

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return {
      title: "Auteur introuvable",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const ogUrl = new URL(`${baseUrl}/api/og-author`)
  ogUrl.searchParams.set("name", author.name)
  ogUrl.searchParams.set("bio", author.bio)
  if (author.avatar) ogUrl.searchParams.set("avatar", `${baseUrl}${author.avatar}`)

  return {
    title: `Profile de ${author.name}`,
    description: author.bio,
    openGraph: {
     title: `Découvrez le profil de ${author.name} ainsi que ses publications`,
      description: author.bio,
      url: `${baseUrl}/authors/${slug}`,
      type: "profile",
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Découvrez le profil de ${author.name} ainsi que ses publications`,
      description: author.bio,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

async function getArticlesByAuthor(authorSlug: string) {
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

  return articles.filter((article) => article.author === authorSlug)
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  const articles = await getArticlesByAuthor(slug)

  if (!author) {
    return (
      <main className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">Auteur introuvable</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-8 md:pt-12 pb-20 text-foreground">
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {/* Author Header */}
          <div className="space-y-8">
             <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                  Profil de <HighlightAccent>{author.name}</HighlightAccent>
                </h1>
             </div>

            <div className="p-8 md:p-12 rounded-lg bg-card border border-border shadow-xl relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
                <div className="relative group/avatar">
                  <div className="absolute -inset-2 bg-primary/10 rounded-lg blur-xl group-hover/avatar:bg-primary/20 transition-all duration-500" />
                  <Image
                    src={author.avatar || "/authors/placeholder-user.jpg"}
                    alt={author.name}
                    width={200}
                    height={200}
                    className="relative rounded-lg object-cover shrink-0 w-32 h-32 md:w-48 md:h-48 border-4 border-card shadow-lg"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <p className="text-xl md:text-2xl text-primary italic font-serif font-bold tracking-tight leading-snug">
                    {author.bio}
                  </p>
                  <div className="flex flex-nowrap gap-2 md:gap-3 justify-center md:justify-start overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <a
                      href={`mailto:${author.email}`}
                      className="whitespace-nowrap px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all text-xs md:text-sm font-black flex items-center gap-2"
                    >
                      <Mail size={16} className="shrink-0" />
                      Email
                    </a>
                    {author.twitter && (
                      <a
                        href={author.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all text-xs md:text-sm font-black flex items-center gap-2"
                      >
                        <Twitter size={16} className="shrink-0" />
                        X
                      </a>
                    )}
                    {author.github && (
                      <a
                        href={author.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all text-xs md:text-sm font-black flex items-center gap-2"
                      >
                        <Github size={16} className="shrink-0" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Author Detailed Content */}
          {author.content && (
            <div className="relative group mt-12 text-left">
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent rounded-lg -z-10 md:group-hover:from-primary/10 transition-colors duration-500" />
              <div className="md:rounded-lg md:bg-card/50 md:p-12 md:border md:border-border md:backdrop-blur-sm md:shadow-sm">
                <AuthorMdxContent source={author.content} />
              </div>
            </div>
          )}

          {/* Social Share Profile */}
          <div className="pt-8 border-t border-border flex justify-center">
            <ShareButtons 
              title={`Découvrez le profil de ${author.name} sur ${siteConfig.name}`} 
              slug={`authors/${slug}`} 
              label="Partager le profil"
            />
          </div>

          {/* Author's Articles */}
          <div className="space-y-8 pt-8 text-left">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Articles de <HighlightAccent>{author.name.split(" ")[0]}</HighlightAccent></h2>
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <BlogCard
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    description={article.description}
                    date={article.date}
                    category={article.category}
                    image={article.image}
                    author={author}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-lg bg-card border border-border mt-6">
                 <p className="text-muted-foreground font-medium italic">Cet auteur n'a pas encore d'articles publiés.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
