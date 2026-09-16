const LABELS = {
  reading: "Reading",
  want: "Want to read",
  finished: "Finished",
};

function StatusTag({ status }) {
  return <span className={`status status--${status}`}>{LABELS[status]}</span>;
}

export default StatusTag;
