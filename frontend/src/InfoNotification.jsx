import PropTypes from 'prop-types';

const InfoNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='info'>
            {message}
        </div>
    )
}

InfoNotification.propTypes = {
    message: PropTypes.string,
};

export default InfoNotification

