"use client"

import { Facebook, Send, MessageCircle, Copy, Check } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ShareButtonsProps {
  title: string
  slug: string
  label?: string
}

export function ShareButtons({ title, slug, label = "Partager l'article" }: ShareButtonsProps) {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const shareText = `${title} ${url}`
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(url)

  const handleCopy = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url)
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement("textarea")
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopied(true)
      toast.success("Lien copié !")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Échec de la copie")
    }
  }

  const platforms = [
    {
      name: "X",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      href: `https://wa.me/?text=${encodedText}`,
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(title)}`,
    },
  ]

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center gap-4 w-full">
        <div className="h-px grow bg-linear-to-r from-transparent via-border to-transparent" />
        <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] whitespace-nowrap">
          {label}
        </span>
        <div className="h-px grow bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.name}
            className="group/btn"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center cursor-pointer active:scale-90 shadow-sm">
              {platform.icon}
            </div>
          </a>
        ))}
        
        <button
          onClick={handleCopy}
          title="Copier le lien"
          className="w-12 h-12 rounded-lg bg-primary/5 border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center cursor-pointer active:scale-90 group/copy shadow-sm"
        >
          {copied ? <Check size={20} className="text-green-500 animate-in zoom-in duration-300" /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  )
}
