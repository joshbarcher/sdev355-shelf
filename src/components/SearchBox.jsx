// A controlled input: `value` says what to show, `onChange` says what to do
// when it changes. The box is never remembering your keystrokes -- it is
// showing state, repainted after every one.
//
// The query itself lives in App, because App is the component that filters the
// list with it. Two readers, so it goes above both.
function SearchBox({ value, onChange }) {
  return (
    <div className="search">
      <input
        className="search__input"
        type="search"
        value={value}
        placeholder="Search by title"
        onChange={(e) => onChange(e.target.value)}
      />
      {value !== "" && (
        <button className="search__clear" onClick={() => onChange("")}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBox;
