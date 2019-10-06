import React from 'react';
import { connect } from 'react-redux';

import Detail from '../common/Detail';
import Candidate from './components/Candidate';
import Schedule from './components/Schedule';

import './App.css';

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

   return (<div>Ticket page</div>);
}

export default connect(
    function mapStateToProps(state) {
        return state;

    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };

    }
)(App);