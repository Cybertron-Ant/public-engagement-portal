import React from 'react'
import { cn } from '@/lib/utils'

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  error?: string
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, error, onSubmit, ...props }, ref) => (
    <form
      className={cn("space-y-4", className)}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
      ref={ref}
      {...props}
    >
      {children}
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  )
)

Form.displayName = 'Form'

// Create a barrel file for easy imports
export * from '../Input/Input'
export * from '../TextArea/TextArea'
export * from '../Select/Select'
export * from '../Checkbox/Checkbox'
export * from '../RadioGroup/RadioGroup'