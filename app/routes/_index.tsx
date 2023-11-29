import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

import type { Book, Params } from "~/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams) as unknown as Params;

  const currentPage = params.page || 1;
  const currentLimit = params.limit || 20;

  const books = await fetch(`http://localhost:8080/books?_page=${currentPage}&_limit=${currentLimit}`).then((res) => res.json());

  return json({ 
    books, 
    metadata: { 
      page: Number(currentPage), 
      limit: Number(currentLimit), 
      lastPage: Math.ceil(430 / Number(currentLimit)), 
      next: Number(currentPage) + 1, 
      prev: Number(currentPage) - 1 
    }
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { books, metadata } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen">
      <header className="bg-amber-500/50 py-6 px-4">
        <h1 className="font-medium text-xl">Remix Smart Store</h1>
      </header>
      <main>
        <ul className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-4 px-6 py-8`}>
          {books.map((book: Book) => (
            <li key={book.id}>
              <Link to={`/${book.id}`} className="w-full h-full flex flex-col mx-auto md:mx-0">
                <img src="https://i.pinimg.com/736x/72/c6/7a/72c67af70b9c14f254e4d56125b99873.jpg" className="max-h-64 sm:max-h-80 max-w-[196px] sm:max-w-[256px] md:max-w-xs md:mx-0" alt="Book Image" />
                <h2 className="capitalize font-bold text-lg">{book.name}</h2>
                <p className="text-gray-500">{book.author}</p>
                <Link to={'/'} className="hover:underline decoration-2 decoration-amber-500 text-gray-700 max-w-fit text-xs font-medium capitalize">{book.genre}</Link>
              </Link>
            </li>
          ))}
        </ul>
        {/* You can implement a more elegant pagination 😉 */}
        <div className="flex justify-between mb-4 px-6 py-4">
          <div onClick={() => metadata.prev > 0 ? navigate(`/?page=${metadata.prev}`) : null} className={`rounded-xl border-2 border-amber-500 px-2.5 py-1 ${metadata.prev > 0 ? 'cursor-pointer hover:bg-amber-400/25' : 'cursor-not-allowed hover:bg-slate-300/25'}`}>Previous</div>
          <div onClick={() => metadata.next < metadata.lastPage ? navigate(`/?page=${metadata.next}`) : null} className={`rounded-xl border-2 border-amber-500 px-2.5 py-1 ${metadata.next < metadata.lastPage ? 'cursor-pointer hover:bg-amber-400/25' : 'cursor-not-allowed hover:bg-slate-300/25'}`}>Next</div>
        </div>
      </main>
    </div>
  );
}
