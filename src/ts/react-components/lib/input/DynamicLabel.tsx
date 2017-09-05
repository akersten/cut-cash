import * as React from "react";

class DynamicLabelProps {
    public id: string;
    public value?: string;

    public inputType?: string;

    public iconClassName: string;
    public onValueChange?: (e, id: string, newValue: string, oldValue: string) => void;
}

export class DynamicLabel extends React.Component<DynamicLabelProps, any> {
    constructor(props: DynamicLabelProps) {
        super(props);
    }

    render() {


        return (
            <div>


                <p className="label cw-dynamicLabel"
                   id={"dynamicLabelLabel_" + this.props.id}
                   onClick={e => {
                       $("#dynamicLabelInputContainer_" + this.props.id).show();
                       $("#dynamicLabelInput_" + this.props.id).val(this.props.value);
                       $("#dynamicLabelLabel_" + this.props.id).hide();
                       $("#dynamicLabelInput_" + this.props.id).focus();
                   }}>

                    <span className="icon">
                        <i className={"fa " + this.props.iconClassName}> </i>
                    </span>
                    {this.props.value}
                </p>

                <p className="control has-icon" style={{display: "none"}}
                   id={"dynamicLabelInputContainer_" + this.props.id}>
                    <input className="input" id={"dynamicLabelInput_" + this.props.id} type={this.props.inputType}
                           onKeyDown={e => {
                               if (e.which !== 13) {
                                   return;
                               }

                               $("#dynamicLabelInput_" + this.props.id).blur();
                           }}
                           onBlur={e => {
                               this.props.onValueChange(e, this.props.id, $("#dynamicLabelInput_" + this.props.id).val() as string, this.props.value);

                               $("#dynamicLabelInputContainer_" + this.props.id).hide();
                               $("#dynamicLabelLabel_" + this.props.id).show();
                           }}
                    />
                    <span className="icon">
                        <i className={"fa " + this.props.iconClassName}> </i>
                    </span>
                </p>
            </div>
        );
    }
}