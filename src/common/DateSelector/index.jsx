import React from "react";
import PropTypes from "prop-types";

import Header from "../Header";

import cutTime from "../../utility/cutTime";

import "./index.css";

//天组件
function Day(props) {
    const { day, onSelect } = props;

    //为不同的天赋予不同的样式
    const classes = [];
    const now = cutTime();
    //如果是周末则添加周末样式
    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push("weekend");
    }
    //如果是过去的天数，就添加灰色样式且不能点击
    if (day < now) {
        classes.push("disabled");
    }

    //为每天赋予不同的文字，今天显示“今天”，否则显示日期，如果为null则为空字符串
    let dateString = "";
    switch (day) {
        case now:
            dateString = "今天";
            break;
        case null:
            break;
        default:
            dateString = new Date(day).getDate();
    }

    return (
        <td className={classes.join(" ")} onClick={() => onSelect(day)}>
            {dateString}
        </td>
    );
}

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};

//周组件
function Week(props) {
    const { days, onSelect } = props;

    return (
        <tr className="date-table-days">
            {days.map((day, index) => {
                return <Day key={index} day={day} onSelect={onSelect} />;
            })}
        </tr>
    );
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

//月份组件
function Month(props) {
    const { startingTimeInMonth, onSelect } = props;
    //startDay是固定不变的，当前月的第一天，currentDay会变，直到最后一天
    const startDay = new Date(startingTimeInMonth);
    const currentDay = new Date(startingTimeInMonth);

    //用于存储一个月的所有天数，直到currentDay的月份不再是当前月
    let days = [];
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        //每循环一次currentDay都加一天
        currentDay.setDate(currentDay.getDate() + 1);
    }
    //因为日历中每个月的第一天不都是星期一
    //所以当不是星期一时就要在第一天前面补齐一定的空天数
    //首先创建一个新的数组，位数由当前的日期决定，星期天getDay为0时前面填充6天
    //否则填充(当前日期减一天)，生成数组后连接之前的所有天数的数组即可获得这个月的所有天数，包括需要填充的空天数
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null)
        .concat(days);

    //与上面一致，在月末也要填补一定的空天数
    //如果最后一天的日期为星期天，补0天，否则补（7减当前日期天）
    const lastDay = new Date(days[days.length - 1]);
    days = days.concat(
        new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
    );

    //得到总天数后就要进行分组，每一个星期(7天)为一组
    const weeks = [];
    for (let row = 0; row < days.length / 7; ++row) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }
    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}
                            月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周七</th>
                </tr>
                {weeks.map((week, index) => {
                    return <Week key={index} days={week} onSelect={onSelect} />;
                })}
            </tbody>
        </table>
    );
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default function DateSelector(props) {
    const { isDateSelectorVisible, onSelect, onBack } = props;
    //将时间转为本月的第一天的0时0分0秒0毫秒
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);
    //将当前月与后两个月的第一天都加入一个数组中
    const mothSequence = [now.getTime()];
    now.setMonth(now.getMonth() + 1);
    mothSequence.push(now.getTime());
    now.setMonth(now.getMonth() + 1);
    mothSequence.push(now.getTime());

    return (
        <div
            className={`date-selector ${
                !isDateSelectorVisible ? "hidden" : ""
            }`}
        >
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {mothSequence.map(month => {
                    return (
                        <Month
                            key={month}
                            startingTimeInMonth={month}
                            onSelect={onSelect}
                        />
                    );
                })}
            </div>
        </div>
    );
}

DateSelector.propTypes = {
    isDateSelectorVisible: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};
