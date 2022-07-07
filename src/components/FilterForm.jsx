function FilterForm({ nameFilter, setNameFilter }) {
  return (
    <div>
      <h2>Name filter</h2>
      <input value={nameFilter} onChange={({ target }) => setNameFilter(target.value)} />
    </div>
  );
}

export default FilterForm;
