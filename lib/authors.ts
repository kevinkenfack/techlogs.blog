import { promises as fs } from "fs"
import path from "path"

export interface AuthorMetadata {
  slug: string
  name: string
  bio: string
  avatar: string
  email: string
  twitter?: string
  github?: string
  content?: string
}

export async function getAllAuthors(): Promise<AuthorMetadata[]> {
  const authorsDir = path.join(process.cwd(), "content", "authors")

  try {
    const files = await fs.readdir(authorsDir)

    const authors = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(authorsDir, file), "utf-8")
          const [, frontmatter] = content.split("---")
          return parseFrontmatter(frontmatter) as AuthorMetadata
        }),
    )

    return authors
  } catch {
    return []
  }
}

export async function getAuthorBySlug(slug: string): Promise<AuthorMetadata | null> {
  const authorsDir = path.join(process.cwd(), "content", "authors")
  const filePath = path.join(authorsDir, `${slug}.mdx`)

  try {
    const content = await fs.readFile(filePath, "utf-8")
    const [, frontmatter, mdxContent] = content.split("---")
    const author = parseFrontmatter(frontmatter) as AuthorMetadata
    if (author) {
      author.content = mdxContent.trim()
    }
    return author
  } catch {
    return null
  }
}

function parseFrontmatter(frontmatter: string): AuthorMetadata | null {
  const metadata: any = {}

  frontmatter.split("\n").forEach((line) => {
    if (line.trim()) {
      const [key, ...valueParts] = line.split(":")
      const value = valueParts.join(":").trim().replace(/^"|"$/g, "")
      metadata[key.trim()] = value
    }
  })

  if (!metadata.slug || !metadata.name) {
    return null
  }

  return {
    slug: metadata.slug,
    name: metadata.name,
    bio: metadata.bio || "",
    avatar: metadata.avatar || "/placeholder.svg",
    email: metadata.email || "",
    twitter: metadata.twitter,
    github: metadata.github,
  } as AuthorMetadata
}
