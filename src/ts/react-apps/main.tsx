/**
 * Created by akersten on 5/12/17.
 *
 * This is the main application component for both the logged-in and guest views.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import {CutCashApp} from "../react-components/CutCashApp";
import {Receipt, ReceiptLine} from "../core/receipt/receipt";

let rec = new Receipt();
rec.date = new Date();
rec.title = "Hey I'm a real react component!";
rec.lines = [
    new ReceiptLine(1,"First item"),
    new ReceiptLine(2,"Second item"),
    new ReceiptLine(3,"Third item")
];


const el = <CutCashApp name="yes" age={2} testRec={rec} />;

ReactDOM.render(
    el,
    $('#react-app')[0]
);
