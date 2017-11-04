import * as React from "react";
import {Party} from "../../core/party/party";
import {PartyComponent} from "./party/PartyComponent";
import {PartiesControls} from "./PartiesControls";
import {VmParty} from "../../viewmodels/party/vmParty";
import {ParseHelpers} from "../../core/lib/util/ParseHelpers";
import {FormatHelpers} from "../../core/lib/util/FormatHelpers";

class PartiesProps {
    public parties: Array<VmParty>;
    public onKeyPress: (event) => void;
    public onPartyDeleteClick: (e, partyId: string) => void;
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
                contributions={FormatHelpers.formatCurrency(party.contributions as any as string)}
                valueReceived={FormatHelpers.formatCurrency(party.valueReceived as any as string)}
                onPartyDeleteClick={this.props.onPartyDeleteClick}

            />);

        return (
            <div className="columns is-multiline">
                <PartiesControls onKeyPress={this.props.onKeyPress}/>
                {parties}
            </div>);
    }
}