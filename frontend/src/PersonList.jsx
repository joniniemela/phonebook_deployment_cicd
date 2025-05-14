import PersonItem from "./PersonItem.jsx";

const PersonList = (props) => (
    <>{props.personsToShow.map(person => <PersonItem key={person.id} persons={person} deleteNumber={() => props.deleteNumber(person.id)} />)}</>
)

import PropTypes from "prop-types";

PersonList.propTypes = {
    personsToShow: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired
    ).isRequired,
    deleteNumber: PropTypes.func.isRequired,
};

export default PersonList