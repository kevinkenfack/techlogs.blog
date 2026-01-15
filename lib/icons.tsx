import { Code, Brain, Server, Shield, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Server,
  Shield,
}

export function getCategoryIcon(iconName: string) {
  return iconMap[iconName] || Code
}
