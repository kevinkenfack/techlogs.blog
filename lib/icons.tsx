import { Code, Brain, Server, Shield, Smartphone, Cloud, Link as LinkIcon, Cpu, BarChart, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Server,
  Shield,
  Smartphone, 
  Cloud,
  Link: LinkIcon,
  Cpu,
  BarChart,
}

export function getCategoryIcon(iconName: string) {
  return iconMap[iconName] || Code
}
