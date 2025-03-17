import { Variants } from 'framer-motion';

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

const glowTransition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut"
};

export const motionVariants = {
  // Base animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition
  },

  // Tron-inspired animations
  energyPulse: {
    initial: { 
      opacity: 0,
      scale: 0.9,
      boxShadow: "0 0 0 rgba(0, 242, 255, 0)"
    },
    animate: { 
      opacity: 1,
      scale: 1,
      boxShadow: "0 0 40px rgba(0, 242, 255, 0.4)",
      transition: {
        ...glowTransition,
        boxShadow: {
          repeat: Infinity,
          duration: 2,
          repeatType: "reverse"
        }
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      boxShadow: "0 0 0 rgba(0, 242, 255, 0)"
    }
  },

  digitalReveal: {
    initial: { 
      opacity: 0,
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      filter: "brightness(2)"
    },
    animate: { 
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      filter: "brightness(1)",
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      filter: "brightness(2)"
    }
  },

  glowingBorder: {
    initial: { 
      opacity: 0.3,
      boxShadow: "0 0 0 rgba(0, 242, 255, 0)"
    },
    animate: { 
      opacity: [0.3, 0.5, 0.3],
      boxShadow: "0 0 20px rgba(0, 242, 255, 0.3)",
      transition: {
        ...glowTransition,
        boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
      }
    }
  },

  gridReveal: {
    initial: { 
      opacity: 0,
      backgroundSize: "150% 150%",
      backgroundPosition: "0% 0%"
    },
    animate: { 
      opacity: 1,
      backgroundSize: "100% 100%",
      backgroundPosition: "50% 50%",
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      backgroundSize: "50% 50%",
      backgroundPosition: "100% 100%"
    }
  },

  // Enhanced hover effects
  hoverGlow: {
    scale: 1.02,
    boxShadow: "0 0 30px rgba(0, 242, 255, 0.5)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },

  hoverEnergize: {
    scale: 1.01,
    textShadow: "0 0 8px rgba(0, 242, 255, 0.8)",
    color: "#ffffff",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
} as const;

// Tron-inspired layout animations
export const containerVariants: Variants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const itemVariants: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
    filter: "brightness(2) blur(5px)"
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: "brightness(1) blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    filter: "brightness(2) blur(5px)"
  }
};
