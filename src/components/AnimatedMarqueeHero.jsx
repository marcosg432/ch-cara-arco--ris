import React from 'react'
import { motion } from 'framer-motion'
import './AnimatedMarqueeHero.css'

/**
 * Componente AnimatedMarqueeHero
 * 
 * Hero section com marquee animado de imagens na parte inferior
 * Usa framer-motion para animações suaves
 */

// Reusable Button component styled
const ActionButton = ({ children, onClick = () => {} }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="animated-hero-button"
  >
    {children}
  </motion.button>
)

// The main hero component
export const AnimatedMarqueeHero = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className = '',
}) => {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  }

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images]

  // Handle title rendering - can be string or React node
  const renderTitle = () => {
    if (typeof title === 'string') {
      return title.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="animated-hero-title-word"
        >
          {word}&nbsp;
        </motion.span>
      ))
    }
    return title
  }

  return (
    <section className={`animated-hero-section ${className}`}>
      {(tagline || title || description || ctaText) && (
        <div className="animated-hero-content">
          {/* Tagline */}
          {tagline && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="animated-hero-tagline"
            >
              {tagline}
            </motion.div>
          )}

          {/* Main Title */}
          {title && (
            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="animated-hero-title"
            >
              {renderTitle()}
            </motion.h1>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              transition={{ delay: 0.5 }}
              className="animated-hero-description"
            >
              {description}
            </motion.p>
          )}

          {/* Call to Action Button */}
          {ctaText && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              transition={{ delay: 0.6 }}
            >
              <ActionButton>{ctaText}</ActionButton>
            </motion.div>
          )}
        </div>
      )}

      {/* Animated Image Marquee */}
      <div className="animated-hero-marquee-container">
        <motion.div
          className="animated-hero-marquee"
          animate={{
            x: ["-100%", "0%"],
            transition: {
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="animated-hero-image-wrapper"
              style={{
                transform: `rotate(${index % 2 === 0 ? -2 : 5}deg)`,
              }}
            >
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="animated-hero-image"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedMarqueeHero

