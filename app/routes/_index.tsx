import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h6 className="">
        권태훈
        <br />
        權泰勳
      </h6>
      <Link to="/archives" className="text-xl text-blue-600 underline">
        Archives
      </Link>
    </div>
  );
}
