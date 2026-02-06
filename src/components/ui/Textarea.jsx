import { cn } from '@/lib/cn';

/**
 * @typedef {Object} TextareaProps
 * @property {string} [label] - Textarea label text
 * @property {string} [error] - Error message to display
 * @property {string} [placeholder] - Textarea placeholder
 * @property {number} [rows=4] - Number of rows
 * @property {boolean} [required=false] - Required field
 * @property {string} [className] - Additional CSS classes
 */

/**
 * Reusable Textarea component with label and error handling
 * @param {TextareaProps} props
 */
export const Textarea = ({
  label,
  error,
  placeholder,
  rows = 4,
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
      <textarea
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors outline-none resize-y',
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
