/**
 * Created by akersten on 5/12/17.
 */

import * as React from "react";
import {Receipt} from "../../core/receipt/receipt";
import {ReceiptHeaderComponent} from "./ReceiptHeaderComponent";
import {ReceiptBodyComponent} from "./ReceiptBodyComponent";
import {ReceiptFooterComponent} from "./ReceiptFooterComponent";

class ReceiptProps {
    public receipt:Receipt;
}

export class ReceiptComponent extends React.Component<ReceiptProps, any> {
    constructor(props:ReceiptProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <ReceiptHeaderComponent title={this.props.receipt.title} date={this.props.receipt.date} />
                <ReceiptBodyComponent lines={this.props.receipt.lines} />
                <ReceiptFooterComponent/>
            </div>
        );

    }
}