/**
 * Created by akersten on 5/12/17.
 */

import * as React from "react";
import {Receipt, ReceiptLine} from "../../core/receipt/receipt";
import {ReceiptHeaderComponent} from "./receipt/ReceiptHeaderComponent";
import {ReceiptBodyComponent} from "./receipt/ReceiptBodyComponent";
import {ReceiptFooterComponent} from "./receipt/ReceiptFooterComponent";
import {ReceiptComponent} from "./receipt/ReceiptComponent";
import {ReceiptsControls} from "./ReceiptsControls";
import {Party} from "../../core/party/party";
import {IDynamicLabelValueChangeEvent} from "../lib/input/DynamicLabel";
import {VmReceipt} from "../../viewmodels/receipt/vmReceipt";

class ReceiptsProps {
    public receipts: Array<VmReceipt>;
    public parties: Party[];
    public onKeyPress: (event) => void;
    public onReceiptPartyChange: (e, receiptId: string, partyId: string) => void;
    public onReceiptDeleteClick: (e, id: string) => void;
    public onReceiptDateChange: IDynamicLabelValueChangeEvent<Date>;
    public onReceiptPayerChange: IDynamicLabelValueChangeEvent<string>;
    public onReceiptTotalChange: IDynamicLabelValueChangeEvent<number>;
    public onReceiptTitleChange: IDynamicLabelValueChangeEvent<string>;
}

export class ReceiptsComponent extends React.Component<ReceiptsProps, any> {
    constructor(props: ReceiptsProps) {
        super(props);
    }

    render() {
        let rows = this.props.receipts.map(
            receipt => <ReceiptComponent
                title={receipt.title}
                date={receipt.dateFormatted}
                lines={receipt.lines}
                id={receipt.id}
                key={receipt.id}
                payer={receipt.payer}
                parties={this.props.parties}
                total={receipt.totalFormatted}
                onReceiptPartyChange={this.props.onReceiptPartyChange}
                onReceiptDeleteClick={this.props.onReceiptDeleteClick}
                onReceiptDateChange={this.props.onReceiptDateChange}
                onReceiptPayerChange={this.props.onReceiptPayerChange}
                onReceiptTotalChange={this.props.onReceiptTotalChange}
                onReceiptTitleChange={this.props.onReceiptTitleChange}
            />);

        return (
            <div className="columns is-multiline">
                <ReceiptsControls onKeyPress={this.props.onKeyPress}/>
                {rows}
            </div>);
    }
}