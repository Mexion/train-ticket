import React, { useState, memo, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

import Slider from "../Slider";

import "./index.css";
import { ORDER_DEPART } from "../../constant";

const Filter = memo(function Filter(props) {
    const { name, value, checked, dispatch } = props;

    return (
        <li
            className={`${checked ? "checked" : ""}`}
            onClick={() => {
                dispatch({ type: "toggle", payload: value });
            }}
        >
            {name}
        </li>
    );
});

Filter.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const Option = memo(function Option(props) {
    const { title, options, checkedMap, dispatch } = props;

    return (
        <div className="option">
            <h3>{title}</h3>
            <ul>
                {options.map(option => {
                    return (
                        <Filter
                            {...option}
                            key={option.value}
                            checked={option.value in checkedMap}
                            dispatch={dispatch}
                        />
                    );
                })}
            </ul>
        </div>
    );
});

Option.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    checkedMap: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const BottomModal = memo(function BottomModal(props) {
    const {
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
        toggleIsFilterVisible,
    } = props;

    function checkedReducer(state, action) {
        const { type, payload } = action;
        let newState;
        switch (type) {
            case "toggle":
                newState = JSON.parse(JSON.stringify(state));
                if (payload in newState) {
                    delete newState[payload];
                } else {
                    newState[payload] = true;
                }
                return newState;

            case "reset":
                return {};

            default:
        }
        return state;
    }

    //因为要点击确定后才生效，所以需要生成本地化缓存数据
    const [
        localCheckedTicketTypes,
        localCheckedTicketTypesDispatch,
    ] = useReducer(checkedReducer, checkedTicketTypes, checkedTicketTypes => {
        return { ...checkedTicketTypes };
    });

    const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(
        checkedReducer,
        checkedTrainTypes,
        checkedTrainTypes => {
            return { ...checkedTrainTypes };
        }
    );

    const [
        localCheckedDepartStations,
        localCheckedDepartStationsDispatch,
    ] = useReducer(
        checkedReducer,
        checkedDepartStations,
        checkedDepartStations => {
            return { ...checkedDepartStations };
        }
    );

    const [
        localCheckedArriveStations,
        localCheckedArriveStationsDispatch,
    ] = useReducer(
        checkedReducer,
        checkedArriveStations,
        checkedArriveStations => {
            return { ...checkedArriveStations };
        }
    );

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(() => {
        return departTimeStart;
    });

    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(() => {
        return departTimeEnd;
    });

    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(() => {
        return arriveTimeStart;
    });

    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(() => {
        return arriveTimeEnd;
    });

    const optionGroup = [
        {
            title: "坐席类型",
            options: ticketTypes,
            checkedMap: localCheckedTicketTypes,
            dispatch: localCheckedTicketTypesDispatch,
        },
        {
            title: "车次类型",
            options: trainTypes,
            checkedMap: localCheckedTrainTypes,
            dispatch: localCheckedTrainTypesDispatch,
        },
        {
            title: "出发车站",
            options: departStations,
            checkedMap: localCheckedDepartStations,
            dispatch: localCheckedDepartStationsDispatch,
        },
        {
            title: "到达车站",
            options: arriveStations,
            checkedMap: localCheckedArriveStations,
            dispatch: localCheckedArriveStationsDispatch,
        },
    ];

    //点击确认按钮的回调
    function onSure() {
        //更新store中的数据
        setCheckedTicketTypes(localCheckedTicketTypes);
        setCheckedTrainTypes(localCheckedTrainTypes);
        setCheckedDepartStations(localCheckedDepartStations);
        setCheckedArriveStations(localCheckedArriveStations);

        setDepartTimeStart(localDepartTimeStart);
        setDepartTimeEnd(localDepartTimeEnd);
        setArriveTimeStart(localArriveTimeStart);
        setArriveTimeEnd(localArriveTimeEnd);

        //关闭筛选浮层
        toggleIsFilterVisible();
    }

    //定义一个变量来表示不能重置的情况
    //只有所有的状态都为初始值，才不能进行重置
    const isResetDisabled = useMemo(() => {
        return (
            Object.keys(localCheckedTicketTypes).length === 0 &&
            Object.keys(localCheckedTrainTypes).length === 0 &&
            Object.keys(localCheckedDepartStations).length === 0 &&
            Object.keys(localCheckedArriveStations).length === 0 &&
            localDepartTimeStart === 0 &&
            localDepartTimeEnd === 24 &&
            localArriveTimeStart === 0 &&
            localArriveTimeEnd === 24
        );
    }, [
        localCheckedTicketTypes,
        localCheckedTrainTypes,
        localCheckedDepartStations,
        localCheckedArriveStations,
        localDepartTimeStart,
        localDepartTimeEnd,
        localArriveTimeStart,
        localArriveTimeEnd,
    ]);

    //点击reset按钮的回调
    function onReset() {
        //判断按钮是否可点
        if (isResetDisabled) return;
        //更新store中的数据
        localCheckedTicketTypesDispatch({ type: "reset" });
        localCheckedTrainTypesDispatch({ type: "reset" });
        localCheckedDepartStationsDispatch({ type: "reset" });
        localCheckedArriveStationsDispatch({ type: "reset" });

        setLocalDepartTimeStart(0);
        setLocalDepartTimeEnd(24);
        setLocalArriveTimeStart(0);
        setLocalArriveTimeEnd(24);
    }

    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span
                            className={`reset ${
                                isResetDisabled ? "disabled" : ""
                            }`}
                            onClick={onReset}
                        >
                            重置
                        </span>
                        <span className="ok" onClick={onSure}>
                            确定
                        </span>
                    </div>

                    <div className="options">
                        {optionGroup.map(group => {
                            return <Option {...group} key={group.title} />;
                        })}
                        <Slider
                            title="出发时间"
                            currentStartHours={localDepartTimeStart}
                            currentEndHours={localDepartTimeEnd}
                            onStartChanged={setLocalDepartTimeStart}
                            onEndChanged={setLocalDepartTimeEnd}
                        />
                        <Slider
                            title="到达时间"
                            currentStartHours={localArriveTimeStart}
                            currentEndHours={localArriveTimeEnd}
                            onStartChanged={setLocalArriveTimeStart}
                            onEndChanged={setLocalArriveTimeEnd}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

BottomModal.propTypes = {
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,

    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
    toggleIsFilterVisible: PropTypes.func.isRequired,
};

export default function BottomNav(props) {
    const {
        highSpeed,
        orderType,
        onlyTickets,
        isFilterVisible,
        toggleHighSpeed,
        toggleOrderType,
        toggleOnlyTickets,
        toggleIsFilterVisible,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,

        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
    } = props;

    //判断筛选框中是否选中了内容
    const noChecked = useMemo(() => {
        return (
            Object.keys(checkedTicketTypes).length === 0 &&
            Object.keys(checkedTrainTypes).length === 0 &&
            Object.keys(checkedDepartStations).length === 0 &&
            Object.keys(checkedArriveStations).length === 0 &&
            departTimeStart === 0 &&
            departTimeEnd === 24 &&
            arriveTimeStart === 0 &&
            arriveTimeEnd === 24
        );
    }, [
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    ]);

    return (
        <div className="Bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART ? "出发 早→晚" : "耗时 短→长"}
                </span>

                <span
                    className={`item ${highSpeed ? "item-on" : ""}`}
                    onClick={toggleHighSpeed}
                >
                    <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
                    只看高铁动车
                </span>

                <span
                    className={`item ${onlyTickets ? "item-on" : ""}`}
                    onClick={toggleOnlyTickets}
                >
                    <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
                    只看有票
                </span>

                <span
                    className={`item ${
                        isFilterVisible || !noChecked ? "item-on" : ""
                    }`}
                    onClick={toggleIsFilterVisible}
                >
                    <i className="icon">{noChecked ? "\uf0f7" : "\uf446"}</i>
                    综合筛选
                </span>
            </div>
            {isFilterVisible && (
                <BottomModal
                    ticketTypes={ticketTypes}
                    trainTypes={trainTypes}
                    departStations={departStations}
                    arriveStations={arriveStations}
                    checkedTicketTypes={checkedTicketTypes}
                    checkedTrainTypes={checkedTrainTypes}
                    checkedDepartStations={checkedDepartStations}
                    checkedArriveStations={checkedArriveStations}
                    departTimeStart={departTimeStart}
                    departTimeEnd={departTimeEnd}
                    arriveTimeStart={arriveTimeStart}
                    arriveTimeEnd={arriveTimeEnd}
                    setCheckedTicketTypes={setCheckedTicketTypes}
                    setCheckedTrainTypes={setCheckedTrainTypes}
                    setCheckedDepartStations={setCheckedDepartStations}
                    setCheckedArriveStations={setCheckedArriveStations}
                    setDepartTimeStart={setDepartTimeStart}
                    setDepartTimeEnd={setDepartTimeEnd}
                    setArriveTimeStart={setArriveTimeStart}
                    setArriveTimeEnd={setArriveTimeEnd}
                    toggleIsFilterVisible={toggleIsFilterVisible}
                />
            )}
        </div>
    );
}

BottomNav.propTypes = {
    highSpeed: PropTypes.bool.isRequired,
    orderType: PropTypes.number.isRequired,
    onlyTickets: PropTypes.bool.isRequired,
    isFilterVisible: PropTypes.bool.isRequired,
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleOrderType: PropTypes.func.isRequired,
    toggleOnlyTickets: PropTypes.func.isRequired,
    toggleIsFilterVisible: PropTypes.func.isRequired,

    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,

    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
};
