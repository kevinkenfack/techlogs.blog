import type { Metadata } from "next";
import { HighlightAccent } from "@/components/highlight-accent";
import { siteConfig } from "@/lib/config";
import {
  Github,
  Edit3,
  GitPullRequest,
  UserPlus,
  FileCode,
  Image as ImageIcon,
  FolderTree,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Devenir Auteur | ${siteConfig.name}`,
  description: `Guide complet pour contribuer au blog ${siteConfig.name} via GitHub et MDX.`,
  openGraph: {
    title: `Devenir Auteur | ${siteConfig.name}`,
    description: `Guide complet pour contribuer au blog ${siteConfig.name} via GitHub et MDX.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/become-author`,
    type: "website",
    siteName: siteConfig.name,
    locale: "fr_FR",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Devenir Auteur | ${siteConfig.name}`,
    description: `Guide complet pour contribuer au blog ${siteConfig.name} via GitHub et MDX.`,
    images: [siteConfig.ogImage],
  },
};

export default function BecomeAuthorPage() {
  return (
    <main className="min-h-screen bg-background pt-12 md:pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="text-center space-y-8 mb-24 md:mb-32 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              Contribuez à <br />
              <HighlightAccent>{siteConfig.name}</HighlightAccent>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 font-medium">
              Partagez votre expertise technique avec notre communauté en
              suivant notre workflow Open Source.
            </p>
          </div>
        </section>

        <div className="space-y-24 md:space-y-32">
          {/* Phase 1: Author Setup */}
          <section className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary font-bold shrink-0 shadow-lg shadow-primary/10">
                1
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Étape 1 : Votre Profil Auteur
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-8 rounded-lg bg-card border border-border space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 text-primary font-bold uppercase text-xs tracking-widest">
                    <FileCode size={18} />
                    Le fichier MDX
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Créez un fichier dans{" "}
                    <code className="bg-primary/5 px-1.5 py-0.5 rounded text-primary font-bold">
                      content/authors/[votre-slug].mdx
                    </code>
                    .
                  </p>
                  <pre className="bg-background p-4 rounded-lg text-xs font-mono text-primary/80 border border-border/50 overflow-x-auto shadow-inner">
                    {`---
slug: "jean-dupont"
name: "Jean Dupont"
bio: "Dév Fullstack & IoT"
avatar: "/authors/jean-dupont.png"
email: "jean@example.com"
twitter: "https://x.com/jean"
github: "https://github.com/jean"
---`}
                  </pre>
                </div>

                <div className="p-8 rounded-lg bg-card border border-border space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 text-primary font-bold uppercase text-xs tracking-widest">
                    <ImageIcon size={18} />
                    Votre Photo
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Placez votre portrait dans{" "}
                    <code className="bg-primary/5 px-1.5 py-0.5 rounded text-primary font-bold">
                      public/authors/[votre-slug].png
                    </code>
                    . Utilisez de préférence un format carré (ex: 400x400px).
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center p-8 bg-primary/5 rounded-lg border border-border relative overflow-hidden group shadow-inner">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <UserPlus
                  size={120}
                  className="text-primary/20 group-hover:text-primary/40 transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </section>

          {/* Phase 2: Article Creation */}
          <section className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary font-bold shrink-0 shadow-lg shadow-primary/10">
                2
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Étape 2 : Rédaction de l'Article
              </h2>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-lg bg-card border border-border space-y-4 md:col-span-2 shadow-sm">
                  <div className="flex items-center gap-3 text-primary font-bold uppercase text-xs tracking-widest">
                    <Edit3 size={18} />
                    Contenu MDX
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Créez votre article dans{" "}
                    <code className="bg-primary/5 px-1.5 py-0.5 rounded text-primary font-bold">
                      content/articles/[votre-slug-article].mdx
                    </code>
                    . Le format MDX vous permet d'intégrer des composants React
                    directement dans votre texte (si configuré).
                  </p>
                  <pre className="bg-background p-4 rounded-lg text-xs font-mono text-primary/80 border border-border/50 overflow-x-auto shadow-inner">
                    {`---
title: "Maîtriser React 19"
description: "Découvrez les nouvelles fonctionnalités..."
date: "2024-03-20"
category: "web-dev"
image: "/articles/react-19/cover.png"
author: "jean-dupont"
---

# Introduction
Votre contenu commence ici...`}
                  </pre>
                </div>

                <div className="p-8 rounded-lg bg-card border border-border space-y-6 shadow-sm">
                  <div className="flex items-center gap-3 text-primary font-bold uppercase text-xs tracking-widest">
                    <FolderTree size={18} />
                    Organisation des médias
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm font-medium">
                      Toutes les images de l'article doivent être regroupées
                      dans :
                    </p>
                    <div className="p-4 rounded-lg bg-background font-mono text-xs text-primary border border-border shadow-inner leading-relaxed">
                      public/articles/
                      <br />
                      &ensp;└── [slug-article]/
                      <br />
                      &ensp;&ensp;&ensp;&ensp;├── cover.png
                      <br />
                      &ensp;&ensp;&ensp;&ensp;└── diagramme.svg
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Phase 3: Pull Request */}
          <section className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary font-bold shrink-0 shadow-lg shadow-primary/10">
                3
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Étape 3 : Soumission & Publication
              </h2>
            </div>

            <div className="p-6 md:p-12 rounded-lg bg-linear-to-b from-card to-background border border-border shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">
                    Le Workflow GitHub
                  </h3>
                  <ul className="space-y-4">
                    {[
                      `Forkez le dépôt de ${siteConfig.name}`,
                      "Créez une branche descriptive (ex: feature/article-react19).",
                      "Committez vos fichiers (MDX + Images).",
                      "Ouvrez une Pull Request (PR) vers la branche main.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground font-medium">
                        <CheckCircle2
                          size={20}
                          className="text-primary shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center justify-center p-12 bg-background/50 rounded-lg border border-border shadow-inner group">
                  <GitPullRequest size={80} className="text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-500" />
                  <p className="mt-6 text-xs text-muted-foreground text-center uppercase tracking-widest font-black">
                    Review System
                  </p>
                </div>
              </div>
            </div>

            {/* Creative Bottom CTA */}
            <div className="relative group p-8 sm:p-12 md:p-20 rounded-lg bg-card border border-border overflow-hidden text-center shadow-2xl">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-50" />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-1000" />

              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                    Prêt à partager{" "}
                    <HighlightAccent>votre savoir ?</HighlightAccent>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed font-medium">
                    Rejoignez notre équipe de contributeurs et inspirez des
                    milliers de passionnés.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-black text-lg rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                  >
                    <Github size={22} />
                    Voir sur GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Guidelines info */}
          <section className="text-center pt-8 border-t border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">
              Conseils pour une PR acceptée
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-6 bg-card border border-border rounded-lg text-muted-foreground font-medium italic shadow-sm hover:border-primary/30 transition-colors">
                "Vérifiez l'orthographe et la grammaire."
              </div>
              <div className="p-6 bg-card border border-border rounded-lg text-muted-foreground font-medium italic shadow-sm hover:border-primary/30 transition-colors">
                "Utilisez des images de haute qualité."
              </div>
              <div className="p-6 bg-card border border-border rounded-lg text-muted-foreground font-medium italic shadow-sm hover:border-primary/30 transition-colors">
                "Commentez votre code source si nécessaire."
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
