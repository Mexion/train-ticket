import {
    SET_FROM,
    SET_TO,
    SET_DEPART_DATE,
    SET_HIGH_SPEED,
    SET_TRAIN_LIST,
    SET_SEARCH_PARSED,
    SET_ORDER_TYPE,
    SET_IS_FILTER_VISIBLE,
    SET_ONLY_TICKETS,
    SET_TICKET_TYPES,
    SET_CHECKED_TICKET_TYPES,
    SET_TRAIN_TYPES,
    SET_CHECKED_TRAIN_TYPES,
    SET_DEPART_STATIONS,
    SET_CHECKED_DEPART_STATIONS,
    SET_ARRIVE_STATIONS,
    SET_CHECKED_ARRIVE_STATIONS,
    SET_DEPART_TIME_START,
    SET_DEPART_TIME_END,
    SET_ARRIVE_TIME_START,
    SET_ARRIVE_TIME_END
} from './actionTypes';

import { ORDER_DEPART, ORDER_DURATION } from '../constant';
import cutTime from '../../utility/cutTime';


export function setFromAction(from) {
    return {
        type: SET_FROM,
        payload: from
    };
}
export function setToAction(to) {
    return {
        type: SET_TO,
        payload: to
    };
}
export function setDepartDateAction(departDate) {
    return {
        type: SET_DEPART_DATE,
        payload: departDate
    };
}

export function setHighSpeedAction(highSpeed) {
    return {
        type: SET_HIGH_SPEED,
        payload: highSpeed
    };
}

export function toggleHighSpeedAction() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: SET_HIGH_SPEED,
            payload: !highSpeed
        })
    };
}
export function setTrainListAction(trainList) {
    return {
        type: SET_TRAIN_LIST,
        payload: trainList
    };
}
export function setSearchParsedAction(searchParse) {
    return {
        type: SET_SEARCH_PARSED,
        payload: searchParse
    };
}
export function toggleOrderTypeAction() {
    return (dispatch, getState) => {
        const { orderType } = getState();
        if(orderType === ORDER_DEPART) {
            dispatch({
                type: SET_ORDER_TYPE,
                payload: ORDER_DURATION
            });
        } else{
            dispatch({
                type: SET_ORDER_TYPE,
                payload: ORDER_DEPART
            });
        }
        
    };
}
export function toggleIsFilterVisibleAction() {
    return (dispatch, getState) => {
    const { isFilterVisible } = getState();
        dispatch({
            type: SET_IS_FILTER_VISIBLE,
            payload: !isFilterVisible
        });
    };
}
export function toggleOnlyTicketsAction() {
    return (dispatch, getState) => {
        const { onlyTickets } = getState();
        console.log(onlyTickets)
        dispatch({
            type: SET_ONLY_TICKETS,
            payload: !onlyTickets
        });
    };
}
export function setTicketTypesAction(ticketTypes) {
    return {
        type: SET_TICKET_TYPES,
        payload: ticketTypes
    };
}
export function setCheckedTicketTypesAction(checkedTicketTypes) {
    return {
        type: SET_CHECKED_TICKET_TYPES,
        payload: checkedTicketTypes
    };
}
export function setTrainTypesAction(trainTypes) {
    return {
        type: SET_TRAIN_TYPES,
        payload: trainTypes
    };
}
export function setCheckedTrainTypesAction(checkedTrainTypes) {
    return {
        type: SET_CHECKED_TRAIN_TYPES,
        payload: checkedTrainTypes
    };
}
export function setDepartStationsAction(departStations) {
    return {
        type: SET_DEPART_STATIONS,
        payload: departStations
    };
}
export function setCheckedDepartStationsAction(checkedDepartStations) {
    return {
        type: SET_CHECKED_DEPART_STATIONS,
        payload: checkedDepartStations
    };
}
export function setArriveStationsAction(arriveStations) {
    return {
        type: SET_ARRIVE_STATIONS,
        payload: arriveStations
    };
}
export function setCheckedArriveStationsAction(checkedArriveStations) {
    return {
        type: SET_CHECKED_ARRIVE_STATIONS,
        payload: checkedArriveStations
    };
}
export function setDepartTimeStartAction(departTimeStart) {
    return {
        type: SET_DEPART_TIME_START,
        payload: departTimeStart
    };
}
export function setDepartTimeEndAction(departTimeEnd) {
    return {
        type: SET_DEPART_TIME_END,
        payload: departTimeEnd
    };
}
export function setArriveTimeStartAction(arriveTimeStart) {
    return {
        type: SET_ARRIVE_TIME_START,
        payload: arriveTimeStart
    };
}
export function setArriveTimeEndAction(arriveTimeEnd) {
    return {
        type: SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd
    };
}

export function setPrevDateAction() {
   return (dispatch, getState) => {
       const { departDate } = getState();
       dispatch({
           type: SET_DEPART_DATE,
           payload: cutTime(departDate) - 86400 * 1000
       });
   };
}

export function setNextDateAction() {
    return (dispatch, getState) => {
       const { departDate } = getState();
       dispatch({
           type: SET_DEPART_DATE,
           payload: cutTime(departDate) + 86400 * 1000
       });
   };
}