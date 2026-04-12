import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { RiErrorWarningLine } from "@remixicon/react";
import { EmptyState } from "~/components/EmptyState";
import { getLanguage } from "~/utils/i18n";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  return { lang };
}

export default function NotFoundPage() {
  const { lang } = useLoaderData<typeof loader>();
  const isEn = lang === "en";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <EmptyState
        icon={<RiErrorWarningLine className="w-12 h-12" />}
        title={isEn ? "Page Not Found" : "페이지를 찾을 수 없습니다"}
        description={
          isEn
            ? "The page you are looking for does not exist or has been moved."
            : "존재하지 않거나 삭제된 페이지입니다. 주소를 다시 확인해주세요."
        }
        action={
          <Link to={isEn ? "/en" : "/"} className="text-primary" viewTransition>
            {isEn ? "Back to Home" : "홈으로 돌아가기"}
          </Link>
        }
      />
    </div>
  );
}
