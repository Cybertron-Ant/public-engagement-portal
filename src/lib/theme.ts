export const theme = {
  colors: {
    background: "hsl(232, 47%, 15%)", // Deep cosmic blue
    foreground: "hsl(0, 0%, 90%)",    // Soft white for better readability
    
    primary: {
      DEFAULT: "hsl(51, 85%, 45%)",    // Softer divine gold
      foreground: "hsl(232, 47%, 20%)", // Lighter cosmic blue for reduced contrast
    },
    
    secondary: {
      DEFAULT: "hsl(291, 54%, 38%)",   // Softer mystic purple
      foreground: "hsl(0, 0%, 90%)",   // Soft white for reduced contrast
    },
    
    accent: {
      DEFAULT: "hsl(232, 80%, 35%)",   // Lighter cosmic blue accent
      foreground: "hsl(51, 85%, 45%)", // Softer divine gold for reduced contrast
    },
    
    // Card with glassmorphic effect
    card: {
      DEFAULT: "hsla(232, 47%, 20%, 0.7)", // Slightly lighter background
      foreground: "hsl(0, 0%, 90%)",      // Soft white for better readability
    },
    
    // Muted backgrounds
    muted: {
      DEFAULT: "hsla(232, 47%, 25%, 0.8)",
      foreground: "hsl(0, 0%, 80%)",  // Even softer for muted text
    },
    
    // Border colors
    border: "hsla(51, 100%, 50%, 0.2)", // Subtle divine gold
    
    ring: "hsla(51, 100%, 50%, 0.3)",   // Focus rings in divine gold
  },
  
  // Custom blur effects
  blur: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  
  // Animation durations
  animation: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    verySlow: "500ms",
  },
  
  // Font settings
  fontFamily: {
    sans: "'Inter', sans-serif",
    heading: "'Cinzel', serif",
  },
  
  // Border radiuses
  borderRadius: {
    sm: "0.3rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  
  // Shadows
  boxShadow: {
    sm: "0 2px 8px hsla(232, 47%, 5%, 0.2)",
    md: "0 4px 12px hsla(232, 47%, 5%, 0.3)",
    lg: "0 8px 24px hsla(232, 47%, 5%, 0.4)",
    glow: "0 0 15px hsla(51, 100%, 50%, 0.3)",
  },
};

// Motion variants for Framer Motion
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 }
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};
