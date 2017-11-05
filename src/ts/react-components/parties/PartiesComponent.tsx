import * as React from "react";
import {Party} from "../../core/party/party";
import {PartyComponent} from "./party/PartyComponent";
import {PartiesControls} from "./PartiesControls";
import {VmParty} from "../../viewmodels/party/vmParty";
import {ParseHelpers} from "../../core/lib/util/ParseHelpers";
import {FormatHelpers} from "../../core/lib/util/FormatHelpers";
import {VmReceipt} from "../../viewmodels/receipt/vmReceipt";

class PartiesProps {
    public parties: Array<VmParty>;
    public onKeyPress: (event) => void;
    public receipts: Array<VmReceipt>; // Used by party contribution calculation logic.
    public onPartyDeleteClick: (e, partyId: string) => void;
    public getPartyContribution: (receipts: Array<VmReceipt>, partyId: string) => number;
    public getPartyValueReceived: (receipts: Array<VmReceipt>, partyId: string) => number;
}

export class PartiesComponent extends React.Component<PartiesProps, any> {
    constructor(props: PartiesProps) {
        super(props);
    }

    render() {
        let parties = this.props.parties.map(
            party => <PartyComponent
                key={party.id}
                id={party.id}
                name={party.name}
                color={party.color}
                initials={party.initials}
                contributions={FormatHelpers.formatCurrency(this.props.getPartyContribution(this.props.receipts, party.id) as any as string)}
                valueReceived={FormatHelpers.formatCurrency(this.props.getPartyValueReceived(this.props.receipts, party.id) as any as string)}
                onPartyDeleteClick={this.props.onPartyDeleteClick}

            />);

        return (
            <div className="columns is-multiline">
                <PartiesControls onKeyPress={this.props.onKeyPress}/>
                {parties}
            </div>);
    }
}