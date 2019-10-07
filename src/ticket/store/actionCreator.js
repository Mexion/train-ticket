import {
    SET_DEPART_DATE,
    SET_ARRIVE_DATE,
    SET_DEPART_TIME_STR,
    SET_ARRIVE_TIME_STR,
    SET_DEPART_STATION,
    SET_ARRIVE_STATION,
    SET_TRAIN_NUMBER,
    SET_DURATION_STR,
    SET_TICKETS,
    SET_IS_SCHEDULE_VISIBLE,
    SET_SEARCH_PARSED
} from './actionTypes';

import cutTime from '../../utility/cutTime';


export function setDepartDateAction(departDate) {
    return {
        type: SET_DEPART_DATE,
        payload: departDate
    };

}
export function setArriveDateAction(arriveDate) {
    return {
        type: SET_ARRIVE_DATE,
        payload: arriveDate
    };

}
export function setDepartTimeStrAction(departTime) {
    return {
        type: SET_DEPART_TIME_STR,
        payload: departTime
    };

}
export function setArriveTimeStrAction(arriveTime) {
    return {
        type: SET_ARRIVE_TIME_STR,
        payload: arriveTime
    };

}
export function setDepartStationAction(departStation) {
    return {
        type: SET_DEPART_STATION,
        payload: departStation
    };

}
export function setArriveStationAction(arriveStation) {
    return {
        type: SET_ARRIVE_STATION,
        payload: arriveStation
    };

}
export function setTrainNumberAction(trainNumber) {
    return {
        type: SET_TRAIN_NUMBER,
        payload: trainNumber
    };

}
export function setDurationStrAction(durationStr) {
    return {
        type: SET_DURATION_STR,
        payload: durationStr
    };

}
export function setTicketsAction(tickets) {
    return {
        type: SET_TICKETS,
        payload: tickets
    };

}
export function setIsScheduleVisibleAction(isScheduleVisible) {
    return {
        type: SET_IS_SCHEDULE_VISIBLE,
        payload: isScheduleVisible
    };

}

export function toggleIsScheduleVisibleAction() {
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState();
        dispatch(setIsScheduleVisibleAction(!isScheduleVisible));
    }
}

export function setSearchParsedAction(searchParsed) {
    return {
        type: SET_SEARCH_PARSED,
        payload: searchParsed
    };

}

export function setPrevDateAction() {
    return (dispatch, getState) => {
        const {
            departDate
        } = getState();
        dispatch({
            type: SET_DEPART_DATE,
            payload: cutTime(departDate) - 86400 * 1000
        });
    };
}

export function setNextDateAction() {
    return (dispatch, getState) => {
        const {
            departDate
        } = getState();
        dispatch({
            type: SET_DEPART_DATE,
            payload: cutTime(departDate) + 86400 * 1000
        });
    };
}