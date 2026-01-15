import Link from "next/link"
import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { ComponentPropsWithoutRef } from "react"
import { HighlightAccent } from "@/components/highlight-accent"
import rehypePrettyCode from "rehype-pretty-code"
import { cn } from "@/lib/utils"

type MDXComponents = {
  [key: string]: React.ComponentType<any>
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

const getTextContent = (children: any): string => {
  if (typeof children === "string") return children
  if (Array.isArray(children)) return children.map(getTextContent).join("")
  if (children?.props?.children) return getTextContent(children.props.children)
  return ""
}

const Heading = ({ level, children, className }: { level: 1 | 2 | 3 | 4; children: any; className: string }) => {
  const Tag = `h${level}` as const
  const text = getTextContent(children)
  const id = slugify(text)

  return (
    <Tag id={id} className={cn("group flex items-center scroll-m-20", className)}>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 opacity-0 group-hover:opacity-100 text-primary hover:opacity-80 font-mono transition-all no-underline"
        aria-label={`Lien vers la section ${text}`}
      >
        #
      </a>
    </Tag>
  )
}

const components: MDXComponents = {
  h1: ({ children }: ComponentPropsWithoutRef<"h1">) => (
    <Heading level={1} className="mt-2 text-4xl font-bold tracking-tight text-foreground lg:text-5xl first:mt-0 mb-6 font-sans">
      {children}
    </Heading>
  ),
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => (
    <Heading level={2} className="mt-12 text-3xl font-bold tracking-tight text-foreground first:mt-0 mb-4 border-b border-border pb-2 font-sans">
      {children}
    </Heading>
  ),
  h3: ({ children }: ComponentPropsWithoutRef<"h3">) => (
    <Heading level={3} className="mt-8 text-2xl font-bold tracking-tight text-foreground mb-4 font-sans">
      {children}
    </Heading>
  ),
  h4: ({ children }: ComponentPropsWithoutRef<"h4">) => (
    <Heading level={4} className="mt-8 text-xl font-bold tracking-tight text-foreground mb-4 font-sans">
      {children}
    </Heading>
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn("leading-7 text-muted-foreground not-first:mt-6 text-lg", className)}
      {...props}
    />
  ),
  a: ({ className, href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href?.startsWith("/")
    const linkClasses = cn(
      "font-bold text-primary hover:opacity-80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all",
      className
    )
    
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className={linkClasses}
          {...props}
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  },
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 marker:text-primary text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2 marker:text-primary text-muted-foreground", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-primary/5 py-6 rounded-r-xl pr-6", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("rounded-lg border border-border my-10 w-full shadow-lg", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => <hr className={cn("my-10 border-border/50", className)} {...props} />,
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr className={cn("m-0 border-t border-border p-0 even:bg-accent/30", className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cn("border-b border-r border-border px-4 py-3 text-left font-bold text-foreground last:border-r-0", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={cn("border-r border-border px-4 py-3 text-left text-muted-foreground last:border-r-0", className)}
      {...props}
    />
  ),
  HighlightAccent,
}

interface MdxContentProps {
  source: string
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="mdx-content max-w-none">
      <MDXRemote 
        source={source} 
        components={components} 
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  onVisitLine(node: any) {
                    if (node.children.length === 0) {
                      node.children = [{ type: "text", value: " " }]
                    }
                  },
                },
              ],
            ],
          },
        }}
      />
    </div>
  )
}

