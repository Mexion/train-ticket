import React, { Fragment, useCallback, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import Header from '../common/Header';
import DateNav from '../common/DateNav';
import List from './components/List';
import BottomNav from './components/BottomNav';
import cutTime from '../utility/cutTime';
import useDateNav from '../common/hooks/useDateNav';
import { 
        setFromAction, 
        setToAction, 
        setDepartDateAction, 
        setHighSpeedAction, 
        setSearchParsedAction,
        setTrainListAction,
        setTicketTypesAction,
        setTrainTypesAction,
        setDepartStationsAction,
        setArriveStationsAction,
        setPrevDateAction,
        setNextDateAction,
        toggleHighSpeedAction,
        toggleOrderTypeAction,
        toggleIsFilterVisibleAction,
        toggleOnlyTicketsAction,

        setCheckedTicketTypesAction,
        setCheckedTrainTypesAction,
        setCheckedDepartStationsAction,
        setCheckedArriveStationsAction,
        setDepartTimeStartAction,
        setDepartTimeEndAction,
        setArriveTimeStartAction,
        setArriveTimeEndAction
        } from './store/actionCreator.js'

import './App.css';

function App(props) {
    const {
        to,
        from,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
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
        dispatch,
        trainList,
        isFilterVisible
    } = props;

    const onBack = useCallback(() => {
        window.history.back()
    }, []);

    //这里主要是解析参数并根据参数修改store中的值
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const {
            from,
            to,
            highSpeed,
            date
        } = queries;

        if(!from || !to || !date) {
            alert('参数错误！');    
            return;
        };

        dispatch(setFromAction(from));
        dispatch(setToAction(to));
        dispatch(setDepartDateAction(cutTime(dayjs(date).valueOf())));
        //解析过后其实是一个字符串，需要转换为boolean，如果为'true'为真，否则为假
        dispatch(setHighSpeedAction(highSpeed === 'true'));
        //表明已经将所有参数解析完成
        dispatch(setSearchParsedAction(true));
    }, [dispatch]);

    useEffect(() => {
        if(!searchParsed) return;
        //生成一串search的字符串
        const url = new URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
            .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
            .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
            .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString();

        //开始请求数据
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation
                            }
                        }
                    }
                } = data;

                //获取到数据后修改store中的数据
                dispatch(setTrainListAction(trains));
                dispatch(setTicketTypesAction(ticketType));
                dispatch(setTrainTypesAction(trainType));
                dispatch(setDepartStationsAction(depStation));
                dispatch(setArriveStationsAction(arrStation));
            })
    }, [from,
        to,
        highSpeed,
        departDate,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        dispatch
    ])

    //使用自定义hooks
    const {
        isPrevDisabled,
        isNextDisabled,
        prevClick,
        nextClick
    } = useDateNav(departDate, dispatch, setPrevDateAction, setNextDateAction);


    //传入bottomNav的回调
    const bottomNavCbs = useMemo(() => {
        return bindActionCreators({
            toggleHighSpeed: toggleHighSpeedAction,
            toggleIsFilterVisible: toggleIsFilterVisibleAction,
            toggleOnlyTickets: toggleOnlyTicketsAction,
            toggleOrderType: toggleOrderTypeAction,
            setCheckedTicketTypes: setCheckedTicketTypesAction,
            setCheckedTrainTypes: setCheckedTrainTypesAction,
            setCheckedDepartStations: setCheckedDepartStationsAction,
            setCheckedArriveStations:setCheckedArriveStationsAction,
            setDepartTimeStart: setDepartTimeStartAction,
            setDepartTimeEnd: setDepartTimeEndAction,
            setArriveTimeStart: setArriveTimeStartAction,
            setArriveTimeEnd: setArriveTimeEndAction
        }, dispatch)
    }, [dispatch])

     if (!searchParsed) {
         return null;
     };

    return (
        <Fragment>
           <div className="header-wrapper">
                <Header title={ `${ from } ⇀ ${ to }` } onBack={ onBack }/>
           </div>
            <DateNav
                date={ departDate }
                isPrevDisabled={ isPrevDisabled }
                isNextDisabled={ isNextDisabled }
                prevClick={ prevClick }
                nextClick={ nextClick }
                />
            <List list={ trainList }/>
            <BottomNav
                highSpeed={ highSpeed }
                orderType={ orderType }
                onlyTickets={ onlyTickets }
                isFilterVisible={ isFilterVisible }
                ticketTypes={ ticketTypes }
                trainTypes={ trainTypes }
                departStations={ departStations }
                arriveStations={ arriveStations }
                checkedTicketTypes={ checkedTicketTypes }
                checkedTrainTypes={ checkedTrainTypes }
                checkedDepartStations={ checkedDepartStations }
                checkedArriveStations={ checkedArriveStations }
                departTimeStart={ departTimeStart }
                departTimeEnd={ departTimeEnd }
                arriveTimeStart={ arriveTimeStart }
                arriveTimeEnd={ arriveTimeEnd }
                { ...bottomNavCbs }/>
        </Fragment>
    );
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);