import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({
    archives: [
      {
        id: "1",
        title: "My First Post",
      },
      {
        id: "2",
        title: "My Second Post",
      },
    ],
  });
};

export default function ArchivesPage() {
  const { archives } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Archives</h1>
      <ul>
        {archives.map((post, index) => (
          <li key={index}>
            <Link
              to={`/archives/${post.id}`}
              className="text-blue-600 underline"
              prefetch="intent"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
