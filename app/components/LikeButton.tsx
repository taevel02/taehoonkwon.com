import { useState, useCallback, useEffect } from "react";
import { RiHeartFill } from "@remixicon/react";
import { clsx } from "clsx";

interface LikeButtonProps {
  initialLikes?: number;
  label?: string;
  onLike?: () => void;
  alreadyLiked?: boolean;
}

export function LikeButton({
  initialLikes = 0,
  onLike,
  label = "도움이 되었어요",
  alreadyLiked = false,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(alreadyLiked);

  // Sync state when props change (for hydration/navigation)
  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  useEffect(() => {
    setIsLiked(alreadyLiked);
  }, [alreadyLiked]);

  const handleClick = useCallback(() => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      onLike?.();
    }
  }, [isLiked, onLike]);

  return (
    <div className="mt-20 py-8 border-t border-gray-50 flex justify-start">
      <button
        onClick={handleClick}
        className={clsx(
          "group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
          isLiked
            ? "text-primary cursor-default"
            : "text-muted-foreground hover:bg-gray-50 hover:text-foreground active:scale-95",
        )}
      >
        <RiHeartFill
          className={clsx(
            "w-4 h-4 transition-transform duration-300",
            isLiked
              ? "scale-110"
              : "group-hover:scale-110 opacity-40 group-hover:opacity-100",
          )}
        />
        <span className="text-sm font-medium">
          {label}
          {likes > 0 && <span className="ml-1.5 opacity-80">{likes}</span>}
        </span>
      </button>
    </div>
  );
}
