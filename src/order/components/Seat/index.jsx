import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Seat = memo(function Seat(props) {
    const {
        price,
        type
    } = props;

    return (
        <div className="ticket">
            <p>
                <span className="ticket-type">{ type }</span>
                <span className="ticket-price">{ price }</span>
            </p>
            <div className="label">坐席</div>
        </div>
    );
});

Seat.propTypes = {
    ticket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired
}

export default Seat;