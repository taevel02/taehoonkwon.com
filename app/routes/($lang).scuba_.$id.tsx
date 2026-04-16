import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import blogConfig from "blog.config";

import { articleAPI } from "~/api/article";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";
import { pathJoin, clamp, toPlainText } from "~/utils/string";
import invariant from "~/utils/invariant";
import { supabase } from "~/utils/supabase";

import { ArticleHeader } from "~/components/ArticleHeader";
import { LikeButton } from "~/components/LikeButton";

import "~/styles/article.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { id, title } = data?.article ?? {};
  const lang = data?.lang === "en" ? "en" : "ko";

  if (!id || !title) return [];

  const description = clamp(toPlainText(data?.article.content ?? ""));

  return generateMeta({
    title: [title, "SCUBA", blogConfig.seo[lang].title],
    description: description || blogConfig.seo[lang].description,
    author: blogConfig.author,
    site: blogConfig.site,
    url: pathJoin(
      blogConfig.site,
      lang === "ko" ? "scuba" : "en/scuba",
      id.toString(),
    ),
    image: pathJoin(
      blogConfig.site,
      `resource/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(data?.article.subtitle || "")}`,
    ),
  });
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const id = params.id;
  invariant(id !== undefined, "'id' is required");

  const url = new URL(request.url);

  const redirectPath = getLocalizedPath(url.pathname, lang);
  if (redirectPath) {
    return redirect(redirectPath + url.search);
  }

  // Fetch from 'scuba' folder
  const article = await articleAPI.getArticle(lang, id, "scuba");
  if (article === null) return redirect("/404");

  // Fetch initial stats from Supabase
  const { data: stats } = await supabase
    .from("article_interactions")
    .select("likes")
    .eq("article_id", id)
    .single();

  return { article, lang, initialLikes: stats?.likes || 0 };
}

export default function ScubaDetailPage() {
  const {
    article: { id, category, title, subtitle, lastUpdatedAt, content },
    lang,
    initialLikes,
  } = useLoaderData<typeof loader>();

  const [isLikedLocally, setIsLikedLocally] = useState(false);

  useEffect(() => {
    // 1. LocalStorage check for "Liked" status persistence
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem(`blog_liked_${id}`);
      if (liked) {
        // Use a small delay to avoid synchronous setState during effect execution
        setTimeout(() => setIsLikedLocally(true), 0);
      }
    }

    // 2. Increment views on page load
    supabase.rpc("increment_views", { target_article_id: id }).then();

    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [id]);

  const handleLike = () => {
    if (!isLikedLocally) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`blog_liked_${id}`, "true");
      }
      setIsLikedLocally(true);
      supabase.rpc("increment_likes", { target_article_id: id }).then();
    }
  };

  return (
    <div className="animate-fade-in">
      <ArticleHeader
        title={title}
        subtitle={subtitle}
        category={category}
        date={lastUpdatedAt}
        lang={lang}
      />
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <LikeButton
        label={lang === "ko" ? "도움이 되었어요" : "Helpful"}
        initialLikes={initialLikes}
        alreadyLiked={isLikedLocally}
        onLike={handleLike}
      />
    </div>
  );
}
