import {
    SET_TRAIN_NUMBER,
    SET_DEPART_STATION,
    SET_ARRIVE_STATION,
    SET_SEAT_TYPE,
    SET_DEPART_DATE,
    SET_ARRIVE_DATE,
    SET_DEPART_TIME_STR,
    SET_ARRIVE_TIME_STR,
    SET_DURATION_STR,
    SET_PRICE,
    SET_PASSENGERS,
    SET_MENU,
    SET_IS_MENU_VISIBLE,
    SET_SEARCH_PARSED,
} from "./actionTypes";

export function setTrainNumberAction(trainNumber) {
    return {
        type: SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}
export function setDepartStationAction(departStation) {
    return {
        type: SET_DEPART_STATION,
        payload: departStation,
    };
}
export function setArriveStationAction(arriveStation) {
    return {
        type: SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}
export function setSeatTypeAction(seatType) {
    return {
        type: SET_SEAT_TYPE,
        payload: seatType,
    };
}
export function setDepartDateAction(departDate) {
    return {
        type: SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setArriveDateAction(arriveDate) {
    return {
        type: SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}
export function setDepartTimeStrAction(departTimeStr) {
    return {
        type: SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}
export function setArriveTimeStrAction(arriveTimeStr) {
    return {
        type: SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}
export function setDurationStrAction(durationStr) {
    return {
        type: SET_DURATION_STR,
        payload: durationStr,
    };
}
export function setPriceAction(price) {
    return {
        type: SET_PRICE,
        payload: price,
    };
}
export function setPassengersAction(passengers) {
    return {
        type: SET_PASSENGERS,
        payload: passengers,
    };
}
export function setMenuAction(menu) {
    return {
        type: SET_MENU,
        payload: menu,
    };
}
export function setIsMenuVisibleAction(isMenuVisible) {
    return {
        type: SET_IS_MENU_VISIBLE,
        payload: isMenuVisible,
    };
}
export function setSearchParsedAction(searchParsed) {
    return {
        type: SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

//拉取数据的异步action
export function fetchInitialAction(url) {
    return (dispatch, getState) => {
        //拉取数据
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                    price,
                } = data;
                //将数据保存到store中
                dispatch(setDepartTimeStrAction(departTimeStr));
                dispatch(setArriveTimeStrAction(arriveTimeStr));
                dispatch(setArriveDateAction(arriveDate));
                dispatch(setDurationStrAction(durationStr));
                dispatch(setPriceAction(price));
            });
    };
}

//先生成一个变量以确保每个乘客都有不同的id
let passengerId = 0;

//生成成人对象的action
export function createAdultAction() {
    return (dispatch, getState) => {
        const { passengers } = getState();

        //遍历判断上一个乘客的信息是否填写完毕
        for (let passenger of passengers) {
            const keys = Object.keys(passenger);
            for (let key of keys) {
                //如果有一个字段为空则表示未填写完毕，直接返回不允许创建新的乘客
                if (!passenger[key]) {
                    return;
                }
            }
        }

        //为乘客列表增加一个成人
        dispatch(
            setPassengersAction([
                ...passengers,
                {
                    //id自增
                    id: ++passengerId,
                    name: "",
                    ticketType: "adult",
                    identityCard: "",
                    seat: "Z",
                },
            ])
        );
    };
}

//生成儿童对象的action
export function createChildAction() {
    return (dispatch, getState) => {
        const { passengers } = getState();

        //设置一个变量保存成人是否存在
        let adultFound = null;

        //遍历判断上一个乘客的信息是否填写完毕
        for (let passenger of passengers) {
            const keys = Object.keys(passenger);
            for (let key of keys) {
                //如果有一个字段为空则表示未填写完毕，直接返回不允许创建新的乘客
                if (!passenger[key]) {
                    return;
                }
            }

            //如果找到了成人，保存变量
            if (passenger.ticketType === "adult") {
                adultFound = passenger.id;
            }
        }

        if (!adultFound) {
            alert("请至少正确添加一个同行成人！");
            return;
        }

        //为乘客列表增加一个儿童
        dispatch(
            setPassengersAction([
                ...passengers,
                {
                    //id自增
                    id: ++passengerId,
                    name: "",
                    gender: "none",
                    birthday: "",
                    followAdult: adultFound,
                    ticketType: "child",
                    seat: "Z",
                },
            ])
        );
    };
}

//删除乘客的异步action
export function removePassengerAction(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();
        //使用数组的filter方法过滤掉这个id的乘客
        const newPassengers = passengers.filter(passenger => {
            //删除id为这个id的乘客，同时与之同行的儿童
            return passenger.id !== id && passenger.followAdult !== id;
        });
        dispatch(setPassengersAction(newPassengers));
    };
}

//更新乘客信息的异步action
export function updatePassengerAction(id, updateData, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const { passengers } = getState();
        for (let i = 0; i < passengers.length; ++i) {
            if (passengers[i].id === id) {
                const newPassengers = [...passengers];
                newPassengers[i] = Object.assign(newPassengers[i], updateData);

                //删除指定key的字段
                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key];
                }

                dispatch(setPassengersAction(newPassengers));
                break;
            }
        }
    };
}

//显示选择菜单的action
export function showMenuAction(menu) {
    return dispatch => {
        dispatch(setMenuAction(menu));
        dispatch(setIsMenuVisibleAction(true));
    };
}

export function showGenderMenuAction(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();
        //校验id是否存在
        const passenger = passengers.find(passenger => passenger.id === id);
        if (!passenger) {
            return;
        }

        dispatch(
            showMenuAction({
                options: [
                    {
                        title: "男",
                        value: "male",
                        active: "male" === passenger.gender,
                    },
                    {
                        title: "女",
                        value: "female",
                        active: "female" === passenger.gender,
                    },
                ],
                onPress(gender) {
                    dispatch(updatePassengerAction(id, { gender }));
                    dispatch(hideMenuAction());
                },
            })
        );
    };
}

//显示同行成人菜单的action
export function showFollowAdultMenuAction(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        //校验id是否存在
        const passenger = passengers.find(passenger => passenger.id === id);
        if (!passenger) {
            return;
        }

        dispatch(
            showMenuAction({
                onPress(followAdult) {
                    dispatch(updatePassengerAction(id, { followAdult }));
                    dispatch(hideMenuAction());
                },
                options: passengers
                    .filter(passenger => passenger.ticketType === "adult")
                    .map(adult => {
                        return {
                            title: adult.name,
                            value: adult.id,
                            active: adult.id === passenger.followAdult,
                        };
                    }),
            })
        );
    };
}

//显示选择成人或儿童票菜单的action
export function showTicketTypeMenuAction(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        //校验id是否存在
        const passenger = passengers.find(passenger => passenger.id === id);
        if (!passenger) {
            return;
        }

        dispatch(
            showMenuAction({
                onPress(ticketType) {
                    if ("adult" === ticketType) {
                        dispatch(
                            updatePassengerAction(
                                id,
                                {
                                    ticketType,
                                    identityCard: "",
                                },
                                ["gender", "followAdult", "birthday"]
                            )
                        );
                    } else {
                        const adult = passengers.find(
                            passenger =>
                                passenger.id !== id &&
                                passenger.ticketType === "adult"
                        );
                        if (!adult) {
                            alert("没有其他成人乘客");
                        } else {
                            dispatch(
                                updatePassengerAction(
                                    id,
                                    {
                                        ticketType,
                                        gender: "",
                                        followAdult: adult.id,
                                        birthday: "",
                                    },
                                    ["identityCard"]
                                )
                            );
                        }
                    }
                    dispatch(hideMenuAction());
                },
                options: [
                    {
                        title: "成人票",
                        value: "adult",
                        active: "adult" === passenger.ticketType,
                    },
                    {
                        title: "儿童票",
                        value: "child",
                        active: "child" === passenger.ticketType,
                    },
                ],
            })
        );
    };
}

//隐藏选择菜单的action
export function hideMenuAction() {
    return setIsMenuVisibleAction(false);
}
