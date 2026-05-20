'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/button'

export default function VideoIntro({ heroRef }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!videoRef.current) return
    const tween = gsap.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
    return () => tween.kill()
  }, [])

  function handleEnded() {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative flex-shrink-0"
      style={{
        height: '100vh',
        scrollSnapAlign: 'start',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        data-testid="intro-video"
        src="/assets/about-me.mp4"
        autoPlay
        muted={muted}
        playsInline
        onEnded={handleEnded}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      <Button
        variant="ghost"
        onClick={() => setMuted(m => !m)}
        className="absolute bottom-8 right-8 z-10 rounded-full text-xs font-semibold tracking-widest uppercase px-4 h-9"
        style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff',
        }}
      >
        {muted ? '🔇  TAP FOR SOUND' : '🔊  SOUND ON'}
      </Button>
    </section>
  )
}
