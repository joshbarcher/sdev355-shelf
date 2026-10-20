import { useEffect, useState } from "react";

import { API } from "../api.js";
import StatusTag from "./StatusTag.jsx";

// One book, fetched on its own.
//
// It is the same component every time -- React does not throw it away and
// build a new one when the id changes, it re-renders THIS one with a new prop
// and re-runs the effect, because `id` is in the dependency array. Same four
// states as the list, one book instead of five.
//
// The id arrives as a prop. It is `currentId`, which App has owned since w3.2,
// so nothing here needs a router: clicking Reading on a card changes the id
// and this view follows. The URL catches up in week 6.
function BookDetail({ id }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // THE RACE, AND THE THREE LINES THAT SETTLE IT.
    //
    // Click one book, then another before the first answers, and two requests
    // are in flight at once. Each run of this effect is correct on its own;
    // what nobody wrote down is the order the ANSWERS come back in. Without
    // the flag below, the slow first answer lands last and puts the book you
    // stopped asking for on the screen.
    //
    // `ignore` is a fresh variable per run of the effect, so this run's
    // cleanup can only ever switch off this run. React runs that cleanup
    // BEFORE the next setup, which is exactly the moment the old answer stops
    // mattering. The request itself carries on -- see AbortController for
    // stopping it for real -- but its answer is dropped on the floor.
    let ignore = false;

    async function load() {
      // Back to the waiting screen: a new id means a new wait. Without this
      // the previous book stays on screen while the new one is fetched, which
      // looks like the app answered instantly and wrongly.
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API}/${id}`);

        // fetch does not throw on a 404 or a 500. It rejects only when the
        // request never happened at all -- no network, bad host, blocked. A
        // status you did not want is a perfectly successful request carrying
        // bad news, and noticing it is your job.
        if (!res.ok) throw new Error(`the server answered ${res.status}`);

        const data = await res.json();
        if (!ignore) setBook(data);
      } catch (err) {
        // The user gets a sentence; the console gets the exception, because
        // that is where the person who can fix it is looking.
        console.error(err);
        if (!ignore) setError(err.message);
      } finally {
        // The only branch both paths reach. Put setLoading(false) at the end
        // of `try` instead and a failed request leaves the spinner up forever.
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <p className="detail detail-wait">Opening that book…</p>;
  if (error) {
    return <p className="detail detail-failed">Could not open it: {error}.</p>;
  }

  return (
    <section className="detail">
      <div className="detail-top">
        <h2 className="detail-title">{book.title}</h2>
        <StatusTag status={book.status} />
      </div>
      <p className="detail-author">{book.author}</p>
      {book.notes && <p className="detail-notes">{book.notes}</p>}
    </section>
  );
}

export default BookDetail;
