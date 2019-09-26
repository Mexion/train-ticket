import React, { useState, useEffect, useMemo,useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import Back from '../back';

import './index.css';


//每一个城市选择项的组件
const CityItem = memo(function CityItem(props) {
    const {
        name,
        onSelect
    } = props;

    return (
        <li 
            className="city-li"
            onClick={ () => onSelect(name) }>
            { name }
        </li>
    );
});

CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

//城市选择的每一个字母对应的城市集合组件
const CitySection = memo(function CitySection(props) {
    const {
        title,
        cities = [],
        onSelect
    } = props;

    return (
        <ul className="city-ul">
            <li className="city-li" key={ title } data-cate={ title }>
                { title }
            </li>
            {
                cities.map(city => {
                    return (
                        <CityItem 
                            name={ city.name } 
                            key={ city.name } 
                            onSelect= { onSelect }
                        />);
                })
            }
        </ul>
    );
});

CitySection.propTypes = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array,
    onSelect: PropTypes.func.isRequired
}

//每个字母索引的组件
const AlphaIndex = memo(function AlphaIndex(props) {
    const {
        alpha,
        onClick
    } = props;

    return (
        <i className="city-index-item" onClick={ () => { onClick(alpha) } }>
            { alpha }
        </i>
    )
})

AlphaIndex.propTypes = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

//生成26个字母的数组
const Alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index);
})

//整个城市选择的大列表
const CityList = memo(function CityList(props) {
    const {
        sections,
        onSelect,
        toAlpha
    } = props;

    return (
        <div className="city-list">
            <div className="city-cate">
                {
                    sections.map(section => {
                        return (
                            <CitySection
                                cities={ section.citys }
                                title={ section.title }
                                key={ section.title }
                                onSelect={ onSelect }
                            />
                        )
                    })
                }
            </div>
            <div className="city-index">
                {
                    Alphabet.map(alpha => {
                        return (
                            <AlphaIndex
                                alpha={ alpha }
                                key={ alpha }
                                onClick={ toAlpha }
                            />)
                    })
                }
            </div>
        </div>
    );
});

CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired
}


//搜索建议组件 搜索建议的每个城市组件
const SuggestItem = memo(function SuggestItem(props) {
    const {
        name,
        onClick
    } = props;

    return (
        <div 
            className="city-suggest-li" 
            onClick={ () => onClick(name) }>
            { name }
        </div>)
});

SuggestItem.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

//搜索建议的整个大组件
const Suggest = memo(function Suggest(props) {
    const {
        searchKey,
        onSelect
    } = props;

    const [result, setResult] = useState('');

    useEffect(() => {
        if(searchKey.length <= 0) return;
        fetch(`/rest/search?key=${ encodeURIComponent(searchKey) }`)
            .then(res => res.json())
            .then(data => {
                const {
                    result,
                    searchKey: sKey
                } = data;

                if(sKey === searchKey) {
                    setResult(result);
                }
            });
    }, [searchKey]);

    //如果没有结果则返回只有搜索关键词的数组，否则显示搜索结果
    const fallbackResult = useMemo(() => {
        if(!result.length) {
            return [{ display: searchKey }];
        }
        return result;
    }, [result, searchKey])

    return (
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {
                    fallbackResult.map(item => {
                        return (
                            <SuggestItem
                                key={ item.display }
                                name={ item.display }
                                onClick={ onSelect }
                            />
                        )
                    })
                }
            </ul>
        </div>)
});

Suggest.propTypes = {
    searchKey: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}


//整个城市列表选择组件
const CitySelector = memo(function CitySelector(props) {
    const {
        isCitySelectorVisible,
        onBack,
        cityData,
        isLoadingCityData,
        onSelect,
        fetchCityData
    } = props;

    const [searchKey, setSearchKey] = useState('');
    const key = useMemo(() => searchKey.trim(), [searchKey]);

    useEffect(() => {
        if(!isCitySelectorVisible || cityData || isLoadingCityData) {
            return;
        }
        fetchCityData();
    }, [isCitySelectorVisible, cityData, isLoadingCityData, fetchCityData])

    //封装点击跳转到对应城市列的方法
    const toAlpha = useCallback(alpha => {
        document.querySelector(`[data-cate='${ alpha }']`).scrollIntoView();
    }, []);

    //封装一个函数，在不同的条件下渲染不同的内容，比如加载中，加载错误
    const outputCitySections = () => {
        if(isLoadingCityData) {
            return (<div className="city-loading">Loading</div>);
        }
        if(cityData) {
            return (
                <CityList
                    sections={ cityData.cityList }
                    onSelect={ onSelect }
                    toAlpha={ toAlpha }
                />
            );
        }
        return (<div className="city-error">error</div>);
    }

    return (
        <div className={`city-selector ${ !isCitySelectorVisible  ? 'hidden' : ''}`}>
            <div className="city-search">
                <Back className="search-back" onBack={ onBack }/>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={ searchKey }
                        className="search-input"
                        placeholder="城市、车站的中文或拼音"
                        onChange={ e => setSearchKey(e.target.value) }/>
                </div>
                <i 
                className={`search-clean ${ key.length === 0 ? 'hidden': '' }`}
                onClick={ () => setSearchKey('') }>&#xf063;</i>
            </div>
            {
                //输出搜索结果组件
            }
            {
                Boolean(key) && (
                    <Suggest
                        searchKey={ key }
                        onSelect={key => onSelect(key) }
                    />
                )
            }
            { 
                //输出列表组件
             }
            { outputCitySections() }
        </div>
    )
});

CitySelector.propTypes = {
    isCitySelectorVisible: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    cityData: PropTypes.object,
    isLoadingCityData: PropTypes.bool.isRequired,
    fetchCityData: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default CitySelector;