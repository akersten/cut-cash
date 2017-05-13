/**
 * Created by akersten on 5/12/17.
 *
 * This is the main application component for both the logged-in and guest views.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import {CutCashApp} from "../react-components/CutCashApp";

const el = <CutCashApp name="yes" age={2} />;

ReactDOM.render(
    el,
    $('#react-app')[0]
);
