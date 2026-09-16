// The three statuses a book can be in, in the order they make sense as a
// journey. w3.2 maps over this to build the buttons on a card, so the labels
// and the order live in one place.
export const STATUSES = ["want", "reading", "finished"];

export const LABELS = {
  reading: "Reading",
  want: "Want to read",
  finished: "Finished",
};

function StatusTag({ status }) {
  return <span className={`status status--${status}`}>{LABELS[status]}</span>;
}

export default StatusTag;
