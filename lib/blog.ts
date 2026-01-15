import { promises as fs } from "fs"
import path from "path"
import { getAuthorBySlug } from "./authors"

export interface ArticleMetadata {
  title: string
  description: string
  date: string
  category: string
  author: string
  image: string
  keywords: string[]
  slug?: string
}

export async function getAllArticles(): Promise<(ArticleMetadata & { slug: string })[]> {
  const articlesDir = path.join(process.cwd(), "content", "articles")

  try {
    const files = await fs.readdir(articlesDir)

    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(articlesDir, file), "utf-8")
          const [, frontmatter] = content.split("---")

          const metadata = parseFrontmatter(frontmatter)
          const slug = file.replace(".mdx", "")
          const author = await getAuthorBySlug(metadata.author)

          return { ...metadata, slug, author } as ArticleMetadata & { slug: string }
        }),
    )

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

function parseFrontmatter(frontmatter: string): ArticleMetadata {
  const metadata: any = {}

  frontmatter.split("\n").forEach((line) => {
    if (line.trim()) {
      const [key, ...valueParts] = line.split(":")
      let value = valueParts.join(":").trim().replace(/^"|"$/g, "")

      if (key.trim() === "keywords") {
        value = value
          .replace(/^\[|]$/g, "")
          .split(",")
          .map((k: string) => k.trim().replace(/^"|"$/g, ""))
      }

      metadata[key.trim()] = value
    }
  })

  return metadata as ArticleMetadata
}
