import * as React from "react";
import {Party} from "../../core/party/party";
import {PartyComponent} from "./party/PartyComponent";
import {PartiesControls} from "./PartiesControls";

class PartiesProps {
    public parties: Array<Party>;
    public onKeyPress: (event) => void;
}

export class PartiesComponent extends React.Component<PartiesProps, any> {
    constructor(props:PartiesProps) {
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
            />);

        return (
            <div>
                <PartiesControls onKeyPress={this.props.onKeyPress} />
                <div>{parties}</div>
            </div>);
    }
}