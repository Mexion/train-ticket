import reducers from './reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import cutTime from '../../utility/cutTime';
import { ORDER_DEPART } from '../constant';

export default createStore(
    combineReducers(reducers),
    {
        from: null,
        to: null,
        departDate: cutTime(Date.now()),
        highSpeed: false,
        trainList: [],
        searchParsed:false,
        orderType: ORDER_DEPART,
        isFilterVisible: false,
        onlyTickets: false,
        ticketTypes: [],
        checkedTicketTypes: {},
        trainTypes: [],
        checkedTrainTypes: {},
        departStations: [],
        checkedDepartStations: {},
        arriveStations: [],
        checkedArriveStations: {},
        departTimeStart: 0,
        departTimeEnd: 24,
        arriveTimeStart: 0,
        arriveTimeEnd: 24
    },
    applyMiddleware(thunk)
);