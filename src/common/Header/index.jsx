import React from "react";
import PropTypes from "prop-types";

import Back from "../Back";

import "./index.css";

function Header(props) {
    const { onBack, title } = props;
    return (
        <div className="header">
            <Back className="header-back" onBack={onBack} />
            <h1 className="header-title"> {title}</h1>
        </div>
    );
}

Header.propTypes = {
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;
