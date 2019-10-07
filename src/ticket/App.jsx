import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import cutTime from '../utility/cutTime';

import Header from '../common/Header';
import DateNav from '../common/DateNav';
import Detail from '../common/Detail';
import Candidate from './components/Candidate';

import {
    setDepartStationAction,
    setArriveStationAction,
    setTrainNumberAction,
    setDepartDateAction,
    setSearchParsedAction,
    setPrevDateAction,
    setNextDateAction,

    setDepartTimeStrAction,
    setArriveTimeStrAction,
    setArriveDateAction,
    setDurationStrAction,
    setTicketsAction,

    toggleIsScheduleVisibleAction
} from './store/actionCreator';

//引入自定义hooks以复用逻辑
import useDateNav from '../common/hooks/useDateNav';

import './App.css';

//通过lazy异步加载Schedule组件
const Schedule = lazy(() => import('./components/Schedule'));

function App(props) {
   const {
       departDate,
       arriveDate,
       departTimeStr,
       arriveTimeStr,
       departStation,
       arriveStation,
       trainNumber,
       durationStr,
       tickets,
       isScheduleVisible,
       searchParsed,
       dispatch
   } = props;

   const onBack = useCallback(() => {
       window.history.back();
    },[])

   useEffect(() => {
       //解析URL
      const queries = URI.parseQuery(window.location.search);
      const {
          aStation,
          dStation,
          date,
          trainNumber
      } = queries;

      //将数据传入到store中
      dispatch(setDepartStationAction(dStation));
      dispatch(setArriveStationAction(aStation));
      dispatch(setDepartDateAction(cutTime(dayjs(date).valueOf())));
      dispatch(setTrainNumberAction(trainNumber));
      //解析完成
      dispatch(setSearchParsedAction(true));
   }, [dispatch]);

   //将文档标题改为车次
   useEffect(() => {
       document.title = trainNumber;
   }, [trainNumber]);

   //解析url参数并抓取数据
   useEffect(() => {
    if(!searchParsed) return;

    const url = new URI('/rest/ticket')
        .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
        .setSearch('trainNumber', trainNumber)
        .toString();

        //抓取服务端数据
        fetch(url).then(res => res.json()).then(data => {
            const{
                detail,
                candidates
            } = data;

            const {
                departTimeStr,
                arriveTimeStr,
                arriveDate,
                durationStr
            } = detail;

            //修改store中的数据
            dispatch(setDepartTimeStrAction(departTimeStr));
            dispatch(setArriveTimeStrAction(arriveTimeStr));
            dispatch(setArriveDateAction(arriveDate));
            dispatch(setDurationStrAction(durationStr));
            dispatch(setTicketsAction(candidates));
        });
   },[searchParsed, trainNumber, departDate, dispatch]);

   //调用自定义hooks
   const { 
       isPrevDisabled,
       isNextDisabled,
       prevClick,
       nextClick
 } = useDateNav(departDate, dispatch, setPrevDateAction, setNextDateAction);

 const detailCbs = useMemo(() => {
     return bindActionCreators({
        toggleIsScheduleVisible: toggleIsScheduleVisibleAction
     }, dispatch);
 }, [dispatch])

   //如果没解析完成，则不渲染任何内容
   if(!searchParsed) {
       return null;
   }

   return (
       <div className="app">
            <div className="header-wrapper">
                <Header  title={ trainNumber } onBack={ onBack }/>
            </div>
            <div className="nav-wrapper">
                <DateNav
                    date={ departDate }
                    isPrevDisabled={ isPrevDisabled }
                    isNextDisabled={ isNextDisabled }
                    prevClick={ prevClick }
                    nextClick={ nextClick }/>
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
                    { ...detailCbs }/>
            </div>
            { isScheduleVisible &&
                <div 
                    className="mask" 
                    onClick={ () => dispatch(toggleIsScheduleVisibleAction()) }>
                    <Suspense fallback={ <div>loading</div> }>
                        <Schedule
                            date={ departDate }
                            trainNumber={ trainNumber }
                            departStation={ departStation }
                            arriveStation={ arriveStation }
                        />
                    </Suspense>
                </div>
            }
       </div>);
}

export default connect(
    function mapStateToProps(state) {
        return state;

    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };

    }
)(App);