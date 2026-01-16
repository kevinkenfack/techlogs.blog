"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-lg sm:text-2xl text-primary transition-opacity hover:opacity-90"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                  ◆
                </div>
                <span className="hidden sm:inline tracking-tight">{siteConfig.name}</span>
              </Link>
            </div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:flex items-center gap-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 px-3 py-1.5 rounded-lg active:scale-95 transition-all duration-200"
              >
                Nos Articles
              </Link>
              <Link
                href="/category"
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 px-3 py-1.5 rounded-lg active:scale-95 transition-all duration-200"
              >
                Catégories
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 px-3 py-1.5 rounded-lg active:scale-95 transition-all duration-200"
              >
                À Propos
              </Link>
              <Link
                href="/authors"
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 px-3 py-1.5 rounded-lg active:scale-95 transition-all duration-200"
              >
                Auteurs
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/become-author"
                className="hidden md:block text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 shadow-sm"
              >
                Devenir auteur
              </Link>
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-border text-primary hover:bg-primary/10 hover:border-primary/50 active:scale-95 transition-all text-sm font-bold uppercase tracking-tight shadow-sm group"
              >
                <span className="group-hover:rotate-12 transition-transform">✉</span>
                <span>Contact</span>
              </Link>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-accent active:scale-95 rounded-lg transition-all shrink-0 border border-transparent hover:border-border"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          role="presentation"
        >
          {/* Backdrop (Adapts to background) */}
          <div className="absolute inset-0 bg-background/98 backdrop-blur-xl animate-in fade-in duration-300" />

          <div className="absolute inset-0 w-full flex flex-col items-start justify-start gap-6 pt-32 px-8">
            <Link
              href="/blog"
              className="text-4xl font-bold text-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg active:scale-95 transition-all duration-200 w-full text-left tracking-tight"
              onClick={() => setIsMenuOpen(false)}
            >
              Nos Articles
            </Link>
            <Link
              href="/category"
              className="text-4xl font-bold text-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg active:scale-95 transition-all duration-200 w-full text-left tracking-tight"
              onClick={() => setIsMenuOpen(false)}
            >
              Catégories
            </Link>
            <Link
              href="/about"
              className="text-4xl font-bold text-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg active:scale-95 transition-all duration-200 w-full text-left tracking-tight"
              onClick={() => setIsMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link
              href="/authors"
              className="text-4xl font-bold text-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg active:scale-95 transition-all duration-200 w-full text-left tracking-tight"
              onClick={() => setIsMenuOpen(false)}
            >
              Auteurs
            </Link>

            <div className="mt-auto w-full pb-12 flex flex-col gap-4">
              <Link
                href="/become-author"
                className="w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Devenir auteur
              </Link>
              <Link
                href="/contact"
                className="w-full text-center px-4 py-2 rounded-lg bg-primary/5 border border-border text-primary hover:bg-primary/10 hover:border-primary/50 active:scale-95 transition-all font-bold flex items-center justify-center gap-2 shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>✉</span>
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
