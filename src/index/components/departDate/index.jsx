import React, { useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import cutTime from "../../../utility/cutTime";

import "./index.css";

function DepartDate(props) {
    const { time, onClick } = props;

    //裁剪掉时间中的时分秒毫秒
    const cutDepartTime = cutTime(time);
    const departDate = new Date(cutDepartTime);

    const formatDepartDate = useMemo(() => {
        return dayjs(cutDepartTime).format("YYYY/MM/DD");
    }, [cutDepartTime]);

    //判断是不是今天，当cutTime不传参时默认参数为Date.now()
    const isToday = cutDepartTime === cutTime();
    const weekDay = `周${
        ["日", "一", "二", "三", "四", "五", "六"][departDate.getDay()]
    }${isToday ? "(今天)" : ""}`;

    return (
        <div className="depart-date" onClick={onClick}>
            <input name="date" type="hidden" value={formatDepartDate} />
            {formatDepartDate}
            <span className="depart-week">{weekDay}</span>
        </div>
    );
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default DepartDate;
