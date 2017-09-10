import * as React from "react";

class PartiesControlsProps {
    onKeyPress: (e) => void;
}

export class PartiesControls extends React.Component<PartiesControlsProps, any> {
    constructor(props: PartiesControlsProps) {
        super(props);
    }

    render() {
        return (
            <div className="column is-one-third">
                <div className="control has-icons-left">

                    <input className="input" type="text" placeholder="Add person"
                           onKeyPress={this.props.onKeyPress}/>
                    <span className="icon is-left">
                        <i className="fa fa-user"> </i>
                    </span>
                </div>
            </div>

        );
    }
}