import React, { memo, useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import useWinSize from '../../../common/hooks/useWinSize';

import './index.css';

const Slider = memo(function Slider(props) {
    const {
        title,
        currentStartHours,
        currentEndHours,
        onStartChanged,
        onEndChanged,
    } = props;

    //使用自定义hook函数
    const winSize = useWinSize();

    //定义ref以操作DOM
    const startHandle = useRef();
    const endHandle = useRef();

    //同时还需要使用Ref来记录上一次滑动滑块的横坐标
    const lastStartX = useRef();
    const lastEndX = useRef();

    //声明ref以获取slider的DOM
    const range = useRef();
    //并且声明一个ref来存储整个slider的宽度，不用每次都测量
    const rangeWidth = useRef();

    //使用ref来记录上一次currentHours的值
    const prevCurrentStartHours = useRef(currentStartHours);
    const prevCurrentEndHours = useRef(currentEndHours);
    
    //因为currentStartHours和currentEndHours在延迟初始化函数中使用
    //所以只会在组件第一次渲染中被使用，即使后面值发生了改变也不会重新运算
    //所以需要定义上面的Ref来记录上一次的hours以及后面手动比对更新
    const [start, setStart] = useState(() => currentStartHours / 24 * 100);
    const [end, setEnd] = useState(() => currentEndHours / 24 * 100);

    //如果currentHours的值有改变，则手动更新start和end
    if(prevCurrentStartHours.current !== currentStartHours) {
        setStart((currentStartHours / 24) * 100);
        prevCurrentStartHours.current = currentStartHours;
    }
    if (prevCurrentEndHours.current !== currentEndHours) {
        setEnd((currentEndHours / 24) * 100);
        prevCurrentEndHours.current = currentEndHours;
    }

    //为了防止出现精度溢出，控制变量范围
    const startPercent = useMemo(() => {
        if(start > 100) {
            return 100;
        }
        if(start < 0) {
            return 0;
        }
        return start;
    }, [start]);

    const endPercent = useMemo(() => {
        if (end > 100) {
            return 100;
        }
        if (end < 0) {
            return 0;
        }
        return end;
    }, [end]);

    //将百分比转换为24小时以显示时间
    const startHours = useMemo(() => {
        return Math.round(startPercent * 24 / 100);
    }, [startPercent]);

    const endHours = useMemo(() => {
        return Math.round(endPercent * 24 / 100);
    }, [endPercent]);

    //在时间的前后补零
    const startText = useMemo(() => {
        return String(startHours).padStart(2, '0') + ':00';
    }, [startHours]);

    const endText = useMemo(() => {
        return String(endHours).padStart(2, '0') + ':00';
    }, [endHours]);


    //定义绑定事件的回调函数
    function onStartTouchBegin(e) {
        const touch = e.targetTouches[0];
        //赋值给current而不是Ref对象本身
        lastStartX.current = touch.pageX;
    }

    function onEndTouchBegin(e) {
        const touch = e.targetTouches[0];
        //赋值给current而不是Ref对象本身
        lastEndX.current = touch.pageX;
    }

    function onStartTouchMove(e) {
        const touch = e.targetTouches[0];
        //计算移动距离
        const distance = touch.pageX - lastStartX.current;
        //更新本次移动的位置到lastStartX中
        lastStartX.current = touch.pageX;
        //设置滑块位置
        setStart(start => start + (distance / rangeWidth.current) * 100);
    }

    function onEndTouchMove(e) {
        const touch = e.targetTouches[0];
        //计算移动距离
        const distance = touch.pageX - lastEndX.current;
        //更新本次移动的位置到lastStartX中
        lastEndX.current = touch.pageX;
        //设置滑块位置
        setEnd(end => end + (distance / rangeWidth.current) * 100);
    }

    //这个副作用用于测量和存储slide的宽度
    //依赖于自定义hooks中的winSize.width，当页面缩放时会重新获取页面宽高，从而重新计算滑动条宽度
    useEffect(() => {
        
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        );
    }, [winSize.width]);

    //使用useEffect声明副作用
    useEffect(() => {
        //使用ref对象的current才能获取到DOM对象
        //这里绑定左边滑块的事件
        startHandle.current.addEventListener(
            'touchstart',
            onStartTouchBegin,
            false
        );
        startHandle.current.addEventListener(
            'touchmove',
            onStartTouchMove,
            false
        );
        //绑定右边滑块事件
        endHandle.current.addEventListener(
            'touchstart',
            onEndTouchBegin,
            false
        );
        endHandle.current.addEventListener(
            'touchmove',
            onEndTouchMove,
            false
        );

        //useEffect返回一个函数来解绑事件
        return () => {
            startHandle.current.removeEventListener(
                'touchstart',
                onStartTouchBegin,
                false
            );
            startHandle.current.removeEventListener(
                'touchmove',
                onStartTouchMove,
                false
            );
            endHandle.current.removeEventListener(
                'touchstart',
                onEndTouchBegin,
                false
            );
            endHandle.current.removeEventListener(
                'touchmove',
                onEndTouchMove,
                false
            );
        }
        
    });

    //上报数据到上级组件
    useEffect(() => {
        onStartChanged(startHours);
    }, [startHours, onStartChanged]);

     useEffect(() => {
         onEndChanged(endHours);
     }, [endHours, onEndChanged]);

    return (
        <div className="option">
            <h3>{ title }</h3>
            <div className="range-slider">
                <div className="slider" ref={ range }>
                    <div 
                        className="slider-range"
                        style={{ 
                            left: startPercent + '%',
                            width: endPercent - startPercent + '%' }}></div>
                    <i ref={ startHandle } className="slider-handle" style={{ left: startPercent + '%' }}>
                            <span>{ startText }</span>
                    </i>
                    <i ref={ endHandle } className="slider-handle" style={{ left: endPercent + '%' }}>
                            <span>{ endText }</span>
                    </i>
                </div>
            </div>
        </div>
    );
});

Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChanged: PropTypes.func.isRequired,
    onEndChanged: PropTypes.func.isRequired,
}


export default Slider;