import { MDXRemote } from "next-mdx-remote/rsc"
import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import { HighlightAccent } from "@/components/highlight-accent"
import rehypePrettyCode from "rehype-pretty-code"
import { cn } from "@/lib/utils"

type MDXComponents = {
  [key: string]: React.ComponentType<any>
}

const components: MDXComponents = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={cn("mt-2 scroll-m-20 text-3xl font-bold tracking-tight text-foreground mb-6", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn("mt-10 scroll-m-20 text-2xl font-semibold tracking-tight text-foreground mb-4 border-b border-border pb-2", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground mb-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn("leading-7 text-muted-foreground not-first:mt-6 text-base md:text-lg", className)}
      {...props}
    />
  ),
  a: ({ className, href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href?.startsWith("/")
    const linkClasses = cn(
      "font-semibold text-primary hover:opacity-80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all",
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
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 marker:text-primary text-muted-foreground items-start text-left", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2 marker:text-primary text-muted-foreground items-start text-left", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-bold text-primary", className)} {...props} />
  ),
  HighlightAccent,
}

interface AuthorMdxContentProps {
  source: string
}

export function AuthorMdxContent({ source }: AuthorMdxContentProps) {
  return (
    <div className="author-mdx-content max-w-none">
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

