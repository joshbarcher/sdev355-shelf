# SDEV 355 — the Shelf

The app the lectures are written from. **One branch per teaching week**, so you can
check out the Shelf exactly as it stood when a given week finished. Each session
that changes the app is also tagged (`w3.1`, `w4.1`, `w4.2`).

```bash
git clone <this repo> shelf
cd shelf
git checkout week-4      # the Shelf as it stands after Week 4
npm install
npm run dev
```

**From week 4 the Shelf loads its books from the Shelf API**
(`github.com/joshbarcher/sdev355-shelf-api`). Run it alongside:

```bash
git clone https://github.com/joshbarcher/sdev355-shelf-api
cd sdev355-shelf-api && npm install && npm run dev      # http://localhost:4000
```

Without it, the Shelf opens on its error screen, with a Try again button.

## Branches

| branch | the Shelf after | what it can do |
|---|---|---|
| `week-2` | w2.1 Conditional Rendering + Lists · w2.2 Rendering Patterns | one hardcoded array, filtered four ways, rendered through `Panel` → `BookCard` → `StatusTag`. Empty sections say so. Nothing on the page can change. |
| `week-3` | w3.1 State + useState · w3.2 Events + Lifting State Up | the array lives in state; a book's status can change; a search box and an add form |
| `week-4` | w4.1 Side Effects + useEffect · w4.2 Fetching Data | three effects (tab title, `f` shortcut, reading timer); the books come from the API, with loading, error and empty screens |

`main` always points at the newest week.

## What each part is

| file | first taught in |
|---|---|
| `src/components/BookCard.jsx` | w1.2 — props, defaults, `children` |
| `src/components/StatusTag.jsx` | w1.2 — a small component with one job |
| `src/components/Header.jsx` | w1.2 — props down |
| `src/components/Panel.jsx` | w1.2 `children`, w2.2 the empty state |
| `src/App.jsx` | w2.1 `filter` + `map` + keys, w2.2 composition, w3 state, w4 effects and fetching |
| `src/components/ReadingTimer.jsx` | w4.1 — an effect with a cleanup |
| `src/api.js` | w4.2 — the API's address, written down once |
| `src/components/StatusPanel.jsx` | w4.2 — one component for the loading, error and empty screens |
| `src/components/ShelfBody.jsx` | w4.2 — picks one of four screens from props |
| `src/components/BookDetail.jsx` | w4.2 — one book by id, and ignoring a stale response |

## Where this comes from

Generated from `teaching-kit/demos/355/shelf-wNN`, the frozen state each session
leaves behind, which is the source of truth. If a slide and this app disagree,
**the app is right** — that is the rule the decks are built to. Do not edit a week
branch by hand; change the demo and republish.
