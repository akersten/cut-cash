import * as React from "react";

class ReceiptPartyProps {
    public name: string;
    public selected: boolean;
    public receiptId: string;
    public partyId: string;
    public small?: boolean;

    public onReceiptPartyChange: (e, receiptId: string, partyId: string) => void;
}

export class ReceiptPartyComponent extends React.Component<ReceiptPartyProps, any> {

    constructor(props: ReceiptPartyProps) {
        super(props);
    }

    render() {
        let classes = "tag " + (this.props.small ? "" : "is-medium ") + (this.props.selected ? "is-primary has-text-dark" : "is-white");
        return (<span className={classes}>
            <label className="checkbox">
                <input type="checkbox" checked={this.props.selected} onChange={e => this.props.onReceiptPartyChange(e, this.props.receiptId, this.props.partyId)} />
                {this.props.name}
            </label>

        </span>);
    }
}