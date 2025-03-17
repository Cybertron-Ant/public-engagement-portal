import { forwardRef, ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../../lib/motion';
import './Button.css';

interface ButtonProps extends ComponentPropsWithRef<typeof motion.button> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  glow = true,
  className = '',
  disabled,
  ...props
}, ref) => {
  return (
    <motion.button
      type="button"
      className={`button button--${variant} button--${size} ${
        isLoading ? 'button--loading' : ''
      } ${glow ? 'button--glow' : ''} ${className}`}
      disabled={disabled || isLoading}
      variants={motionVariants.energyPulse}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={motionVariants.hoverGlow}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <motion.span
        className="button__content"
        variants={motionVariants.digitalReveal}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {isLoading ? (
          <span className="button__loader" />
        ) : (
          children
        )}
      </motion.span>
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
