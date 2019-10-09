import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import * as serviceWorker from "../serviceWorker";

import store from "./store/";
import App from "./App";

import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

//判断是否是生产环境，是否开启SW
if ("production" === process.env.NODE_ENV) {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
