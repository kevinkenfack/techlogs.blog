import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { HighlightAccent } from "@/components/highlight-accent"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "À Propos",
  description: "En savoir plus sur " + siteConfig.name + " et notre mission",
  openGraph: {
    title: "À Propos",
    description: "En savoir plus sur " + siteConfig.name + " et notre mission",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    type: "website",
    siteName: siteConfig.name,
    locale: "fr_FR",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: "À Propos - " + siteConfig.name,
    description: "En savoir plus sur " + siteConfig.name + " et notre mission",
    images: [siteConfig.ogImage],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-12 md:pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-24 md:space-y-32">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
              À Propos de <HighlightAccent>{siteConfig.name}</HighlightAccent>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Votre source d'inspiration pour l'innovation technologique</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Mission */}
            <div className="space-y-4 p-8 rounded-lg bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-primary">Notre Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                {siteConfig.name} est un blog technologique dédié à explorer les frontières de l'innovation digitale. Nous
                couvrons les dernières tendances en développement web, intelligence artificielle, DevOps et sécurité.
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-4 p-8 rounded-lg bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-primary">Notre Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous croyons que la technologie doit être accessible à tous. À travers des articles détaillés, des
                tutoriels pratiques et des analyses approfondies, nous aidons développeurs et entreprises à rester à la
                pointe de l'innovation.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Excellence", description: "Contenu de qualité, bien recherché et pertinent" },
                  { title: "Innovation", description: "Toujours à la pointe des dernières technologies" },
                  { title: "Accessibilité", description: "Explications claires pour tous les niveaux" },
                ].map((value) => (
                  <div key={value.title} className="p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all group shadow-sm hover:shadow-md">
                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:scale-105 transition-transform origin-left">{value.title}</h3>
                    <p className="text-muted-foreground text-sm font-medium">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Creative CTA - Match Become Author style */}
          <section className="relative group p-10 md:p-16 rounded-3xl bg-card border border-border overflow-hidden text-center shadow-2xl">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-50" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-1000" />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">Rejoignez <HighlightAccent>l'Aventure</HighlightAccent></h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
                  Vous avez une expertise à partager ? Nous sommes toujours à la recherche de nouveaux auteurs passionnés pour enrichir notre communauté.
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
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
