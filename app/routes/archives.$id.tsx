import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({ id: params.id });
}

export default function ArchivePage() {
  const { id } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>{id ? id : "아이디 없음"}</h1>
    </main>
  );
}
