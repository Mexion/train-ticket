import { useState, useEffect } from "react";

export default function useWinSize() {
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    const [height, setHight] = useState(document.documentElement.clientHeight);

    function onResize() {
        //窗口大小发生改变时重新获取整个文档的宽高
        setWidth(document.documentElement.clientWidth);
        setHight(document.document.clientHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", onResize, false);

        return () => {
            window.removeEventListener("resize", onResize, false);
        };
    }, []);

    return { width, height };
}
