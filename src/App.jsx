import { useEffect, useState } from "react";

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
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "reading",
    rating: 4,
    tags: ["classic", "fiction"],
    notes: "The courtroom chapters are the ones people remember, but it is Scout who carries it.",
  },
  {
    id: "b2",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    status: "reading",
    rating: 5,
    tags: ["dystopia", "ya"],
    notes: "Read the first fifty pages on a lunch break and lost the rest of the day.",
  },
  {
    id: "b3",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    status: "want",
    tags: ["fantasy", "series"],
    notes: "Somehow never read it. Everyone insists I start here rather than the films.",
  },
  {
    id: "b4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    status: "want",
    tags: ["classic"],
    notes: "Told it is much funnier than its reputation suggests.",
  },
  {
    id: "b5",
    title: "1984",
    author: "George Orwell",
    status: "finished",
    rating: 4,
    tags: ["classic", "dystopia"],
    notes: "The appendix on Newspeak is the part that actually keeps you up at night.",
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
    } else if (id === currentId) {
      // ...and a book you have just put back down is not one you are reading.
      // w4.1 needs this: emptying the banner unmounts NowReading's timer, and
      // an unmount is when React runs that effect's cleanup. Without this line
      // there is no way back to "nothing is current" and the cleanup can only
      // be described, not watched.
      setCurrentId(null);
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

  // w4.1, effect one: the browser tab is not React's.
  //
  // `document.title` is a thing outside the component -- React did not make
  // it, does not own it and will never put it back. Setting it during render
  // would be reaching outside the call mid-render (w2.2's word: impure); an
  // effect is where that is allowed, because React runs it AFTER the render
  // has finished and the DOM is updated -- usually after the paint, though
  // after a click or keystroke React may run it just before.
  //
  // The array lists what the setup READ, and nothing else. It reads
  // `shown.length` and `books.length` for the numbers, and `query` because it
  // is what the branch asks about -- miss `query` and a search that leaves
  // the count unchanged keeps the old wording: with Hide finished on, typing
  // "r" still shows four books, so the tab stays on "4 books".
  //
  // `shown.length`, not `shown`: the filter above builds a NEW array on every
  // render, so a dependency on `shown` would never match and this would run
  // every time. A number compares by value. w3.1 s37 is the same fact.
  useEffect(() => {
    document.title =
      query === ""
        ? `Shelf — ${shown.length} books`
        : `Shelf — ${shown.length} of ${books.length} shown`;
  }, [shown.length, books.length, query]);

  // w4.1, effect two: press `f` to toggle Hide finished.
  //
  // This is the effect that needs the cleanup most and looks like it needs it
  // least. `addEventListener` puts a function on `document`, which outlives
  // every render; without the `removeEventListener` below, a remount would
  // leave the old listener attached and `f` would toggle twice, then three
  // times, then four.
  //
  // `handleKeyDown` is a NAMED function used in both lines on purpose.
  // `removeEventListener` finds a listener by the identity of the function
  // object, so two identical inline arrows are two different listeners and
  // the second call takes nothing off.
  //
  // `[]` is an honest claim here: the setup reads nothing from this render.
  // It can say that only because the setter below is the updater form --
  // `setHideFinished(!hideFinished)` WOULD read a render value, and with `[]`
  // it would read the very first one forever.
  useEffect(() => {
    function handleKeyDown(event) {
      // A shortcut that fires while you are typing is a bug, not a feature:
      // searching for "Frankenstein" should not flip a checkbox five times.
      const typing = event.target.closest?.("input, textarea, select");
      if (typing) return;

      if (event.key === "f") {
        setHideFinished((on) => !on);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
