import Link from "next/link";
import { siteConfig } from "@/lib/config";
import {
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background pt-20 pb-10 overflow-hidden">
      {/* Background pattern - Tech style */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='currentColor' fill-opacity='1'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <Cpu size={24} />
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">
                Tech<span className="text-primary text-glow">Vision</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Le carrefour de l'innovation et du savoir technique. Décrypter le
              futur, un article à la fois.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: <Twitter size={18} />,
                  href: siteConfig.links.twitter,
                  label: "Twitter",
                },
                {
                  icon: <Github size={18} />,
                  href: siteConfig.links.github,
                  label: "GitHub",
                },
                {
                  icon: <Linkedin size={18} />,
                  href: siteConfig.links.linkedin,
                  label: "LinkedIn",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary/5 border border-border flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all active:scale-95 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Navigation
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "Nos Articles", href: "/blog" },
                  { label: "Catégories", href: "/category" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="w-fit text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group text-sm md:text-base font-medium"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Communauté
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/become-author"
                    className="w-fit text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group text-sm md:text-base font-medium"
                  >
                    Devenir Auteur
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary"
                    />
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group text-sm md:text-base font-medium"
                  >
                    Open Source
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary"
                    />
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Focus
              </h4>
              <ul className="space-y-4">
                {siteConfig.categories.slice(0, 4).map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="w-fit text-muted-foreground hover:text-primary transition-colors text-sm md:text-base font-medium block"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm font-medium">
            © {currentYear} <span className="text-primary font-bold">{siteConfig.name}.</span> Tous Droits Réservés
          </p>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <Link
              href="#privacy"
              className="w-fit hover:text-primary transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="#terms"
              className="w-fit hover:text-primary transition-colors"
            >
              Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
