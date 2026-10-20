// The one place the API's address is written down.
//
// A module constant rather than a string typed into each fetch, for the
// ordinary reason: when this moves -- to a teammate's machine, to a deployed
// server, to an environment variable in week 10 -- it moves once.
//
// Port 4000 is not a free choice. `demos/355/shelf-api` listens there, and it
// stays there for the rest of the quarter.
export const API = "http://localhost:4000/api/books";

// ── Making the four states happen on purpose ────────────────────────────────
//
// On localhost every request comes back in about two milliseconds, so the
// `loading` screen flashes past too fast to believe in and the error branch
// never runs at all. The API is built to misbehave on request, and none of it
// is plumbed into this file -- it is asked for where it is visible:
//
//   SHELF_DELAY_MS=2000 npm run dev      (in shelf-api) -- every request is
//                                        slow, so the wait panel is on screen long
//                                        enough to read. It slows every
//                                        request equally, so it does NOT race
//                                        two books: for that, add ?delay= to
//                                        one book's request only
//   fetch(API + "?fail=500")             the failed panel, with a real 500
//   fetch(API + "?q=zzz")                a 200 carrying [] -- the empty
//                                        screen. Empty is a success, not a
//                                        failure, and this is how to see it
//
// The last two are a one-line edit at the call site while the class watches.
// Nothing here is secretly on.
