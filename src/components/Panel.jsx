function Panel({ title, children }) {
  // An early return: use it when the WHOLE output changes, not one line
  // inside it. `children` here is the array a .map() handed back, so an
  // empty shelf section is an empty array -- truthy, but with nothing in it.
  const isEmpty = !children || children.length === 0;

  if (isEmpty) {
    return (
      <section className="panel">
        <h2 className="panel-title">{title}</h2>
        <p className="panel-none">Nothing here yet.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2 className="panel-title">{title}</h2>
      <div className="panel-body">{children}</div>
    </section>
  );
}

export default Panel;
