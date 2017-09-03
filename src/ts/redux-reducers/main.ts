/**
 * Created by akersten on 5/27/17.
 */

import {combineReducers} from "redux";
import {receiptReducer} from "./receiptReducer";
import {partyReducer} from "./partyReducer";

export const mainReducer = combineReducers({
    receipts: receiptReducer,
    parties: partyReducer,
});