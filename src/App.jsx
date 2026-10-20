import { useEffect, useState } from "react";

import { API } from "./api.js";
import Header from "./components/Header.jsx";
import Panel from "./components/Panel.jsx";
import BookCard from "./components/BookCard.jsx";
import BookDetail from "./components/BookDetail.jsx";
import NowReading from "./components/NowReading.jsx";
import SearchBox from "./components/SearchBox.jsx";
import AddBook from "./components/AddBook.jsx";
import ShelfBody from "./components/ShelfBody.jsx";

// w4.2: THE HARDCODED ARRAY IS GONE.
//
// It used to be right here -- fifty lines of books that shipped with the app.
// The books now come from `demos/355/shelf-api`. It seeds fifteen: the five
// this app used to hard-code, byte for byte, plus ten more -- so the proof that
// this session worked is that the shelf now shows fifteen books, not five.
function App() {
  // Three pieces of state, and each starts where it does for a reason.
  //
  // `books` starts as [] and not as null, because the first render happens
  // BEFORE the request is even sent and `[].map()` is a list of nothing
  // rather than a crash. `loading` starts true, because the app is already
  // waiting by the time the first pixel is drawn. `error` starts null, which
  // is "nothing has gone wrong", not "" -- an empty string is a message.
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The same four from weeks 2 and 3. Nothing about fetching changed them.
  const [hideFinished, setHideFinished] = useState(false);
  const [query, setQuery] = useState("");
  const [currentId, setCurrentId] = useState(null);

  // ── Asking for the books ──────────────────────────────────────────────────
  //
  // `load` lives INSIDE the effect. w4.1's rule is that the array lists every
  // value the setup reads; a function declared in the component body is a new
  // object on every render, so a `load` outside the effect would have to be
  // listed and would re-run the effect after every render. Inside, the setup
  // reads only state setters, which never change between renders.
  //
  // Try again cannot call a function that lives inside the effect, so it asks
  // for another run instead: `reloads` is in the array, and retry() bumps it.
  // A value does not have to be read to be listed. w5.1's useFetch keeps this
  // exact shape.
  const [reloads, setReloads] = useState(0);

  useEffect(() => {
    async function load() {
      // A retry starts from "waiting", not from the old error.
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API);

        // fetch does NOT reject on a 404 or a 500. It rejects only when the
        // request never happened -- no network, bad host, blocked by the
        // browser. A 500 is a request that worked perfectly and came back
        // carrying bad news, and `catch` will never see it unless you throw.
        if (!res.ok) throw new Error(`the server answered ${res.status}`);

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        // The only branch BOTH paths reach. The last line of `try` is not:
        // put setLoading(false) there and a failed request leaves the waiting
        // screen up for good.
        setLoading(false);
      }
    }

    load();
  }, [reloads]);

  // No ignore flag here, unlike BookDetail: this effect re-runs only when Try
  // again is clicked, and that button exists only after the previous request
  // has finished, so two of these requests are never in flight at once.
  function retry() {
    setReloads((n) => n + 1);
  }

  // Marking a book is still local. The API wants a token before it will change
  // anything, and a token is week 9 -- so for now the screen is updated and
  // the server is not told. w8.2 is where a change first leaves the browser.
  function changeStatus(id, status) {
    setBooks(
      books.map((book) => (book.id === id ? { ...book, status } : book))
    );

    if (status === "reading") {
      setCurrentId(id);
    } else if (id === currentId) {
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

  // One line, no new state: a count off the real data, worked out during the
  // render that needs it. Store it and you own the job of keeping it right.
  const finishedCount = books.filter((b) => b.status === "finished").length;

  // w4.1, effect one: the browser tab is not React's.
  //
  // `document.title` is a thing outside the component -- React did not make
  // it, does not own it and will never put it back. Setting it during render
  // would be reaching outside the call mid-render (w2.2's word: impure); an
  // effect is where that is allowed, because React runs it AFTER the screen
  // has been painted.
  //
  // The array lists what the setup READ, and nothing else. It reads
  // `shown.length` and `books.length` for the numbers, and `query` because it
  // is what the branch asks about -- miss `query` and the wording sticks on
  // whichever branch ran first even as the count updates.
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
        finishedCount={finishedCount}
        hideFinished={hideFinished}
        onHideFinishedChange={setHideFinished}
      />

      <NowReading book={current} />
      {currentId && <BookDetail id={currentId} />}

      <SearchBox value={query} onChange={setQuery} />
      <AddBook onAdd={addBook} />

      <ShelfBody
        loading={loading}
        error={error}
        books={books}
        onRetry={retry}
      >
        <Panel title="Currently reading">{cards(reading)}</Panel>
        <Panel title="Want to read">{cards(want)}</Panel>
        <Panel title="Finished">{cards(finished)}</Panel>
        <Panel title="Gave up on">{cards(abandoned)}</Panel>
      </ShelfBody>
    </div>
  );
}

export default App;
