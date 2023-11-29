import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);

  console.log(params);

  const currentPage = params.page || 1;
  const currentLimit = params.limit || 20;

  const books = await fetch(`http://localhost:8080/books?_page=${currentPage}&_limit=${currentLimit}`).then((res) => res.json());

  return json(books);
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const books = useLoaderData();

  useEffect(() => {
    console.log(books)
  }, [books])

  return (
    <div className="w-full h-screen">
      <header className="bg-amber-500/50">
        <h1>Remix Smart Store</h1>
      </header>
      <main>
        <ul className="grid">

        </ul>
      </main>
    </div>
  );
}
