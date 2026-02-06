import { cn } from '@/lib/cn';

/**
 * @typedef {Object} InputProps
 * @property {string} [label] - Input label text
 * @property {string} [error] - Error message to display
 * @property {string} [placeholder] - Input placeholder
 * @property {string} [type='text'] - Input type
 * @property {boolean} [required=false] - Required field
 * @property {string} [className] - Additional CSS classes
 */

/**
 * Reusable Input component with label and error handling
 * @param {InputProps} props
 */
export const Input = ({
  label,
  error,
  placeholder,
  type = 'text',
  required = false,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors outline-none',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
