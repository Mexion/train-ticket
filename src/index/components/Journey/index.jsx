import React from "react";
import PropTypes from "prop-types";

import switchImg from "./images/switch.svg";

import "./index.css";

function Journey(props) {
    const { from, to, exchangeFromTo, showCitySelector } = props;

    return (
        <div className="journey">
            <div
                className="journey-station"
                onClick={() => {
                    showCitySelector(true);
                }}
            >
                <input
                    type="text"
                    name="from"
                    readOnly
                    value={from}
                    className="journey-input journey-from"
                />
            </div>
            <div className="journey-switch" onClick={exchangeFromTo}>
                <img src={switchImg} alt="switch" width="70" height="40" />
            </div>
            <div
                className="journey-station"
                onClick={() => {
                    showCitySelector(false);
                }}
            >
                <input
                    type="text"
                    name="to"
                    readOnly
                    value={to}
                    className="journey-input journey-to"
                />
            </div>
        </div>
    );
}

Journey.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    exchangeFromTo: PropTypes.func.isRequired,
    showCitySelector: PropTypes.func.isRequired,
};

export default Journey;
