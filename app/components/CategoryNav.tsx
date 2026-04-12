import { Link } from "@remix-run/react";

interface CategoryNavProps {
  categories: readonly string[];
  selectedCategory: string | null;
  baseUrl: string;
}

export function CategoryNav({
  categories,
  selectedCategory,
  baseUrl,
}: CategoryNavProps) {
  return (
    <div className="mb-6 flex gap-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      <Link
        to={baseUrl}
        prefetch="intent"
        viewTransition
        className={`inline-block transition-colors ${
          !selectedCategory
            ? "text-primary font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        all
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          to={`${baseUrl}?category=${category}`}
          prefetch="intent"
          viewTransition
          className={`inline-block transition-colors ${
            selectedCategory === category
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
