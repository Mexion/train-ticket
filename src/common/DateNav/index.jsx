import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './index.css';

const DateNav = memo(function DateNav(props) {
    const { 
        date,
        prevClick,
        nextClick,
        isPrevDisabled,
        isNextDisabled
     } = props;

     const currentString = useMemo(() => {
        const day = dayjs(date);
        return day.format('M月D日') + day.locale('zh-cn').format('dddd');
     }, [date])

    return (
        <div className="nav">
            <span
                onClick={ prevClick }
                className={ `nav-prev ${ isPrevDisabled ? 'nav-disabled' : '' }` }>
                前一天
            </span>
            <span className="nav-current">{ currentString }</span>
            <span
                onClick={ nextClick }
                className={ `nav-next ${ isNextDisabled ? 'nav-disabled' : '' }` }>
                后一天
            </span>
        </div>
    );
});

DateNav.propTypes = {
    date: PropTypes.number.isRequired,
    prevClick: PropTypes.func.isRequired,
    nextClick: PropTypes.func.isRequired,
    isPrevDisabled: PropTypes.bool.isRequired,
    isNextDisabled: PropTypes.bool.isRequired
};

export default DateNav;