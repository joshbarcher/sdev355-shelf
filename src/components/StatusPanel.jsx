// The three non-data screens -- loading, error, empty -- are one component.
//
// They were three (Waiting, Failed, NothingYet) that differed only in a class
// and a sentence; that is exactly what props are for. `status` picks the
// style, `children` is the message, and `onRetry`, when it is given, adds the
// Try again button. StatusPanel fetches nothing: App decides which one to
// show and what it says.
function StatusPanel({ status, onRetry, children }) {
  return (
    <section className="panel">
      <h2 className="panel-title">Your shelf</h2>
      <p className={`state state-${status}`}>{children}</p>
      {onRetry && (
        <button className="state-retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </section>
  );
}

export default StatusPanel;
