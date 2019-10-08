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
        SET_SEARCH_PARSED
} from './actionTypes';


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
                    price
                 } = data;
                 //将数据保存到store中
                 dispatch(setDepartTimeStrAction(departTimeStr));
                 dispatch(setArriveTimeStrAction(arriveTimeStr));
                 dispatch(setArriveDateAction(arriveDate));
                 dispatch(setDurationStrAction(durationStr));
                 dispatch(setPriceAction(price));
            })
    }
}
