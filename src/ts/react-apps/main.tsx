/**
 * Created by akersten on 5/12/17.
 *
 * This is the main application component for both the logged-in and guest views.
 */

import {createStore} from "redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {CutCashApp} from "../react-components/CutCashApp";
import {mainReducer} from "../redux-reducers/main";

let store = createStore(mainReducer);

const el =
    <Provider store={store}>
        <CutCashApp />
    </Provider>;

ReactDOM.render(
    el,
    $('#react-app')[0]
);
