import React from "react";
import PropTypes from "prop-types";

export default function Back(props) {
    const {
        onBack = window.history.back,
        className = "back",
        width = "42",
        height = "42",
        points = "25,13 16,21 25,29",
        stroke = "#fff",
        strokeWidth = "2",
        fill = "none",
    } = props;
    return (
        <div className={className} onClick={() => onBack()}>
            <svg width={width} height={height}>
                <polyline
                    points={points}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    fill={fill}
                />
            </svg>
        </div>
    );
}

Back.propTypes = {
    onBack: PropTypes.func,
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    points: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.string,
    fill: PropTypes.string,
};
