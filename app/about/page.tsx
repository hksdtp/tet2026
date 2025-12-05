import { Hero } from '@/components/about/Hero'
import { Story } from '@/components/about/Story'
import { Craftsmanship } from '@/components/about/Craftsmanship'
import { Values } from '@/components/about/Values'
import { Team } from '@/components/about/Team'
import { Contact } from '@/components/about/Contact'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Story />
      <Craftsmanship />
      <Values />
      <Team />
      <Contact />
    </div>
  )
}
