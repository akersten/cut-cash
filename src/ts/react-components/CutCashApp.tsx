import * as React from "react";
import {ReceiptComponent} from "./receipt/ReceiptComponent";
import {Receipt, ReceiptLine} from "../core/receipt/receipt";
import {ReceiptsComponent} from "./receipt/ReceiptsComponent";
import {ReceiptsLink} from "./receipt/ReceiptsLink";

/**
 * Created by akersten on 4/30/17.
 */


export class CutCashApp extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return <ReceiptsLink />;
    }
}
