import { useState } from "react";

import Header from "./components/Header.jsx";
import Panel from "./components/Panel.jsx";
import BookCard from "./components/BookCard.jsx";
import NowReading from "./components/NowReading.jsx";
import SearchBox from "./components/SearchBox.jsx";
import AddBook from "./components/AddBook.jsx";

// w2.1: the books are data now. Every book carries an id (a stable key that
// belongs to the book) and a tags array (a list inside each list item).
// w3.2 added `notes`, which is what a card's Show notes button reveals.
const BOOKS = [
  {
    id: "b1",
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    status: "reading",
    rating: 4,
    tags: ["craft", "career"],
    notes: "The chapter on tracer bullets is the one worth rereading.",
  },
  {
    id: "b2",
    title: "Refactoring UI",
    author: "Wathan & Schoger",
    status: "reading",
    rating: 5,
    tags: ["design", "css"],
    notes: "Short, practical, and it fixed my spacing habits in a weekend.",
  },
  {
    id: "b3",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "want",
    tags: ["systems", "databases"],
    notes: "Everyone says chapter 5 is where it gets good.",
  },
  {
    id: "b4",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    status: "want",
    tags: ["craft"],
    notes: "Makes the case that deep modules beat small ones.",
  },
  {
    id: "b5",
    title: "The Mythical Man-Month",
    author: "Fred Brooks",
    status: "finished",
    rating: 4,
    tags: ["classic", "teams"],
    notes: "Adding people to a late project makes it later. Still true.",
  },
];

function App() {
  // w3.1: the array is state. BOOKS is only the value it STARTS at -- React
  // holds what is in `books` from here on, and the page redraws when that
  // value is replaced.
  const [books, setBooks] = useState(BOOKS);

  // w3.2: three more pieces of state, and every one of them is HERE for the
  // same reason -- more than one component below reads it, and state only ever
  // travels down. The half-typed title in the Add form is the one that is NOT
  // here, because only the form reads it.
  const [hideFinished, setHideFinished] = useState(false);
  const [query, setQuery] = useState("");
  const [currentId, setCurrentId] = useState(null);

  // Never change the array React is holding. map() builds a new one, and the
  // single book that matched becomes a new object; every other book is the
  // same object it always was, and that is fine.
  function changeStatus(id, status) {
    setBooks(
      books.map((book) => (book.id === id ? { ...book, status } : book))
    );

    // Starting a book is also what the banner means by "now reading".
    if (status === "reading") {
      setCurrentId(id);
    }
  }

  function addBook(title) {
    const book = {
      id: crypto.randomUUID(),
      title,
      author: "Unknown author",
      status: "want",
      tags: [],
    };

    // A new array, not books.push(...) -- push changes the array React is
    // already holding, and React would be handed the same array it had.
    setBooks([...books, book]);
  }

  // Ordinary values, recomputed on every render. Nothing here is stored, so
  // nothing here can drift out of sync with `books`.
  const matching = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
  const shown = hideFinished
    ? matching.filter((book) => book.status !== "finished")
    : matching;
  const current = books.find((book) => book.id === currentId);

  // filter decides WHICH books; map decides what each one draws.
  const reading = shown.filter((book) => book.status === "reading");
  const want = shown.filter((book) => book.status === "want");
  const finished = shown.filter((book) => book.status === "finished");
  // Nothing matches this one yet -- it is what Panel's early return is for.
  const abandoned = shown.filter((book) => book.status === "abandoned");

  // One place that knows how to turn a book into a card, rather than four
  // copies of the same seven props.
  function cards(list) {
    return list.map((book) => (
      <BookCard
        key={book.id}
        title={book.title}
        author={book.author}
        status={book.status}
        rating={book.rating}
        tags={book.tags}
        notes={book.notes}
        onStatusChange={(next) => changeStatus(book.id, next)}
      />
    ));
  }

  return (
    <div className="app">
      <Header
        owner="Josh"
        bookCount={books.length}
        hideFinished={hideFinished}
        onHideFinishedChange={setHideFinished}
      />

      <NowReading book={current} />
      <SearchBox value={query} onChange={setQuery} />
      <AddBook onAdd={addBook} />

      <Panel title="Currently reading">{cards(reading)}</Panel>
      <Panel title="Want to read">{cards(want)}</Panel>
      <Panel title="Finished">{cards(finished)}</Panel>
      <Panel title="Gave up on">{cards(abandoned)}</Panel>
    </div>
  );
}

export default App;
