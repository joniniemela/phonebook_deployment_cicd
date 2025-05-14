import PersonItem from "./PersonItem.jsx";

const PersonList = (props) => (
    <>{props.personsToShow.map(person => <PersonItem key={person.id} persons={person} deleteNumber={() => props.deleteNumber(person.id)} />)}</>
)

export default PersonList