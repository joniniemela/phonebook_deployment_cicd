import PropTypes from 'prop-types';

const PersonFilter = (props) => <div>search with<input value={props.filterName} onChange={props.handleNameSearch}/></div>

PersonFilter.propTypes = {
    filterName: PropTypes.string.isRequired,
    handleNameSearch: PropTypes.func.isRequired
};

export default PersonFilter