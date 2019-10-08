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
} from '../actionTypes';

export default {
     trainNumber(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_TRAIN_NUMBER:
                return payload;
            default:
        }

        return state;
    },
    departStation(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_DEPART_STATION:
                return payload;
            default:
        }

        return state;
    },
    arriveStation(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_ARRIVE_STATION:
                return payload;
            default:
        }

        return state;
    },
    seatType(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_SEAT_TYPE:
                return payload;
            default:
        }

        return state;
    },
    departDate(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_DEPART_DATE:
                return payload;
            default:
        }

        return state;
    },
    arriveDate(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_ARRIVE_DATE:
                return payload;
            default:
        }

        return state;
    },
    departTimeStr(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_DEPART_TIME_STR:
                return payload;
            default:
        }

        return state;
    },
    arriveTimeStr(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_ARRIVE_TIME_STR:
                return payload;
            default:
        }

        return state;
    },
    durationStr(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_DURATION_STR:
                return payload;
            default:
        }

        return state;
    },
    price(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_PRICE:
                return payload;
            default:
        }

        return state;
    },
    passengers(state = [], action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_PASSENGERS:
                return payload;
            default:
        }

        return state;
    },
    menu(state = null, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_MENU:
                return payload;
            default:
        }

        return state;
    },
    isMenuVisible(state = false, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_IS_MENU_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    searchParsed(state = false, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case SET_SEARCH_PARSED:
                return payload;
            default:
        }

        return state;
    }

};