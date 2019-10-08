import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import URI from "urijs";
import dayjs from "dayjs";

import "./index.css";

const ScheduleRow = memo(function ScheduleRow(props) {
    const {
        //从上至下分别是车站序号、车站名、到达时间、发车时间、停留时间
        index,
        station,
        arriveTime,
        departTime,
        stay,

        //从上至下分别是 是否是始发站、是否是终点站、是否是行程出发车站、是否是行程终到站、
        //是否在出发车站之前、是否在到达车站之后
        isStartStation,
        isEndStation,
        isDepartStation,
        isArriveStation,
        isBeforeDepartStation,
        isAfterArriveStation,
    } = props;

    return (
        <li>
            <div
                className={`icon ${
                    isDepartStation || isArriveStation ? "icon-red" : ""
                }`}
            >
                {//三元表达式多个条件是可以连写的，从左至右依次判断
                isDepartStation
                    ? "出"
                    : isArriveStation
                    ? "到"
                    : String(index).padStart(2, "0")}
            </div>
            <div
                className={`row ${
                    isBeforeDepartStation || isAfterArriveStation ? "grey" : ""
                }`}
            >
                <span
                    className={`station ${
                        isDepartStation || isArriveStation ? "red" : ""
                    }`}
                >
                    {station}
                </span>
                <span className={`arrtime ${isArriveStation ? "red" : ""}`}>
                    {isStartStation ? "始发站" : arriveTime}
                </span>
                <span className={`deptime ${isDepartStation ? "red" : ""}`}>
                    {isEndStation ? "终到站" : departTime}
                </span>
                <span className="stoptime">
                    {isStartStation || isEndStation ? "-" : `${stay}分`}
                </span>
            </div>
        </li>
    );
});

ScheduleRow.propTypes = {
    index: PropTypes.number.isRequired,
    station: PropTypes.string.isRequired,
    arriveTime: PropTypes.string,
    departTime: PropTypes.string,
    stay: PropTypes.number,
    isStartStation: PropTypes.bool.isRequired,
    isEndStation: PropTypes.bool.isRequired,
    isDepartStation: PropTypes.bool.isRequired,
    isArriveStation: PropTypes.bool.isRequired,
    isBeforeDepartStation: PropTypes.bool.isRequired,
    isAfterArriveStation: PropTypes.bool.isRequired,
};

const Schedule = memo(function Schedule(props) {
    const { date, trainNumber, departStation, arriveStation } = props;

    //定义时刻表数据
    const [scheduleList, setScheduleList] = useState([]);

    useEffect(() => {
        //构造请求接口
        const url = new URI("/rest/schedule")
            .setSearch("trainNumber", trainNumber)
            .setSearch("departStation", departStation)
            .setSearch("arriveStation", arriveStation)
            .setSearch("date", dayjs(date).format("YYYY-MM-DD"))
            .toString();
        //发送请求，抓取时刻表数据
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //抓取的数据需要自己进行一定的判断，有些属性需要自己添加

                //定义两个变量存储是否找到了出发车站和到达车站
                let depart;
                let arrive;
                for (let i = 0; i < data.length; ++i) {
                    //如果还没找到出发车站
                    if (!depart) {
                        //如果该车站与我们传入的出发车站相同，则为出发车站
                        if (data[i].station === departStation) {
                            depart = Object.assign(data[i], {
                                isBeforeDepartStation: false,
                                isDepartStation: true,
                                isAfterArriveStation: false,
                                isArriveStation: false,
                            });
                        } else {
                            //否则就是在出发车站之前的车站
                            Object.assign(data[i], {
                                isBeforeDepartStation: true,
                                isDepartStation: false,
                                isAfterArriveStation: false,
                                isArriveStation: false,
                            });
                        }
                    } else if (!arrive) {
                        //如果还没找到到达车站并且已经找到了
                        if (data[i].station === arriveStation) {
                            //是到达车站
                            arrive = Object.assign(data[i], {
                                isBeforeDepartStation: false,
                                isDepartStation: false,
                                isAfterArriveStation: false,
                                isArriveStation: true,
                            });
                        } else {
                            //不是之前的车站也不是之后的车站，是乘坐区间车站
                            Object.assign(data[i], {
                                isBeforeDepartStation: false,
                                isDepartStation: false,
                                isAfterArriveStation: false,
                                isArriveStation: false,
                            });
                        }
                    } else {
                        //出发车站和到达车站都已经找到，后面的都是到达车站后面的车站
                        Object.assign(data[i], {
                            isBeforeDepartStation: false,
                            isDepartStation: false,
                            isAfterArriveStation: true,
                            isArriveStation: false,
                        });
                    }
                    //还需要判断是否是始发站和终到站（每一项都要进行判断）
                    //很显然，列表第一项一定是始发站，最后一站一定是终点站
                    Object.assign(data[i], {
                        isStartStation: i === 0,
                        isEndStation: i === data.length - 1,
                    });
                }
                //遍历结束，将处理好的数组保存到state
                setScheduleList(data);
            });
    }, [date, trainNumber, departStation, arriveStation]);

    return (
        <div className="schedule">
            <div className="dialog">
                <h1>列车时刻表</h1>
                <div className="head">
                    <span className="station">车站</span>
                    <span className="arrtime">到达</span>
                    <span className="deptime">发车</span>
                    <span className="stoptime">停留时间</span>
                </div>
                <ul>
                    {scheduleList.map((schedule, index) => {
                        return (
                            <ScheduleRow
                                key={schedule.station}
                                index={index + 1}
                                {...schedule}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
});

Schedule.propTypes = {
    date: PropTypes.number.isRequired,
    trainNumber: PropTypes.string.isRequired,
    departStation: PropTypes.string.isRequired,
    arriveStation: PropTypes.string.isRequired,
};

export default Schedule;
