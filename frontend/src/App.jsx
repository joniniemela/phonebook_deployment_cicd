import { useState, useEffect } from 'react'
import personService from './services/persons'
import ErrorNotification from './ErrorNotification.jsx'
import InfoNotification from './InfoNotification.jsx'
import PersonForm from './PersonForm.jsx'
import PersonList from './PersonList.jsx'
import PersonFilter from './PersonFilter.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const personsToShow = showAll ? persons : persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()));
    useEffect(() => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons);
        });
    }, []);

    const addNameAndNumber = (event) => {
        event.preventDefault();
        const existingPerson = persons.find(person => person.name === newName);

        if (existingPerson) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const updatedPerson = { ...existingPerson, number: newNumber };

                personService.update(existingPerson.id, updatedPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person));
                        setNewName('');
                        setNewNumber('');
                        setInfoMessage(`Updated ${newName}'s number`);
                        setTimeout(() => setInfoMessage(null), 5000);
                    })
                    .catch(error => {
                        setErrorMessage(`Information of ${newName} was already removed from the server`);
                        setTimeout(() => setErrorMessage(null), 5000);
                        setPersons(persons.filter(person => person.id !== existingPerson.id));
                    });
            }
        } else {
            const nameObject = { name: newName, number: newNumber };

            personService.create(nameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                    setInfoMessage(`Added ${newName} to phonebook`);
                    setTimeout(() => setInfoMessage(null), 5000);
                });
        }
    };
    const deleteNumber = (id) => {
        const person = persons.find(person => person.id === id);
        if (!person) return;

        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.deleteEntry(id)
                .then(() => {
                    setPersons(prevPersons => prevPersons.filter(p => p.id !== id));
                })
                .catch(() => {
                    setErrorMessage(`Information of ${person.name} was already removed from the server`);
                    setTimeout(() => setErrorMessage(null), 5000);
                    setPersons(prevPersons => prevPersons.filter(p => p.id !== id));
                });
        }
    };
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };
  const handleNameSearch = (event) => {
    setFilterName(event.target.value)
    if (event.target.value === '') {setShowAll(true)} else {setShowAll(false)}
  };
  return (
    <div>
        <h2>Phonebook</h2>
        <InfoNotification message={infoMessage}/>
        <ErrorNotification message={errorMessage}/>
        <PersonFilter filterName={filterName} handleNameSearch={handleNameSearch} />
        <h2>add a new</h2>
        <PersonForm addNameAndNumber={addNameAndNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <div>
            <PersonList deleteNumber={deleteNumber} personsToShow={personsToShow}/>
        </div>
    </div>
    )
};

export default App
