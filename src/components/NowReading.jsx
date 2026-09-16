// Reads a value it never sets. The cards set it -- they are this banner's
// siblings, so the id has to live above both of them, in App.
function NowReading({ book }) {
  if (!book) {
    return (
      <p className="now now--empty">
        Pick a book and hit <strong>Reading</strong> to start one.
      </p>
    );
  }

  return (
    <p className="now">
      Now reading: <strong>{book.title}</strong>
      <span className="now__author"> · {book.author}</span>
    </p>
  );
}

export default NowReading;
