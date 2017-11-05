/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {ReceiptLine} from "../../../core/receipt/receipt";
import {ReceiptRowComponent} from "./ReceiptRowComponent";
import {FormatHelpers} from "../../../core/lib/util/FormatHelpers";
import {IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {VmParty} from "../../../viewmodels/party/vmParty";

class ReceiptBodyProps {
    public lines: ReceiptLine[];
    public parties: Array<VmParty>;
    public receiptId: string;
    public onRowDelete: (e, receiptId: string, rowId: string) => void;
    public onRowTitleChange: IDynamicLabelValueChangeEvent<string>;
    public onRowAmountChange: IDynamicLabelValueChangeEvent<number>;
    public onReceiptPartyLineChange: (e, rowId: string, partyId: string) => void;
}

export class ReceiptBodyComponent extends React.Component<ReceiptBodyProps, any> {

    constructor(props: ReceiptBodyProps) {
        super(props);
    }


    render() {
        function partyHasReceipt(party, receipt): boolean {
            return party.excludedReceipts.indexOf(receipt) < 0;
        }

        let parties = this.props.parties.filter(partyHasReceipt);

        let rows = this.props.lines.map(line =>

            <ReceiptRowComponent
                id={line.id}
                receiptId={this.props.receiptId}
                key={line.id}
                title={line.title}
                parties={parties}
                amount={FormatHelpers.formatCurrency(line.amount as any as string)}
                onRowDelete={this.props.onRowDelete}
                onRowTitleChange={this.props.onRowTitleChange}
                onRowAmountChange={this.props.onRowAmountChange}
                onReceiptPartyLineChange={this.props.onReceiptPartyLineChange}
            />
        );

        return (
            <div>
                <ul>{rows}</ul>
            </div>
        );
    }
}