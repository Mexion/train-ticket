import React, { Fragment, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../common/header';
import Journey from './components/journey';
import DepartDate from './components/departDate';
import HighSpeed from './components/highSpeed';
import Submit from './components/submit';
import CitySelector from '../common/citySelector';

import './App.css';

import {
        exchangeFromToAction,
        showCitySelectorAction,
        hideCitySelectorAction,
        fetchCityDataAction,
        setSelectedCityAction
        } from './store/actionsCreator'; 

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch
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

    return (
        <Fragment>
            <div className="header-wrapper">
                <Header onBack={ onBack } title="火车票"/>
            </div>
            <form className="form">
                <Journey from={ from } to={ to } { ...journeyCbs }/>
                <DepartDate/>
                <HighSpeed/>
                <Submit/>
            </form>
            <CitySelector
                isCitySelectorVisible={ isCitySelectorVisible }
                cityData={ cityData } 
                isLoadingCityData = { isLoadingCityData }
                { ...citySelectorCbs }/>
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