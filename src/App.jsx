import { useState, useEffect } from "react";

import AddPersonForm from "./components/AddPersonForm";
import Numbers from "./components/Numbers";
import FilterForm from "./components/FilterForm";
import Notification from "./components/Notification";

import personsService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  });

  useEffect(() => {
    personsService
      .getAll()
      .then((fetchedPersons) => {
        setPersons(fetchedPersons);
      })
      .catch((exception) => {
        console.log(exception);
      });
  }, []);

  function addPerson(event) {
    event.preventDefault();

    const foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson) {
      if (
        window.confirm(
          `${foundPerson.name} is already added to phonebook, replace the old number with the new one`
        )
      ) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
        };
        personsService
          .update(foundPerson.id, updatedPerson)
          .then((modifiedPerson) => {
            const updatedPersons = persons.map((p) =>
              p.id === foundPerson.id ? modifiedPerson : p
            );
            setPersons(updatedPersons);
            setNotification({
              message: `${foundPerson.name} modified`,
              error: false,
            });
            setTimeout(() => {
              setNotification({
                message: null,
                error: false,
              });
            }, 5000);
          })
          .catch((exception) => {
            console.log(exception);
            setNotification({
              message: exception,
              error: true,
            });
            setTimeout(() => {
              setNotification({
                message: null,
                error: false,
              });
            }, 5000);
            console.log(exception);
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
        setNotification({
          message: `${addedPerson.name} added`,
          error: false,
        });
        setTimeout(() => {
          setNotification({
            message: null,
            error: false,
          });
        }, 5000);
      })
      .catch((exception) => {
        setNotification({
          message: exception.response.data.error,
          error: true,
        });
        setTimeout(() => {
          setNotification({
            message: null,
            error: false,
          });
        }, 5000);
        console.log(exception);
      });
  }

  function deletePerson(person) {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    personsService
      .remove(person.id)
      .then(() => {
        const updatedPersons = persons.filter((p) => p.id !== person.id);
        setPersons(updatedPersons);
        setNotification({
          message: `${person.name} deleted`,
          error: false,
        });
        setTimeout(() => {
          setNotification({
            message: null,
            error: false,
          });
        }, 5000);
      })
      .catch((exception) => {
        setNotification({
          message: exception,
          error: true,
        });
        setTimeout(() => {
          setNotification({
            message: null,
            error: false,
          });
        }, 5000);
        console.log(exception);
      });
  }

  const personsToShow = nameFilter
    ? persons.filter((person) =>
        person.name.toUpperCase().includes(nameFilter.toUpperCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} error={notification.error} />
      <FilterForm nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <Numbers persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
