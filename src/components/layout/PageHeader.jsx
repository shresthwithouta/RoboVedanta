import { Container } from './Container';
import { Badge } from '../ui/Badge';

export function PageHeader({ title, description, badge, children }) {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary-50/50 to-transparent -z-10" />
      
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          {badge && (
            <Badge variant="primary" size="lg" className="mb-8 shadow-sm">
              {badge}
            </Badge>
          )}
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-neutral-900 mb-8 leading-[1.1] tracking-tight">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-2xl mx-auto font-medium">
              {description}
            </p>
          )}
          
          {children && (
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              {children}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
