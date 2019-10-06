import { useCallback } from 'react';
import cutTime from '../../utility/cutTime';

export default function useDateNav(departDate, dispatch, setPrevDateAction, setNextDateAction) {
     const isPrevDisabled = cutTime(departDate) <= cutTime();
    const isNextDisabled = cutTime(departDate) - cutTime() > 30 * 86400 * 1000;

    const prevClick = useCallback(() => {
        if(isPrevDisabled) return;
        dispatch(setPrevDateAction());
    }, [isPrevDisabled, setPrevDateAction, dispatch]);

    const nextClick = useCallback(() => {
        if(isNextDisabled) return;
        dispatch(setNextDateAction());
    }, [isNextDisabled, setNextDateAction, dispatch]);

    return {
        isPrevDisabled,
        isNextDisabled,
        prevClick,
        nextClick
    };
};