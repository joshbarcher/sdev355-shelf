import { useState } from "react";

// The other controlled input, and the contrast that matters: this one keeps its
// state HERE.
//
// Nobody outside this form reads the half-typed title. App does not need it,
// the panels do not need it -- it becomes everyone's business exactly once, on
// submit, and that is what `onAdd` is for. Same question as the search box,
// different answer, because the answer depends on who reads the value.
function AddBook({ onAdd }) {
  const [draft, setDraft] = useState("");

  function handleSubmit(e) {
    // A form submit reloads the whole page by default. In a React app that
    // throws away every piece of state in memory.
    e.preventDefault();

    if (draft.trim() === "") return;
    onAdd(draft.trim());
    setDraft("");
  }

  return (
    <form className="add" onSubmit={handleSubmit}>
      <input
        className="add-input"
        value={draft}
        placeholder="Add a book by title"
        onChange={(e) => setDraft(e.target.value)}
      />
      <button className="add-button">Add</button>
    </form>
  );
}

export default AddBook;
