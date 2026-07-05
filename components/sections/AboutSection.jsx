'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { FaGithub, FaLinkedinIn, FaInstagram, FaUser, FaCode, FaTrophy, FaBrain, FaRocket } from 'react-icons/fa'
import { SiMongodb, SiSocketdotio, SiDocker, SiOdoo } from 'react-icons/si'
import { FaCogs } from 'react-icons/fa'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/AboutSection.module.css'

const BIO = profile.bio
const WHO_ITEMS = [
  "MongoDB Atlas",
  "Socket.io",
  "Docker & Git",
  "Odoo ERP",
  "AI Automation"
]

const SKILL_ICONS = {
  "MongoDB Atlas": <SiMongodb style={{ color: '#47A248' }} />,
  "Socket.io": <SiSocketdotio style={{ color: '#ffffff' }} />,
  "Docker & Git": <SiDocker style={{ color: '#2496ED' }} />,
  "Odoo ERP": <SiOdoo style={{ color: '#714B67' }} />,
  "AI Automation": <FaCogs style={{ color: '#f7931e' }} />
}

const STAT_ICONS = {
  code: <FaCode />,
  trophy: <FaTrophy />,
  brain: <FaBrain />,
  rocket: <FaRocket />
}

const ICON_MAP = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, Instagram: FaInstagram }
const SOCIALS = profile.socials.map(s => ({ Icon: ICON_MAP[s.label], href: s.href, label: s.label }))

export default function AboutSection() {
  const sectionRef  = useRef(null)
  const photoRef    = useRef(null)
  const contentRef  = useRef(null)
  const socialsRef  = useRef(null)
  const intervalRef = useRef(null)

  const [typed, setTyped] = useState(0)
  const [done,  setDone]  = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const scroller = document.querySelector('main')
    if (!scroller) return

    let isActive = false

    function resetAnim() {
      clearInterval(intervalRef.current)
      gsap.killTweensOf(photoRef.current)
      gsap.killTweensOf(contentRef.current)
      const socialIcons = socialsRef.current?.querySelectorAll('a') ?? []
      gsap.killTweensOf(socialIcons)
      gsap.set(photoRef.current,   { opacity: 0, x: -50 })
      gsap.set(contentRef.current, { opacity: 0, y:  40 })
      gsap.set(socialIcons, { opacity: 0, y: 20 })
      setTyped(0)
      setDone(false)
    }

    function playAnim() {
      resetAnim()
      gsap.to(photoRef.current,   { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' })
      gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 })
      const socialIcons = socialsRef.current?.querySelectorAll('a') ?? []
      gsap.to(socialIcons, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.5 })

      let i = 0
      intervalRef.current = setInterval(() => {
        i = Math.min(i + 6, BIO.length)
        setTyped(i)
        if (i >= BIO.length) {
          clearInterval(intervalRef.current)
          setDone(true)
        }
      }, 16)
    }

    resetAnim()

    function onScroll() {
      const inRange = Math.abs(scroller.scrollTop - section.offsetTop) < window.innerHeight * 0.5
      if (inRange && !isActive)  { isActive = true;  playAnim() }
      if (!inRange && isActive)  { isActive = false; resetAnim() }
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearInterval(intervalRef.current)
      scroller.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      
      {/* Decorative dot grid - left */}
      <div className={styles.dotGridLeft}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={styles.dotLine}>
            {Array.from({ length: 2 }).map((_, j) => (
              <span key={j} className={styles.gridDot} />
            ))}
          </div>
        ))}
      </div>

      {/* Decorative dot grid - right bottom */}
      <div className={styles.dotGridRight}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.dotLine}>
            {Array.from({ length: 4 }).map((_, j) => (
              <span key={j} className={styles.gridDot} />
            ))}
          </div>
        ))}
      </div>

      {/* ── Left: photo + signature + socials ───────── */}
      <div ref={photoRef} className={styles.photoCol}>
        <div className={styles.photoWrap}>
          <div className={styles.photoFrame} data-about-photo>
            <Image
              src="/assets/dharshan-about.png"
              alt={profile.name.full}
              fill
              quality={100}
              sizes="(min-width: 768px) 30vw, 100vw"
              className={styles.photoImg}
            />
          </div>
          <p className={styles.signature}>{profile.name.first}</p>
        </div>

        {/* Social icons */}
        <div ref={socialsRef} className={styles.socials}>
          {SOCIALS.map(({ Icon, href, label }) => {
            if (!Icon) return null
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialLink}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      </div>

      {/* ── Right: content ───────────────────────────── */}
      <div ref={contentRef} className={styles.content}>
        
        {/* Title row with icon */}
        <div className={styles.whoTitleRow}>
          <div className={styles.userIconCircle}>
            <FaUser className={styles.userIcon} />
          </div>
          <h2 className={styles.whoTitle}>WHO I AM</h2>
        </div>

        {/* Capsule tags marquee */}
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {[...WHO_ITEMS, ...WHO_ITEMS].map((item, i) => {
              const Icon = SKILL_ICONS[item] || null
              return (
                <span key={i} className={styles.marqueeItem}>
                  {Icon && <span className={styles.skillIcon}>{Icon}</span>}
                  <span className={styles.skillName}>{item}</span>
                  <span className={styles.marqueeDot}>·</span>
                </span>
              )
            })}
          </div>
        </div>

        {/* Bio text - typewriter: all chars always in DOM, only color changes */}
        <div className={styles.bioWrap}>
          <p className={styles.bio}>
            {BIO.split('').map((char, i) => {
              const highlightStart = BIO.indexOf("Dharshan Kumar")
              const highlightEnd = highlightStart !== -1 ? highlightStart + "Dharshan Kumar".length : -1
              const isHighlighted = i >= highlightStart && i < highlightEnd

              let charClass = styles.untyped
              if (i < typed) {
                if (i === typed - 1 && !done) {
                  charClass = isHighlighted ? `${styles.lastTyped} ${styles.highlighted}` : styles.lastTyped
                } else {
                  charClass = isHighlighted ? styles.highlighted : styles.typed
                }
              }

              return (
                <span key={i} className={charClass}>
                  {char}
                </span>
              )
            })}
          </p>
        </div>

        {/* Orange Accent Line */}
        <div className={styles.orangeLine} />

        {/* Bottom stats cards */}
        <div className={styles.statsGrid}>
          {profile.aboutStats.map((stat, idx) => {
            const Icon = STAT_ICONS[stat.icon] || null
            return (
              <div key={idx} className={styles.statCard}>
                {Icon && <div className={styles.statCardIcon}>{Icon}</div>}
                <div className={styles.statCardValue}>{stat.value}</div>
                <div className={styles.statCardLabel}>{stat.label}</div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
