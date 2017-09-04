import * as React from "react";
import {Color} from "../../../core/lib/color";

class PartyAvatarProps {
    public name: string;
    public initials: string;
    public color: Color;
}

export class PartyAvatarComponent extends React.Component<PartyAvatarProps, any> {

    constructor(props:PartyAvatarProps) {
        super(props);
    }

    render() {
        return (
            <figure className="image is-48x48 has-text-centered cw-avatar" style={this.props.color.toCSS(true, true)}>
                {this.props.initials}
            </figure>
        );
    }
}