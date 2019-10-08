import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import "./index.css";

const Passenger = memo(function Passenger(props) {
    const {
        id,
        name,
        followAdultName,
        ticketType,
        identityCard,
        gender,
        birthday,
        onRemove,
        onUpdate,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu,
    } = props;

    const isAdult = ticketType === "adult";

    return (
        <li className="passenger">
            <i className="delete" onClick={() => onRemove(id)}>
                -
            </i>
            <ol className="items">
                <li className="item">
                    <label className="label name">姓名</label>
                    <input
                        type="text"
                        className="input name"
                        placeholder="乘客姓名"
                        value={name}
                        onChange={e => onUpdate(id, { name: e.target.value })}
                    />
                    <label
                        className="ticket-type"
                        onClick={() => showTicketTypeMenu(id)}
                    >
                        {isAdult ? "成人票" : "儿童票"}
                    </label>
                </li>
                {isAdult && (
                    <li className="item">
                        <label className="label identity-card">身份证</label>
                        <input
                            type="text"
                            className="input identity-card"
                            placeholder="证件号码"
                            value={identityCard}
                            onChange={e =>
                                onUpdate(id, { identityCard: e.target.value })
                            }
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item arrow">
                        <label className="label gender">性别</label>
                        <input
                            type="text"
                            className="input gender"
                            placeholder="请选择"
                            onClick={() => showGenderMenu(id)}
                            value={
                                gender === "male"
                                    ? "男"
                                    : gender === "female"
                                    ? "女"
                                    : ""
                            }
                            readOnly
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item">
                        <label className="label birthday">出生日期</label>
                        <input
                            type="text"
                            className="input birthday"
                            placeholder="如 20151015"
                            value={birthday}
                            onChange={e =>
                                onUpdate(id, { birthday: e.target.value })
                            }
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item arrow">
                        <label className="label follow-adult">同行成人</label>
                        <input
                            type="text"
                            className="input follow-adult"
                            placeholder="请选择"
                            onClick={() => showFollowAdultMenu(id)}
                            value={followAdultName}
                            readOnly
                        />
                    </li>
                )}
            </ol>
        </li>
    );
});

Passenger.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticketType: PropTypes.string.isRequired,
    identityCard: PropTypes.string,
    gender: PropTypes.string,
    birthday: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showGenderMenu: PropTypes.func.isRequired,
    showFollowAdultMenu: PropTypes.func.isRequired,
    showTicketTypeMenu: PropTypes.func.isRequired,
    followAdultName: PropTypes.string,
};

const Passengers = memo(function Passengers(props) {
    const {
        passengers,
        createAdult,
        createChild,
        removePassenger,
        updatePassenger,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu,
    } = props;

    //以键值对的形式处理乘客id和姓名
    const nameMap = useMemo(() => {
        const nameMap = {};

        for (const passenger of passengers) {
            nameMap[passenger.id] = passenger.name;
        }
        return nameMap;
    }, [passengers]);

    return (
        <div className="passengers">
            <ul>
                {passengers.map(passenger => {
                    return (
                        <Passenger
                            key={passenger.id}
                            followAdultName={nameMap[passenger.followAdult]}
                            onRemove={removePassenger}
                            onUpdate={updatePassenger}
                            showGenderMenu={showGenderMenu}
                            showFollowAdultMenu={showFollowAdultMenu}
                            showTicketTypeMenu={showTicketTypeMenu}
                            {...passenger}
                        />
                    );
                })}
            </ul>
            <section className="add">
                <div className="adult" onClick={() => createAdult()}>
                    添加成人
                </div>
                <div className="child" onClick={() => createChild()}>
                    添加儿童
                </div>
            </section>
        </div>
    );
});

Passengers.propTypes = {
    passengers: PropTypes.array.isRequired,
    createAdult: PropTypes.func.isRequired,
    createChild: PropTypes.func.isRequired,
    removePassenger: PropTypes.func.isRequired,
    updatePassenger: PropTypes.func.isRequired,
    showGenderMenu: PropTypes.func.isRequired,
    showFollowAdultMenu: PropTypes.func.isRequired,
    showTicketTypeMenu: PropTypes.func.isRequired,
};

export default Passengers;
