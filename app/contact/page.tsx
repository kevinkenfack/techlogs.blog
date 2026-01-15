import type { Metadata } from "next"
import { HighlightAccent } from "@/components/highlight-accent"
import { siteConfig } from "@/lib/config"
import { Mail, MessageSquare, MapPin, Send, Github, Twitter, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contactez Nous",
  description: `Contactez l'équipe de ${siteConfig.name} pour toute question, suggestion ou partenariat.`,
  openGraph: {
    title: "Contactez Nous",
    description: `Contactez l'équipe de ${siteConfig.name} pour toute question, suggestion ou partenariat.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    type: "website",
    siteName: siteConfig.name,
    locale: "fr_FR",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contactez Nous",
    description: `Contactez l'équipe de ${siteConfig.name} pour toute question, suggestion ou partenariat.`,
    images: [siteConfig.ogImage],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-12 md:pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 text-balance">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
              Parlons <HighlightAccent>Technologie</HighlightAccent>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Une question, un retour ou une proposition de partenariat ? Notre équipe est à votre écoute.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-primary/5 border border-border p-8 md:p-10 rounded-lg space-y-8 backdrop-blur-sm shadow-sn">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                    placeholder="De quoi s'agit-il ?"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none shadow-inner"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-4 bg-primary text-primary-foreground font-black text-lg rounded-lg transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-3 shadow-sn group"
                >
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Info and Social */}
            <div className="space-y-10 lg:pl-8">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">Informations de contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Email professionnel</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Support technique</p>
                      <p className="text-xl font-bold text-foreground">Disponible 5j/7</p>
                      <p className="text-sm text-muted-foreground mt-0.5">Réponse garantie sous 24h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Notre base</p>
                      <p className="text-xl font-bold text-foreground">Paris, France</p>
                      <p className="text-sm text-muted-foreground mt-0.5">Équipe 100% remote</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-border/50">
                <h3 className="text-xl font-bold text-foreground">Suivez notre veille technique</h3>
                <div className="flex gap-4">
                  {[ 
                    { icon: <Twitter className="w-5 h-5" />, href: siteConfig.links.twitter, label: "X" },
                    { icon: <Github className="w-5 h-5" />, href: siteConfig.links.github, label: "GitHub" },
                    { icon: <Linkedin className="w-5 h-5" />, href: siteConfig.links.linkedin, label: "LinkedIn" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
