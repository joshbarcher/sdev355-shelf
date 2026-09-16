// w3.2: the checkbox lives here, but `hideFinished` does not. The Header shows
// the value it is handed and reports clicks back up -- the panels below need
// the same value, and a sibling cannot read a sibling's state.
function Header({ owner, bookCount, hideFinished, onHideFinishedChange }) {
  return (
    <header className="header">
      <div>
        <h1 className="header__title">Shelf</h1>
        <p className="header__meta">
          {owner} · {bookCount} books
        </p>
      </div>

      <label className="header__toggle">
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
