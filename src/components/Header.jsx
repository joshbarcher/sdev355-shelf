function Header({ owner, bookCount }) {
  return (
    <header className="header">
      <h1 className="header__title">Shelf</h1>
      <p className="header__meta">
        {owner} · {bookCount} books
      </p>
    </header>
  );
}

export default Header;
