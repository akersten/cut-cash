/**
 * Created by akersten on 5/27/17.
 */

import {combineReducers} from "redux";
import {receiptReducer} from "./receiptReducer";

export const mainReducer = combineReducers({
    receipts: receiptReducer,
});