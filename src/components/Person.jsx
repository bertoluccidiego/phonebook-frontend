function Person({ person, deletePerson }) {
  return (
    <li>
      {person.name} {person.number}
      <button type="button" onClick={() => deletePerson(person)}>
        delete
      </button>
    </li>
  );
}

export default Person;
