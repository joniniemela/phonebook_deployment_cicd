import PropTypes from 'prop-types';
const PersonItem = (props) => {
    return (<p>{props.persons.name} {props.persons.number} <button onClick={props.deleteNumber}>Delete</button></p>)
}

PersonItem.propTypes = {
    persons: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    deleteNumber: PropTypes.func.isRequired,
};

export default PersonItem