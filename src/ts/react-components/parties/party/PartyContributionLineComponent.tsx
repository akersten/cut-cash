import * as React from "react";

class PartyContributionLineProps {
    public text: string;
    public amount: string;
    public classes?: string;
}

export class PartyContributionLineComponent extends React.Component<PartyContributionLineProps, any> {

    constructor(props:PartyContributionLineProps) {
        super(props);
    }

    render() {
        return (
            <li className={this.props.classes}>
                <span>{this.props.text}</span><span className="is-pulled-right">{this.props.amount}</span>
            </li>
        );
    }
}