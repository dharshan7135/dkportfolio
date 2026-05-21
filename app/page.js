'use client'

import Navbar       from '@/components/ui/Navbar'
import VideoIntro   from '@/components/sections/VideoIntro'
import HeroSection  from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'

export default function Home() {
  return (
    <>
      <Navbar />
      {/*
        Single 300vh container — all sections share the same sticky context.
        Each section is position:sticky top:0 with increasing z-index, so every
        section slides UP over the previous one as you scroll down.
      */}
      <main style={{ height: '100vh', overflowY: 'scroll' }}>
        <div style={{ height: '300vh' }}>
          <VideoIntro />
          <HeroSection />
          <AboutSection />
        </div>
      </main>
    </>
  )
}
