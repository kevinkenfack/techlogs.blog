import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { siteConfig } from "@/lib/config";
import { getAllArticles } from "@/lib/blog";
import { getCategoryIcon } from "@/lib/icons";
import { HighlightAccent } from "@/components/highlight-accent";
import { cn } from "@/lib/utils";

export default async function Home() {
  const allArticles = await getAllArticles();
  const featuredArticles = allArticles.slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Mobile First */}
      <section className="relative py-16 md:pt-20 md:pb-28 lg:pt-24 lg:pb-36 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse duration-1000" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse duration-1000 delay-500" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-lg border border-primary/20 bg-primary/5 shadow-sm">
              <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider">
                ✨ Découvrez l'élite du savoir technique
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance tracking-tight leading-tight sm:leading-[1.1]">
              L'Élite de la Technologie, <br />
              <HighlightAccent>Décryptée pour Vous</HighlightAccent>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Plongez au cœur de l'expertise. De l'Intelligence Artificielle de
              pointe aux architectures Cloud de demain, nous forgeons le savoir
              qui définit le futur du digital.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-6 sm:pt-8">
              <Link
                href="/blog"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 active:scale-95 transition-all text-sm sm:text-base shadow-lg shadow-primary/20 flex items-center justify-center text-center group"
              >
                Explorer nos articles
                <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/category"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-border text-primary hover:bg-primary/10 hover:border-primary/50 active:scale-95 transition-all text-sm font-bold uppercase tracking-tight shadow-sm group"
              >
                <span className="group-hover:rotate-12 transition-transform">#</span>
                <span>Toutes les catégories</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles - Mobile First */}
      <section className="py-12 md:py-20 border-t border-border/50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Articles en <HighlightAccent>Vedette</HighlightAccent>
                </h2>
                <p className="text-muted-foreground mt-2">
                  Nos publications les plus populaires et impactantes
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex text-primary font-bold hover:underline underline-offset-4 items-center gap-1 group"
              >
                Voir tout le blog
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
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

            <div className="text-center pt-10 md:hidden">
              <Link
                href="/blog"
                className="inline-block px-8 py-3 rounded-lg border border-border text-foreground font-bold hover:bg-accent active:scale-95 transition-all text-base"
              >
                Explorer tous les articles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Mobile First */}
      <section className="py-20 md:py-32 border-t border-border/50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Explorez nos <HighlightAccent>Catégories</HighlightAccent>
              </h2>
              <p className="text-muted-foreground text-lg mt-2">
                Trouvez les sujets qui vous passionnent
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteConfig.categories.map((category) => {
                const Icon = getCategoryIcon(category.icon);
                const categoryArticles = allArticles.filter(
                  (a) => a.category === category.slug
                );

                return (
                  <Link key={category.slug} href={`/category/${category.slug}`}>
                    <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all flex flex-col gap-4 cursor-pointer shadow-sm hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="p-3 rounded-lg bg-primary/10 mb-3 w-fit group-hover:bg-primary/20 transition-colors">
                            <Icon size={24} className="text-primary" />
                          </div>
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg tracking-tight">
                            {category.name}
                          </h3>
                        </div>
                        <span className="text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 text-xl font-mono">
                          →
                        </span>
                      </div>
                      
                      <div className="border-t border-border/50 pt-4">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                          {categoryArticles.length} article{categoryArticles.length > 1 ? 's' : ''} disponible{categoryArticles.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 md:py-32 border-t border-border/50 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative group p-8 md:p-16 rounded-3xl bg-card border border-border overflow-hidden text-center shadow-2xl">
            {/* Background glowing circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-1000" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-1000" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                  Restez à la{" "}
                  <HighlightAccent>Pointe du Savoir</HighlightAccent>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Rejoignez plus de 5,000 passionnés et recevez chaque semaine
                  une sélection exclusive de nos meilleurs décryptages
                  technologiques.
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-6 py-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base shadow-inner"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-black text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  S'abonner
                </button>
              </form>

              <p className="text-xs text-muted-foreground/60 font-medium">
                Garanti sans spam. Désinscrivez-vous à tout moment d'un simple
                clic.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
