import * as React from "react";
import {Color} from "../../../core/lib/color";
import {PartyAvatarComponent} from "./PartyAvatarComponent";
import {PartyContributionLineComponent} from "./PartyContributionLineComponent";

class PartyProps {
    public id: string;
    public name: string;
    public color: Color;
    public initials: string;
    public contributions?: string;
    public valueReceived?: string;
    public delta?: string;
    public owes?: boolean;
    public onPartyDeleteClick: (e, partyId: string) => void;
}

export class PartyComponent extends React.Component<PartyProps, any> {
    constructor(props: PartyProps) {
        super(props);
    }

    render() {
        return (
            <div className="column is-one-third cw-fx-expand-on-create" data-id={this.props.id}>
                <div className="media">
                    <div className="media-left">
                        <PartyAvatarComponent initials={this.props.initials} name={this.props.name}
                                              color={this.props.color}/>
                    </div>
                    <div className="media-content">
                        <p className="title">{this.props.name}</p>
                        <ul>
                            <PartyContributionLineComponent text="Contributed" amount={this.props.contributions} />
                            <PartyContributionLineComponent text="Received" amount={this.props.valueReceived} />
                            <PartyContributionLineComponent text={this.props.owes ? "Owes" : "Owed"} amount={this.props.delta} classes={"has-text-weight-semibold " + (this.props.owes ? "has-text-info" : "has-text-black")} />
                        </ul>
                    </div>
                    <div className="media-right">
                        <button className="delete"
                                onClick={e => this.props.onPartyDeleteClick(e, this.props.id)}>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}