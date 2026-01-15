import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {/* 404 Animation */}
        <div className="space-y-4 mb-8 font-sans">
          <h1 className="text-9xl font-bold text-foreground animate-pulse tracking-tighter">404</h1>
          <p className="text-3xl font-bold text-foreground">Page non trouvée</p>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium shadow-sm hover:shadow-md"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors shadow-sm"
          >
            Voir les articles
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 rounded-lg bg-card border border-border/50 shadow-sm">
          <p className="text-muted-foreground">
            Si vous pensez qu'il y a une erreur, veuillez{" "}
            <a href="mailto:contact@techvision.fr" className="text-foreground hover:underline font-medium decoration-primary decoration-2 underline-offset-4">
              nous contacter
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
