import React, { memo,useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Account = memo(function Account(props) {
    const {
        price = 0,
        length
    } = props;

    const [expended, setExpended] = useState(false);

    return (
        <div className="account">
            <div 
                className={ `price ${ expended ? 'expended' : '' }` }
                onClick={ () => setExpended(!expended) }>
                <div className="money">{ length * price }</div>
                <div className="amount">支付金额</div>
            </div>
            <div className="button">提交订单</div>
            <div 
                className={ `layer ${ !expended ? 'hidden' : '' }` }
                onClick={ () => setExpended(false) }
            ></div>
            <div className={ `detail ${ !expended ? 'hidden' : '' }` }>
                <div className="title">金额详情</div>
                <ul>
                    <li>
                        <span>火车票</span>
                        <span>¥{ price }</span>
                        <span>&#xD7;{ length }</span>
                    </li>
                </ul>
            </div>
        </div>
    );
});

Account.propTypes = {
    price: PropTypes.number,
    length: PropTypes.number.isRequired
}

export default Account;