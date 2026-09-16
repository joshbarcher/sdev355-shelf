import { useState } from "react";

import Header from "./components/Header.jsx";
import Panel from "./components/Panel.jsx";
import BookCard from "./components/BookCard.jsx";

// w2.1: the books are data now. Every book carries an id (a stable key that
// belongs to the book) and a tags array (a list inside each list item).
const BOOKS = [
  {
    id: "b1",
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    status: "reading",
    rating: 4,
    tags: ["craft", "career"],
  },
  {
    id: "b2",
    title: "Refactoring UI",
    author: "Wathan & Schoger",
    status: "reading",
    rating: 5,
    tags: ["design", "css"],
  },
  {
    id: "b3",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "want",
    tags: ["systems", "databases"],
  },
  {
    id: "b4",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    status: "want",
    tags: ["craft"],
  },
  {
    id: "b5",
    title: "The Mythical Man-Month",
    author: "Fred Brooks",
    status: "finished",
    rating: 4,
    tags: ["classic", "teams"],
  },
];

function App() {
  // w3.1: the array is state now. BOOKS is only the value it STARTS at --
  // React holds what is in `books` from here on, and the page redraws when
  // that value is replaced.
  const [books, setBooks] = useState(BOOKS);

  // Never change the array React is holding. map() builds a new one, and the
  // single book that matched becomes a new object; every other book is the
  // same object it always was, and that is fine.
  function markFinished(id) {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, status: "finished" } : book
      )
    );
  }

  // filter decides WHICH books; map decides what each one draws.
  const reading = books.filter((book) => book.status === "reading");
  const want = books.filter((book) => book.status === "want");
  const finished = books.filter((book) => book.status === "finished");
  // Nothing matches this one yet -- it is what Panel's early return is for.
  const abandoned = books.filter((book) => book.status === "abandoned");

  return (
    <div className="app">
      <Header owner="Josh" bookCount={books.length} />

      <Panel title="Currently reading">
        {reading.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            status={book.status}
            rating={book.rating}
            tags={book.tags}
            onFinish={() => markFinished(book.id)}
          />
        ))}
      </Panel>

      <Panel title="Want to read">
        {want.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            status={book.status}
            rating={book.rating}
            tags={book.tags}
            onFinish={() => markFinished(book.id)}
          />
        ))}
      </Panel>

      <Panel title="Finished">
        {finished.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            status={book.status}
            rating={book.rating}
            tags={book.tags}
            onFinish={() => markFinished(book.id)}
          />
        ))}
      </Panel>

      <Panel title="Gave up on">
        {abandoned.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            status={book.status}
            rating={book.rating}
            tags={book.tags}
            onFinish={() => markFinished(book.id)}
          />
        ))}
      </Panel>
    </div>
  );
}

export default App;
