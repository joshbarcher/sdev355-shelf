// w3.2: the checkbox lives here, but `hideFinished` does not. The Header shows
// the value it is handed and reports clicks back up -- the panels below need
// the same value, and a sibling cannot read a sibling's state.
//
// w4.2: `finishedCount` is worked out in App during the render that needs it,
// off the books the API actually sent. It is not state and never was -- a
// count you store is a second copy of something you already have, and the two
// of them start disagreeing the first time a status changes.
function Header({
  owner,
  bookCount,
  finishedCount,
  hideFinished,
  onHideFinishedChange,
}) {
  return (
    <header className="header">
      <div>
        <h1 className="header-title">Shelf</h1>
        <p className="header-meta">
          {owner} · {finishedCount} of {bookCount} finished
        </p>
      </div>

      <label className="header-toggle">
        <input
          type="checkbox"
          checked={hideFinished}
          onChange={(e) => onHideFinishedChange(e.target.checked)}
        />
        Hide finished
      </label>
    </header>
  );
}

export default Header;
