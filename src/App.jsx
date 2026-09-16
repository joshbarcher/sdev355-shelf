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
  // filter decides WHICH books; map decides what each one draws.
  const reading = BOOKS.filter((book) => book.status === "reading");
  const want = BOOKS.filter((book) => book.status === "want");
  const finished = BOOKS.filter((book) => book.status === "finished");
  // Nothing matches this one yet -- it is what Panel's early return is for.
  const abandoned = BOOKS.filter((book) => book.status === "abandoned");

  return (
    <div className="app">
      <Header owner="Josh" bookCount={BOOKS.length} />

      <Panel title="Currently reading">
        {reading.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            status={book.status}
            rating={book.rating}
            tags={book.tags}
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
          />
        ))}
      </Panel>
    </div>
  );
}

export default App;
