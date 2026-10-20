import { useEffect, useState } from "react";

// w4.1: the smallest component in the app, and the only one that has to be
// TOLD to stop.
//
// A `setInterval` is not React's. React did not start it and React will not
// end it -- so the effect that starts one has to hand back the instructions
// for stopping it. That is what `return () => clearInterval(id)` is: not a
// call, a function. React holds it and runs it at the moment it knows about
// and you do not -- before the next run of this setup, and again when this
// component leaves the page.
//
// NowReading renders this only when there IS a current book, so switching to
// "nothing is being read" unmounts it. That is the unmount cleanup happening
// live, in front of the room, with no special effort: stop reading, and the
// interval stops with the component.
function ReadingTimer({ bookId }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Reset FIRST, inside the setup. `bookId` is in the array below, so a new
    // book means: cleanup for the old book, then this whole setup again --
    // and the first thing it does is put the clock back to zero. Do this
    // outside the effect and you get the old book's elapsed time under the
    // new book's title.
    setSeconds(0);

    // The updater form, not `setSeconds(seconds + 1)`. This setup runs once
    // per book; the arrow it hands to setInterval would capture the `seconds`
    // that render had (0) and keep adding 1 to it forever.
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);

    return () => clearInterval(id);
  }, [bookId]);

  return <span className="now-timer">Reading for {seconds}s</span>;
}

export default ReadingTimer;
