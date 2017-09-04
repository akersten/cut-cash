import * as React from "react";

class ReceiptPartyProps {
    public name: string;
}

export class ReceiptPartyComponent extends React.Component<ReceiptPartyProps, any> {

    constructor(props: ReceiptPartyProps) {
        super(props);
    }

    render() {
        return (<li>
            <label className="checkbox">
                <input type="checkbox"/>
                {this.props.name}
            </label>

        </li>);
    }
}