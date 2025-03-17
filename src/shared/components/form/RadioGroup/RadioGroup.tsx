import React from 'react'
import { cn } from '@/lib/utils'

export interface RadioOption {
  label: string
  value: string | number
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  error?: string
  label?: string
  className?: string
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, name, options, value, onChange, error, label }, ref) => (
    <div className={cn("w-full", className)} ref={ref}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                "h-4 w-4 border border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                error ? "border-red-500" : ""
              )}
            />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
)

RadioGroup.displayName = 'RadioGroup'