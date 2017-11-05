import * as React from "react";
import {Party} from "../../../core/party/party";
import {ReceiptPartyComponent} from "./ReceiptPartyComponent";
import {VmParty} from "../../../viewmodels/party/vmParty";

class ReceiptPartiesLineProps {
    public parties: VmParty[];
    public receiptId: string;
    public onReceiptPartyLineChange: (e, rowId: string, partyId: string) => void;
}

export class ReceiptPartiesLineComponent extends React.Component<ReceiptPartiesLineProps, any> {

    constructor(props: ReceiptPartiesLineProps) {
        super(props);
    }

    render() {
        function partyHasReceiptLine(party, receipt): boolean {
            return party.excludedReceiptLines.indexOf(receipt) < 0;
        }

        let checkboxes = this.props.parties.map(party => <ReceiptPartyComponent
            key={this.props.receiptId + "_" + party.id}
            name={party.name}
            selected={partyHasReceiptLine(party, this.props.receiptId)}
            onReceiptPartyChange={this.props.onReceiptPartyLineChange}
            receiptId={this.props.receiptId}
            partyId={party.id}
            small={true}
        />);

        return (
            <div className="tags">
                {checkboxes}
            </div>
        );
    }
}