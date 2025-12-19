import React, { useState, useEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const VideoSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const videoRef = useRef(null)
  const [sectionRef, sectionVisible] = useScrollAnimation()

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return

      const rect = videoRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const scrollStart = windowHeight
      const scrollEnd = -windowHeight
      const progress = (rect.top - scrollStart) / (scrollEnd - scrollStart)

      if (progress > 0 && progress < 1) {
        setIsExpanded(true)
        setScrollProgress(Math.min(progress, 1))
      } else {
        setIsExpanded(false)
        setScrollProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scale = 1 + scrollProgress * 0.3
  const height = isExpanded ? `${100 + scrollProgress * 100}vh` : '400px'

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white py-8 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center"
      style={{ minHeight: '150vh' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          ref={videoRef}
          className={`rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
            sectionVisible ? 'fade-in' : 'opacity-0'
          }`}
          style={{
            transform: `scale(${scale})`,
            height: height,
            position: isExpanded ? 'fixed' : 'relative',
            top: isExpanded ? '50%' : 'auto',
            left: isExpanded ? '50%' : 'auto',
            marginTop: isExpanded ? '-' + height.split('vh')[0] / 2 + 'vh' : '0',
            marginLeft: isExpanded ? '-50%' : '0',
            width: isExpanded ? '90vw' : '100%',
            zIndex: isExpanded ? 40 : 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-300 flex items-center justify-center">
            <div className="text-white text-center">
              <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="text-xl font-semibold">Video Demo</p>
              <p className="text-sm mt-2">Scroll to expand</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

export default VideoSection
