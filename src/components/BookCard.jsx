import { useState } from "react";

import StatusTag, { STATUSES, LABELS } from "./StatusTag.jsx";

function BookCard({
  title,
  author,
  status,
  rating = 0,
  tags = [],
  notes,
  onStatusChange,
}) {
  // w3.2: state that is CORRECTLY local. Whether this one card is showing its
  // notes is read by this card and by nobody else -- no sibling needs it, the
  // app does not need it, so lifting it would only mean more props. "Who reads
  // this value?" answers "just me", and the answer is: leave it here.
  const [notesShown, setNotesShown] = useState(false);

  function handleToggleNotes() {
    setNotesShown(!notesShown);
  }

  // A ternary: exactly two outcomes, and one of them always happens.
  const cardClass = status === "finished" ? "card card-finished" : "card";

  // One thing or nothing, so &&. Note `rating > 0` and not a bare `rating`:
  // 0 is falsy, and && hands back its LEFT side when that side is falsy, so
  // a bare `rating &&` would print a literal 0 on the page.
  const ratingLine = rating > 0 && (
    <p className="card-rating">
      <span className="card-stars">{"★".repeat(rating)}</span>
      <span className="card-stars card-stars-empty">
        {"☆".repeat(5 - rating)}
      </span>
    </p>
  );

  // A list inside a list. This key only has to be unique among ITS siblings,
  // so a tag name is fine even though the book list outside is keyed by id.
  const tagList = tags.length > 0 && (
    <ul className="card-tags">
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );

  // w3.2: three buttons, ONE handler. What makes them three different buttons
  // is the argument -- and an argument is the whole reason to reach for an
  // arrow instead of handing over a bare handler name.
  const actions = (
    <div className="card-actions">
      {STATUSES.map((next) => (
        <button
          key={next}
          className={next === status ? "chip chip-on" : "chip"}
          onClick={() => onStatusChange(next)}
        >
          {LABELS[next]}
        </button>
      ))}
    </div>
  );

  // Several variables, one return. The JSX below reads as the shape of the
  // card; the decisions that built it are above, out of the way.
  return (
    <article className={cardClass}>
      <div className="card-top">
        <h3 className="card-title">{title}</h3>
        <StatusTag status={status} />
      </div>

      <p className="card-author">{author}</p>

      {ratingLine}
      {tagList}
      {actions}

      {notes && (
        <button className="card-notes-toggle" onClick={handleToggleNotes}>
          {notesShown ? "Hide notes" : "Show notes"}
        </button>
      )}
      {notesShown && <p className="card-notes">{notes}</p>}
    </article>
  );
}

export default BookCard;
