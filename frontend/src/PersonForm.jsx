import PropTypes from 'prop-types';

const PersonForm = (props) => (
    <form onSubmit={props.addNameAndNumber}>
        <div>
            name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
            number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

PersonForm.propTypes = {
    addNameAndNumber: PropTypes.func.isRequired,
    newName: PropTypes.string.isRequired,
    newNumber: PropTypes.string.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleNumberChange: PropTypes.func.isRequired,
};

export default PersonForm