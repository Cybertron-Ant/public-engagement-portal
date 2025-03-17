import React, { ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { motionVariants } from '../../../../lib/motion';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends ComponentPropsWithRef<'select'> {
  options: SelectOption[];
  error?: string;
  label?: string;
  glow?: boolean;
}

const MotionDiv = motion.div;
const MotionLabel = motion.label;
const MotionP = motion.p;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, label, glow = true, ...props }, ref) => (
    <MotionDiv
      className="w-full"
      variants={motionVariants.fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {label && (
        <MotionLabel
          className={cn(
            "mb-2 block text-sm font-medium",
            glow ? "text-[#7fb8ff]" : "text-[#c4d7ff]/90"
          )}
          variants={motionVariants.digitalReveal}
        >
          {label}
        </MotionLabel>
      )}
      <div className="relative">
        <select
          className={cn(
            "flex h-11 w-full rounded-sm border bg-glass-background px-3 py-2 text-sm appearance-none",
            "text-[#c4d7ff]/90 font-medium tracking-wide",
            "border-[#7fb8ff]/20 backdrop-blur-sm",
            "transition-all duration-200",
            "focus:outline-none focus:border-[#7fb8ff]/50 focus:shadow-[0_0_15px_rgba(127,184,255,0.15)]",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#7fb8ff]/20",
            glow ? "hover:border-[#7fb8ff]/30 hover:shadow-[0_0_10px_rgba(127,184,255,0.1)]" : "",
            error ? "border-red-500/30 focus:border-red-500/50" : "",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-[#0a192f] text-[#c4d7ff]/90"
            >
              {option.label}
            </option>
          ))}
        </select>
        <MotionDiv
          className="absolute inset-0 pointer-events-none border border-[#7fb8ff]/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            boxShadow: "0 0 20px rgba(127,184,255,0.2)"
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-[#7fb8ff]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <MotionP
          className="mt-1 text-sm text-red-300"
          variants={motionVariants.fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {error}
        </MotionP>
      )}
    </MotionDiv>
  )
);

Select.displayName = 'Select';

export default Select;
