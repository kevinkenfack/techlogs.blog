import { getAllAuthors } from "@/lib/authors"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { HighlightAccent } from "@/components/highlight-accent"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Nos Auteurs | TechVision",
  description: "Découvrez l'équipe derrière TechVision",
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <main className="min-h-screen bg-background pt-8 md:pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-20">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
              Nos <HighlightAccent>Auteurs</HighlightAccent>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Retrouvez les experts passionnés qui partagent leur savoir sur TechVision.
            </p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Link key={author.slug} href={`/authors/${author.slug}`} className="group">
                <div className="h-full bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.98]">
                  {/* Cover/Avatar Area */}
                  <div className="p-8 flex flex-col items-center border-b border-border bg-accent/30 group-hover:bg-accent/50 transition-colors">
                    <div className="relative w-32 h-32 mb-4 group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={author.avatar || "/placeholder.svg"}
                        alt={author.name}
                        fill
                        className="rounded-lg object-cover border-4 border-card group-hover:border-primary/50 transition-all shadow-lg"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {author.name}
                    </h2>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Contributeur</p>
                  </div>

                  {/* Bio */}
                  <div className="p-6 grow flex flex-col justify-center">
                    <p className="text-muted-foreground text-center line-clamp-3 leading-relaxed font-medium">{author.bio}</p>
                  </div>

                  {/* Footer/Link */}
                  <div className="p-4 bg-background/50 text-center border-t border-border group-hover:bg-accent/20 transition-all">
                    <span className="text-sm font-bold text-primary group-hover:translate-x-1 inline-block transition-all">
                      Voir le profil →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Creative CTA - Match Become Author style */}
          <section className="relative group p-10 md:p-16 rounded-lg bg-card border border-border overflow-hidden text-center w-full shadow-2xl">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-50" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-1000" />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4 text-balance">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                  Envie de nous <HighlightAccent>Rejoindre ?</HighlightAccent>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Partagez votre expertise technique avec notre communauté et contribuez à forger le savoir de demain.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/become-author"
                  className="group/btn relative px-8 py-4 bg-primary text-primary-foreground font-black text-lg rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl shadow-primary/20"
                >
                  Devenir Auteur
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                  Processus simple via Pull Request GitHub
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
