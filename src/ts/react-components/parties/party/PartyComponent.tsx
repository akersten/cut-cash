import * as React from "react";
import {Color} from "../../../core/lib/color";
import {PartyAvatarComponent} from "./PartyAvatarComponent";

class PartyProps {
    public id: string;
    public name: string;
    public color: Color;
    public initials: string;
}

export class PartyComponent extends React.Component<PartyProps, any> {
    constructor(props:PartyProps) {
        super(props);
    }

    render() {
        return (
            <div className="media">
                <div className="media-left">
                    <PartyAvatarComponent initials={this.props.initials} name={this.props.name} color={this.props.color} />
                </div>
                <div className="media-content">
                    <p className="title">{this.props.name}</p>
                </div>
            </div>
        );
    }
}