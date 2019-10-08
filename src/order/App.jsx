import React, { useCallback, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import {
    setTrainNumberAction,
    setArriveStationAction,
    setDepartStationAction,
    setDepartDateAction,
    setSeatTypeAction,
     setSearchParsedAction,

     fetchInitialAction,

     createAdultAction,
     createChildAction,
     removePassengerAction,
     updatePassengerAction,
     hideMenuAction,
     showGenderMenuAction,
     showFollowAdultMenuAction,
     showTicketTypeMenuAction
} from './store/actionCreator';

import Header from '../common/Header';
import Detail from '../common/Detail';
import Seat from './components/Seat';
import Account from './components/Account';
import Choose from './components/Choose';
import Passengers from './components/Passengers';
import Menu from './components/Menu';

import './App.css';

function App(props) {
    const {
        trainNumber,
        departStation,
        arriveStation,
        seatType,
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        durationStr,
        price,
        passengers,
        menu,
        isMenuVisible,
        searchParsed,
        dispatch
    } = props;

    const onBack = useCallback(() => {
        window.history.back();
    },[]);

    useEffect(() => {
        //解析url
        const queries = URI.parseQuery(window.location.search);
        const { trainNumber, aStation, dStation, date, type } = queries;

        dispatch(setTrainNumberAction(trainNumber));
        dispatch(setArriveStationAction(aStation));
        dispatch(setDepartStationAction(dStation));
        dispatch(setDepartDateAction(dayjs(date).valueOf()));
        dispatch(setSeatTypeAction(type));

        dispatch(setSearchParsedAction(true));

    }, [dispatch]);

    useEffect(() => {
        if(!searchParsed) return;
        //发起异步请求抓取数据
        const url = new URI('/rest/order')
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('type', seatType)
            .toString();
        //dispatch异步action抓取数据并将数据保存到store中
        dispatch(fetchInitialAction(url));
    }, [searchParsed, departStation, arriveStation, departDate, seatType, dispatch]);

    //绑定传入passengers组件的回调
    const passengersCbs = useMemo(() => {
        return bindActionCreators({
            createAdult: createAdultAction,
            createChild: createChildAction,
            removePassenger: removePassengerAction,
            updatePassenger: updatePassengerAction,
            showGenderMenu: showGenderMenuAction,
            showFollowAdultMenu: showFollowAdultMenuAction,
            showTicketTypeMenu: showTicketTypeMenuAction
        }, dispatch);
    }, [dispatch]);

    //绑定传入Menu组件的回调
    const menuCbs = useMemo(() => {
        return bindActionCreators({
            hideMenu: hideMenuAction
        }, dispatch);
    }, [dispatch]);

    //绑定传入Choose组件的回调
    const chooseCbs = useMemo(() => {
        return bindActionCreators({
            updatePassenger: updatePassengerAction
        }, dispatch)
    }, [dispatch])

    //如果解析未成功，什么都不渲染
    if(!searchParsed) {
        return null;
    }

    return (
        <div className="app">
            <div className="header-wrapper">
                <Header
                    title='订单填写'
                    onBack={ onBack }/>
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={ departDate }
                    arriveDate={ arriveDate }
                    departTimeStr={ departTimeStr }
                    arriveTimeStr={ arriveTimeStr }
                    trainNumber={ trainNumber }
                    departStation={ departStation }
                    arriveStation={ arriveStation }
                    durationStr={ durationStr }
                >
                    <span
                        style={ { display: 'block' } }
                        className="train-icon"
                    ></span>
                </Detail>
            </div>
            <Seat price={ price } type={ seatType }/>
            <Passengers 
                passengers={ passengers }
                { ...passengersCbs }/>
            {
                passengers.length > 0 && (
                    <Choose
                        passengers={ passengers }
                        { ...chooseCbs }/>
                )
            }
            <Account
                length={ passengers.length }
                price={ price }/>
            <Menu
                show={ isMenuVisible }
                { ...menu }
                { ...menuCbs }
                />
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);