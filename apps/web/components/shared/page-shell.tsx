import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight uppercase">{title}</h1>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

interface ActionAreaProps {
  children: React.ReactNode;
  className?: string;
}

export function ActionArea({ children, className }: ActionAreaProps) {
  return (
    <div className={cn("pt-6", className)}>
      {children}
    </div>
  );
}
