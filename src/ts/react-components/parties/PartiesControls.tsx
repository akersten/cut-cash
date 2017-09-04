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
                <div className="control">

                    <input className="input" type="text" placeholder="Add party"
                           onKeyPress={this.props.onKeyPress}/>
                </div>
            </div>

        );
    }
}