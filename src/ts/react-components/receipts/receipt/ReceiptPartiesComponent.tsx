import * as React from "react";
import {Party} from "../../../core/party/party";
import {ReceiptPartyComponent} from "./ReceiptPartyComponent";

class ReceiptPartiesProps {
    public parties: Party[];
}

export class ReceiptPartiesComponent extends React.Component<ReceiptPartiesProps, any> {

    constructor(props:ReceiptPartiesProps) {
        super(props);
    }

    render() {
        let checkboxes = this.props.parties.map(party => <ReceiptPartyComponent name={party.name} />);

        return (
            <ul>
                {checkboxes}
            </ul>
        );
    }
}