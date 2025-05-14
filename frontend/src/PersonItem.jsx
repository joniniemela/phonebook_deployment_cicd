const PersonItem = (props) => {
    return (<p>{props.persons.name} {props.persons.number} <button onClick={props.deleteNumber}>Delete</button></p>)
}

export default PersonItem