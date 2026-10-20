import StatusPanel from "./StatusPanel.jsx";

// Which of the four screens the shelf shows.
//
// This was a `shelf()` function nested inside App, reading App's state through
// closure: nothing in its signature said what it needed, and it was called as
// `{shelf()}` instead of rendered like every other component. As a component,
// everything it reads arrives as a prop, and the early returns sit where w2.1
// taught them -- in a component. The data screen arrives as `children`, so
// ShelfBody does not need to know about Panels or cards.
//
// The order is the logic: loading first, or the first render says "no books";
// error before the length check, or a failure looks like an empty shelf.
function ShelfBody({ loading, error, books, onRetry, children }) {
  if (loading) {
    return <StatusPanel status="wait">Fetching your books…</StatusPanel>;
  }
  if (error) {
    return (
      <StatusPanel status="failed" onRetry={onRetry}>
        We could not reach your shelf. {error}
      </StatusPanel>
    );
  }
  if (books.length === 0) {
    return (
      <StatusPanel status="empty">
        Nothing on the shelf yet. Add a book by title above to start it off.
      </StatusPanel>
    );
  }
  return children;
}

export default ShelfBody;
