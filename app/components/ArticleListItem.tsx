import { Link } from "@remix-run/react";
import { Article } from "~/types/articles";
import { formatDate } from "~/utils/format-date";

interface ArticleListItemProps {
  article: Article;
  baseUrl: string;
}

export function ArticleListItem({ article, baseUrl }: ArticleListItemProps) {
  const { id, title, subtitle, lastUpdatedAt, category, lang } = article;

  return (
    <Link
      to={`${baseUrl}/${id}`}
      prefetch="intent"
      viewTransition
      className="group block py-4 border-b-[0.1em] first:pt-0 last:pb-0 last:border-0"
    >
      <li>
        <p className="mb-2 text-sm text-primary underline">{category}</p>
        <h2 className="text-xl group-hover:underline">{title}</h2>
        <p className="mb-4 text-sm font-light">{subtitle}</p>
        <p className="text-xs text-muted-foreground">
          {formatDate(lastUpdatedAt, lang)}
        </p>
      </li>
    </Link>
  );
}
