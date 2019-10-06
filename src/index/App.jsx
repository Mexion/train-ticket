import React, { Fragment, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../common/Header';
import Journey from './components/Journey';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import Submit from './components/Submit';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';

import cutTime from '../utility/cutTime';

import './App.css';

import {
        exchangeFromToAction,
        showCitySelectorAction,
        hideCitySelectorAction,
        fetchCityDataAction,
        setSelectedCityAction,
        showDateSelectorAction,
        hideDateSelectorAction,
        setDepartDateAction,
        setHighSpeedAction
        } from './store/actionCreator'; 

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
        isDateSelectorVisible,
        highSpeed
    } = props;


    //返回按钮方法
    const onBack = useCallback(() => {
        window.history.back();
    }, [])

    //传入journey的回调函数
    const journeyCbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo: exchangeFromToAction,
            showCitySelector: showCitySelectorAction
        }, dispatch);
    }, [dispatch]);

    //传入citySelector的回调
    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelectorAction,
            fetchCityData: fetchCityDataAction,
            onSelect: setSelectedCityAction
        }, dispatch)
    }, [dispatch])

    //传入departDate组件的回调
    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelectorAction
        }, dispatch);
    }, [dispatch]);

    //传入DateSelector组件的回调
    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelectorAction
        }, dispatch);
    }, [dispatch]);

    //传入highSpeed组件的回调
    const highSpeedCbs = useMemo(() => {
        return bindActionCreators({
            toggle: setHighSpeedAction
        }, dispatch);
    }, [dispatch]);

    //选择日期的回调函数
    const onSelectDate = useCallback(day => {
        if(!day) return;
        if(day < cutTime()) return;

        dispatch(setDepartDateAction(day));
        dispatch(hideDateSelectorAction());
    }, [dispatch])

    return (
        <Fragment>
            <div className="header-wrapper">
                <Header onBack={ onBack } title="火车票"/>
            </div>
            <form action="./query.html" className="form">
                <Journey from={ from } to={ to } { ...journeyCbs }/>
                <DepartDate time={ departDate } { ...departDateCbs }/>
                <HighSpeed highSpeed={ highSpeed } { ...highSpeedCbs }/>
                <Submit/>
            </form>
            <CitySelector
                isCitySelectorVisible={ isCitySelectorVisible }
                cityData={ cityData } 
                isLoadingCityData = { isLoadingCityData }
                { ...citySelectorCbs }/>
            <DateSelector
                isDateSelectorVisible={ isDateSelectorVisible }
                {  ...dateSelectorCbs }
                onSelect={ onSelectDate }/>
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