import * as React from "react";
import * as ReactDOM from "react-dom";

import { Demo } from "../tsx/TestComponent";



/**
 * Created by akersten on 4/28/17.
 */



const el = <Demo name="yes" age={2} />;

ReactDOM.render(
    el,
    $('#react_example')[0]
);
