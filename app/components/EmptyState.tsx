import { RiArticleLine } from "@remixicon/react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon = <RiArticleLine className="w-12 h-12" />,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="mb-6 p-4 rounded-full bg-secondary text-muted-foreground/60 transition-transform hover:scale-110 duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground font-light max-w-sm mx-auto mb-8">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
