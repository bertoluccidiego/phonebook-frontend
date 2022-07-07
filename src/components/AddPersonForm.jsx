function AddPersonForm({ addPerson, newName, newNumber, setNewName, setNewNumber }) {
  return (
    <div>
      <h2>Add person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={({ target }) => setNewName(target.value)} />
          <br />
          number: <input value={newNumber} onChange={({ target }) => setNewNumber(target.value)} />
        </div>
        <button type="submit">
          add
        </button>
      </form>
    </div>
  );
}

export default AddPersonForm;
