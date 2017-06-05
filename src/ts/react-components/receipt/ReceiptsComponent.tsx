/**
 * Created by akersten on 5/12/17.
 */

import * as React from "react";
import {Receipt, ReceiptLine} from "../../core/receipt/receipt";
import {ReceiptHeaderComponent} from "./ReceiptHeaderComponent";
import {ReceiptBodyComponent} from "./ReceiptBodyComponent";
import {ReceiptFooterComponent} from "./ReceiptFooterComponent";
import {ReceiptComponent} from "./ReceiptComponent";

class ReceiptsProps {
    public receipts: Array<Receipt>;
}

export class ReceiptsComponent extends React.Component<ReceiptsProps, any> {
    constructor(props:ReceiptsProps) {
        super(props);
    }

    render() {
        let rows = this.props.receipts.map(
            receipt => <ReceiptComponent
                title={receipt.title}
                date={receipt.date}
                lines={receipt.lines}
                id={receipt.id}
                key={receipt.id}
            />);

        return <div>{rows}</div>;
    }
}