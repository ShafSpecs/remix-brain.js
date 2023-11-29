import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { Book } from "~/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const book = await fetch(`http://localhost:8080/books/${params.bookId}`).then((res) => res.json()) as unknown as Book;

  return json(book);
}

export default function BookId() {
  const book = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return <div className="py-8 px-6 space-y-5 md:space-y-6">
    <button onClick={() => navigate(-1)} className="border-amber-500 px-2.5 py-2 border-2 rounded-2xl">&#8592;&nbsp;Go Back</button>
    <main className="flex flex-col md:flex-row space-x-5 md:space-y-6">
      <div>
        <img src="https://i.pinimg.com/736x/72/c6/7a/72c67af70b9c14f254e4d56125b99873.jpg" className="" alt="Book Image" />
      </div>
      {book ? <div className="space-y-2">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl capitalize">{book.name}</h1>
        <h3 className="font-medium italic text-gray-400 text-xl md:text-2xl lg:text-3xl">{book.author}</h3>
        <p>{book.description}</p>
        <p><span className="text-gray-500">Category&nbsp;</span><span className="font-medium capitalize decoration-2 decoration-amber-500 hover:underline cursor-pointer">{book.category}</span></p>
        <p className="bottom-1.5 relative"><span className="text-gray-500">Genre&nbsp;</span><span className="font-medium capitalize decoration-2 decoration-amber-500 hover:underline cursor-pointer">{book.genre}</span></p>
      </div> : <p>Loading...</p>}
    </main>
  </div>;
}