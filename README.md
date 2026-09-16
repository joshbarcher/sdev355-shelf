# SDEV 355 — the Shelf

The app the lectures are written from. **One branch per teaching week**, so you can
check out the Shelf exactly as it stood when a given week finished.

```bash
git clone <this repo> shelf
cd shelf
git checkout week-2      # the Shelf as it stands after Week 2
npm install
npm run dev
```

## Branches

| branch | the Shelf after | what it can do |
|---|---|---|
| `week-2` | w2.1 Conditional Rendering + Lists · w2.2 Rendering Patterns | one hardcoded array, filtered four ways, rendered through `Panel` → `BookCard` → `StatusTag`. Empty sections say so. Nothing on the page can change. |
| `week-3` | w3.1 State + useState | the array lives in state, and a book can be marked finished |

`main` always points at the newest week.

## What each part is

| file | first taught in |
|---|---|
| `src/components/BookCard.jsx` | w1.2 — props, defaults, `children` |
| `src/components/StatusTag.jsx` | w1.2 — a small component with one job |
| `src/components/Header.jsx` | w1.2 — props down |
| `src/components/Panel.jsx` | w1.2 `children`, w2.2 the empty state |
| `src/App.jsx` | w2.1 `filter` + `map` + keys, w2.2 composition |

## Where this comes from

Generated from `teaching-kit/demos/355/shelf-component-tree`, which is the source of
truth. If a slide and this app disagree, **the app is right** — that is the rule the
decks are built to. Do not edit a week branch by hand; change the demo and republish.
