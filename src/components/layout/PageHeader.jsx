import { Container } from './Container';
import { Badge } from '../ui/Badge';

/**
 * @typedef {Object} PageHeaderProps
 * @property {string} title - Main heading text
 * @property {string} [description] - Optional description text
 * @property {string} [badge] - Optional badge text
 * @property {React.ReactNode} [children] - Additional content (like buttons)
 */

/**
 * Reusable page header component with title, description, and optional badge
 * @param {PageHeaderProps} props
 */
export function PageHeader({ title, description, badge, children }) {
  return (
    <div className="bg-linear-to-br from-primary-50 via-white to-accent-50 py-12 md:py-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          {badge && (
            <Badge variant="primary" size="md" className="mb-4">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8 flex justify-center gap-4">
              {children}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
