import {
    SET_FROM,
    SET_TO,
    SET_IS_CITY_SELECTOR_VISIBLE,
    SET_CURRENT_SELECTING_LEFT_CITY,
    SET_CITY_DATA,
    SET_IS_LOADING_CITY_DATA,
    SET_IS_DATE_SELECTOR_VISIBLE,
    SET_HIGH_SPEED,
    SET_DEPART_DATE,
} from "./actionTypes";

import { BACK_END_URL } from "../../utility/config";

export function setFromAction(from) {
    return {
        type: SET_FROM,
        payload: from,
    };
}

export function setToAction(to) {
    return {
        type: SET_TO,
        payload: to,
    };
}

export function setCurrentSelectingLeftCityAction(CurrentSelectingLeftCity) {
    return {
        type: SET_CURRENT_SELECTING_LEFT_CITY,
        payload: CurrentSelectingLeftCity,
    };
}

export function setCityDataAction(cityData) {
    return {
        type: SET_CITY_DATA,
        payload: cityData,
    };
}

export function setIsLoadingCityDataAction(isLoadingCityData) {
    return {
        type: SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

export function setHighSpeedAction() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: SET_HIGH_SPEED,
            payload: !highSpeed,
        });
    };
}

export function showCitySelectorAction(CurrentSelectingLeftCity) {
    return dispatch => {
        dispatch({
            type: SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: SET_CURRENT_SELECTING_LEFT_CITY,
            payload: CurrentSelectingLeftCity,
        });
    };
}

export function hideCitySelectorAction() {
    return {
        type: SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}

export function setSelectedCityAction(city) {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState();
        if (currentSelectingLeftCity) {
            dispatch(setFromAction(city));
        } else {
            dispatch(setToAction(city));
        }

        dispatch(hideCitySelectorAction());
    };
}

export function showDateSelectorAction() {
    return {
        type: SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}

export function hideDateSelectorAction() {
    return {
        type: SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    };
}

export function exchangeFromToAction() {
    return (dispatch, getState) => {
        const { from, to } = getState();
        dispatch(setFromAction(to));
        dispatch(setToAction(from));
    };
}

export function fetchCityDataAction() {
    return (dispatch, getState) => {
        const { isLoadingCityData } = getState();
        if (isLoadingCityData) return;
        const cityDataCache = JSON.parse(
            localStorage.getItem("city_data_cache") || "{}"
        );
        if (cityDataCache.expires && Date.now() < cityDataCache.expires) {
            dispatch(setCityDataAction(cityDataCache.data));
            return;
        }
        dispatch(setIsLoadingCityDataAction(true));
        fetch(`${BACK_END_URL}/rest/cities?_${Date.now()}`)
            .then(res => res.json())
            .then(cityData => {
                dispatch(setCityDataAction(cityData));
                localStorage.setItem(
                    "city_data_cache",
                    JSON.stringify({
                        expires: Date.now() + 60 * 1000,
                        data: cityData,
                    })
                );
                dispatch(setIsLoadingCityDataAction(false));
            })
            .catch(() => {
                dispatch(setIsLoadingCityDataAction(false));
            });
    };
}

export function setDepartDateAction(departDate) {
    return {
        type: SET_DEPART_DATE,
        payload: departDate,
    };
}
