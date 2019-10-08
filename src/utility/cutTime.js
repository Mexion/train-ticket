/**
 * <功能函数，将Unix时间戳只精简到天>
 * @param timestamp unix时间戳,default：Date.now()
 * @return 返回一个修改后的Unix时间戳
 */

export default (timestamp = Date.now()) => {
    const time = new Date(timestamp);
    //将时间的时、分、秒、毫秒全设置为0
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);

    return time.getTime();
};
