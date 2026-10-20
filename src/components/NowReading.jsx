import ReadingTimer from "./ReadingTimer.jsx";

// Reads a value it never sets. The cards set it -- they are this banner's
// siblings, so the id has to live above both of them, in App.
function NowReading({ book }) {
  if (!book) {
    return (
      <p className="now now-empty">
        Pick a book and hit <strong>Reading</strong> to start one.
      </p>
    );
  }

  // w4.1: the timer is rendered HERE, inside the branch that has a book. When
  // `book` goes away this whole branch goes away with it -- and a component
  // that is no longer rendered is unmounted, which is when React runs its
  // effect's cleanup. Nobody had to remember to stop the interval.
  return (
    <p className="now">
      Now reading: <strong>{book.title}</strong>
      <span className="now-author"> · {book.author}</span>
      <ReadingTimer bookId={book.id} />
    </p>
  );
}

export default NowReading;
