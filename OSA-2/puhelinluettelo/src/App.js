import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notifications from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Johanna Rousi", number: "09-463265142" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ msg: null, errormsg: null });

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const addName = e => {
    e.preventDefault();
    if (!persons.find(person => person.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      };

      personService.create(personObject).then(data => {
        setPersons(persons.concat(data));
      });
      setMessage({ ...message, msg: `Added ${newName}` });
      setNewName("");
      setNumber("");
      setTimeout(() => {
        setMessage({ ...message, msg: null });
      }, 5000);
    } else {
      for (let p of persons) {
        if (p.name === newName) {
          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            const changedPerson = { ...p, number: newNumber };

            personService
              .update(p.id, changedPerson)
              .then(data => {
                setPersons(
                  persons.map(person => (person.id !== p.id ? person : data))
                );
              })
              .catch(error => {
                setMessage({
                  ...message,
                  errormsg: `Information of ${newName} has already been removed from server`
                });
                setPersons(persons.filter(n => n.id !== p.id));
                setTimeout(() => {
                  setMessage({ ...message, errormsg: null });
                }, 5000);
              });
            setMessage({ ...message, msg: `${newName}'s number was changed` });
            setNewName("");
            setNumber("");
            setTimeout(() => {
              setMessage({ ...message, msg: null });
            }, 5000);
          } else {
            setNewName("");
            setNumber("");
          }
        }
      }
    }
  };

  const removePerson = id => {
    let personToBeDeleted = persons.filter(person => person.id === id)[0].name;
    if (window.confirm(`Do you really want to delete ${personToBeDeleted}?`)) {
      personService.remove(id).then(res => {
        let personsWithoutDeletedPerson = persons.filter(
          person => person.id !== id
        );
        setPersons(personsWithoutDeletedPerson);
      });
      setMessage({ ...message, msg: `${personToBeDeleted} was deleted` });

      setTimeout(() => {
        setMessage({ ...message, msg: null });
      }, 5000);
    }
  };

  const showNumbers = () => {
    let letters = search.toLowerCase();
    return search
      ? persons
          .filter(person => person.name.toLowerCase().includes(letters))
          .map(person => (
            <p key={person.name}>
              {person.name} {person.number}{" "}
              <button onClick={() => removePerson(person.id)}>Delete</button>
            </p>
          ))
      : persons.map(person => (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => removePerson(person.id)}>Delete</button>
          </p>
        ));
  };

  const onChange = e => {
    let value = e.target.value;
    setNewName(value);
  };
  const onNumberChange = e => {
    let value = e.target.value;
    setNumber(value);
  };
  const onFilterChange = e => {
    let value = e.target.value;
    setSearch(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={message} />
      <Filter onChange={onFilterChange} value={search} />
      <h3>Add a new number</h3>
      <PersonForm
        onSubmit={addName}
        onChange={onChange}
        value={newName}
        onNumberChange={onNumberChange}
        numberValue={newNumber}
      />

      <h3>Numbers</h3>
      {showNumbers()}
    </div>
  );
};

export default App;
