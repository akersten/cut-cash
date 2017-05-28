import * as React from "react";
import {ReceiptComponent} from "./receipt/ReceiptComponent";
import {Receipt, ReceiptLine} from "../core/receipt/receipt";

/**
 * Created by akersten on 4/30/17.
 */


export class CutCashApp extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <div>
                <ReceiptComponent title={this.state.receipt.title} date={this.state.receipt.date} lines={this.state.receipt.lines} id={this.state.receipt.id} />
            </div>
        );
    }
}
