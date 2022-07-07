import Person from './Person';

function Numbers({ persons, deletePerson }) {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
      </ul>
    </div>
  );
}

export default Numbers;
