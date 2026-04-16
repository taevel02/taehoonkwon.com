import { Badge } from "~/components/ui/Badge";
import { formatDate } from "~/utils/format-date";

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  lang: string;
}

export function ArticleHeader({
  title,
  subtitle,
  category,
  date,
  lang,
}: ArticleHeaderProps) {
  return (
    <div className="mb-20">
      <div className="flex flex-row items-center gap-2">
        <Badge variant="outline">{category}</Badge>
        {subtitle && (
          <h2 className="text-xs text-muted-foreground">{subtitle}</h2>
        )}
      </div>
      <h1 className="block text-4xl leading-relaxed font-medium font-serif mt-2 text-wrap">
        {title}
      </h1>
      <span className="block text-right text-sm text-muted-foreground mt-2">
        {formatDate(date, lang)}
      </span>
    </div>
  );
}
