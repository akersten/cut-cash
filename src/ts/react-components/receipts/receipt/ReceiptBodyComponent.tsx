/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {ReceiptLine} from "../../../core/receipt/receipt";
import {ReceiptRowComponent} from "./ReceiptRowComponent";
import {FormatHelpers} from "../../../core/lib/util/FormatHelpers";
import {IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";

class ReceiptBodyProps {
    public lines: ReceiptLine[];
    public receiptId: string;
    public onRowDelete: (e, receiptId: string, rowId: string) => void;
    public onRowTitleChange: IDynamicLabelValueChangeEvent<string>;
    public onRowAmountChange: IDynamicLabelValueChangeEvent<number>;
}

export class ReceiptBodyComponent extends React.Component<ReceiptBodyProps, any> {

    constructor(props:ReceiptBodyProps) {
        super(props);
    }

    render() {
        let rows = this.props.lines.map(line =>

            <ReceiptRowComponent
                id={line.id}
                receiptId={this.props.receiptId}
                key={line.id}
                title={line.title}
                amount={FormatHelpers.formatCurrency(line.amount as any as string)}
                onRowDelete={this.props.onRowDelete}
                onRowTitleChange={this.props.onRowTitleChange}
                onRowAmountChange={this.props.onRowAmountChange}
                />
        );

        return (
            <div>
                <ul>{rows}</ul>
            </div>
        );
    }
}