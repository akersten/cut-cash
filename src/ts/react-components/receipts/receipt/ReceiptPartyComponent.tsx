import * as React from "react";

class ReceiptPartyProps {
    public name: string;
    public selected: boolean;
    public receiptId: string;
    public partyId: string;

    public onReceiptPartyChange: (e, receiptId: string, partyId: string) => void;
}

export class ReceiptPartyComponent extends React.Component<ReceiptPartyProps, any> {

    constructor(props: ReceiptPartyProps) {
        super(props);
    }

    render() {
        return (<li>
            <label className="checkbox">
                <input type="checkbox" checked={this.props.selected} onChange={e => this.props.onReceiptPartyChange(e, this.props.receiptId, this.props.partyId)} />
                {this.props.name}
            </label>

        </li>);
    }
}