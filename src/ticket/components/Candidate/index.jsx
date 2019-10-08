import React, { memo, useState, useCallback, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';

import { TrainContext } from '../../context';

import './index.css';



const Channel = memo(function Channel(props) {
    const { 
        type,
        name,
        desc
     } = props;

     const { 
        trainNumber,
        departStation, 
        arriveStation, 
        departDate } =  useContext(TrainContext);

     const url = useMemo(() => {
         return new URI('./order.html')
            .setSearch('trainNumber', trainNumber)
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', type)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
     }, [trainNumber, departDate, departStation, arriveStation, type]);

    return (
        <div className="channel">
            <div className="middle">
                <div className="name">{ name }</div>
                <div className="desc">{ desc }</div>
            </div>
            <a href={ url } className="buy-wrapper">
                <div className="buy">买票</div>
            </a>
        </div>
    );
});

Channel.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
}



const Seat = memo(function Seat(props) {
    const { 
        type,
        index,
        ticketsLeft,
        priceMsg,
        channels,
        expended,
        onToggle
     } = props;

    return (
        <li>
            <div className="bar" onClick={ ()=> onToggle(index) }>
                <span className="seat">{ type }</span>
                <span className="price">
                    <i>¥</i>
                    { priceMsg }
                </span>
                <span className="btn">{ expended ? '收起' : '预定' }</span>
                <span className="num">{ ticketsLeft }</span>
            </div>
            <div 
                className="channels"
                style={ { height: expended ? channels.length * 55 + 'px' : 0 } }>
                {
                    channels.map(channel => {
                        return(
                            <Channel
                                key={ channel.name }
                                type={ type }
                                { ...channel }/>
                        )
                    })
                }
            </div>
        </li>
    );
});

Seat.propTypes = {
    type: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    ticketsLeft: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
    expended: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
}

const Candidate = memo(function Candidate(props) {
    const {
        tickets
    } = props;

    //声明一个变量来标记哪个类型的车票被展开了
    const [expendedIndex, setExpendedIndex] = useState(-1);

    //封装函数来进行判断，车票展开与否
    const toggleExpended = useCallback(index => {
        setExpendedIndex(index === expendedIndex ? -1 : index);
    }, [expendedIndex]);

    return (
        <div className="candidate">
            <ul>
                {
                    tickets.map((ticket, index) => {
                        return (
                            <Seat 
                                key={ ticket.type } 
                                index={ index }
                                expended={ expendedIndex === index }
                                onToggle={ toggleExpended }
                                {...ticket}/>
                        );
                    })
                }
            </ul>
        </div>);
});

Candidate.propTypes = {
    tickets: PropTypes.array.isRequired
};

export default Candidate;