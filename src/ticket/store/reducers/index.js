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
} from '../actionTypes';

export default {
    departDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case SET_DEPART_DATE:
                return payload;
            default:
        }
        return state;
    },
    arriveDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case SET_ARRIVE_DATE:
                return payload;
            default:
        }
        return state;
    },
    departTimeStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_DEPART_TIME_STR:
                return payload;
            default:
        }
        return state;
    },
    arriveTimeStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_ARRIVE_TIME_STR:
                return payload;
            default:
        }
        return state;
    },
    departStation(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_DEPART_STATION:
                return payload;
            default:
        }
        return state;
    },
    arriveStation(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_ARRIVE_STATION:
                return payload;
            default:
        }
        return state;
    },
    trainNumber(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_TRAIN_NUMBER:
                return payload;
            default:
        }
        return state;
    },
    durationStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_DURATION_STR:
                return payload;
            default:
        }
        return state;
    },
    tickets(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case SET_TICKETS:
                return payload;
            default:
        }
        return state;
    },
    isScheduleVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_IS_SCHEDULE_VISIBLE:
                return payload;
            default:
        }
        return state;
    },
    searchParsed(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case SET_SEARCH_PARSED:
                return payload;
            default:
        }
        return state;
    }
};