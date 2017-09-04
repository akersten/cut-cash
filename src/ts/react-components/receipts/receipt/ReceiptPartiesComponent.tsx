import * as React from "react";
import {Party} from "../../../core/party/party";
import {ReceiptPartyComponent} from "./ReceiptPartyComponent";

class ReceiptPartiesProps {
    public parties: Party[];
    public receiptId: string;
    public onReceiptPartyChange: (e, receiptId: string, partyId: string) => void;
}

export class ReceiptPartiesComponent extends React.Component<ReceiptPartiesProps, any> {

    constructor(props: ReceiptPartiesProps) {
        super(props);
    }

    render() {
        function partyHasReceipt(party, receipt): boolean {
            return party.excludedReceipts.indexOf(receipt) < 0;
        }

        let checkboxes = this.props.parties.map(party => <ReceiptPartyComponent
            key={this.props.receiptId + "_" + party.id}
            name={party.name}
            selected={partyHasReceipt(party, this.props.receiptId)}
            onReceiptPartyChange={this.props.onReceiptPartyChange}
            receiptId={this.props.receiptId}
            partyId={party.id}
        />);

        return (
            <ul>
                {checkboxes}
            </ul>
        );
    }
}