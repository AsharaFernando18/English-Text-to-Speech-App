import React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  showValue?: boolean
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue = true, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {props.value}
                {props.type === 'range' && props.max === '2' ? 'x' : ''}
              </span>
            )}
          </div>
        )}
        <input
          type="range"
          className={cn(
            'w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }