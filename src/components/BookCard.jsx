import StatusTag from "./StatusTag.jsx";

function BookCard({ title, author, status, rating = 0, tags = [] }) {
  // A ternary: exactly two outcomes, and one of them always happens.
  const cardClass = status === "finished" ? "card card--finished" : "card";

  // One thing or nothing, so &&. Note `rating > 0` and not a bare `rating`:
  // 0 is falsy, and && hands back its LEFT side when that side is falsy, so
  // a bare `rating &&` would print a literal 0 on the page.
  const ratingLine = rating > 0 && (
    <p className="card__rating">
      <span className="card__stars">{"★".repeat(rating)}</span>
      <span className="card__stars card__stars--empty">
        {"☆".repeat(5 - rating)}
      </span>
    </p>
  );

  // A list inside a list. This key only has to be unique among ITS siblings,
  // so a tag name is fine even though the book list outside is keyed by id.
  const tagList = tags.length > 0 && (
    <ul className="card__tags">
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );

  // Several variables, one return. The JSX below reads as the shape of the
  // card; the decisions that built it are above, out of the way.
  return (
    <article className={cardClass}>
      <div className="card__top">
        <h3 className="card__title">{title}</h3>
        <StatusTag status={status} />
      </div>

      <p className="card__author">{author}</p>

      {ratingLine}
      {tagList}
    </article>
  );
}

export default BookCard;
