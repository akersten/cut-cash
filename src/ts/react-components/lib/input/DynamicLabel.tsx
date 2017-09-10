///<reference path="../../../../../node_modules/@types/jquery/index.d.ts"/>
import * as React from "react";
import {DynamicLabelHelpers, DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";

class DynamicLabelProps {
    public id: string;
    public value?: string;

    public inputType: DynamicLabelType;

    public iconClassName: string;
    public onValueChange?: (id: string, newValue: string, oldValue: string) => boolean;
}

export class DynamicLabel extends React.Component<DynamicLabelProps, any> {
    constructor(props: DynamicLabelProps) {
        super(props);
    }

    private $label(): JQuery  {
        return $("#dynamicLabelLabel_" + this.props.id);
}

    private $labelContainer(): JQuery {

}
    /**
     * Switch the control to edit mode and focus the input field.
     */
    private switchToEditMode(): void {
        $("#dynamicLabelInputContainer_" + this.props.id).show();
        $("#dynamicLabelInput_" + this.props.id).val(this.props.value);
        $("#dynamicLabelLabel_" + this.props.id).hide();
        $("#dynamicLabelInput_" + this.props.id).focus();
    }

    /**
     * Switch the control to label mode.
     */
    private switchToLabelMode(): void {
        $("#dynamicLabelInputContainer_" + this.props.id).hide();
        $("#dynamicLabelLabel_" + this.props.id).show();
    }

    /**
     * Save any changes that have been made in edit mode. Assume that the DL input field currently has the value we
     * want to save.
     *
     * @return {boolean} Whether validation passed when saving the changes. This is based on the label type validator
     *                   and any additional validation by the owning control in its onValueChange.
     */
    private saveChanges(): boolean {

        let valueToSave: string;
        valueToSave = $("dynamicLabelInput_" + this.props.)


        // TODO: Determine if there is any special formatting that we need to make.
        this.props.onValueChange(this.props.id, $("#dynamicLabelInput_" + this.props.id).val() as string, this.props.value);

        // TODO: Raise event up the chain so the host can do additional validation and save the change. Might still be
        // invalid at this point.
    }


    /**
     * Click event for a DL when it's in read mode. Switches to edit mode.
     * @param e The click event.
     */
    private labelClick(e): void {
        this.switchToEditMode();
    }

    /**
     * Key down event for a DL when it's in read mode. Switches to edit mode if
     * they key was enter.
     * @param e The key down event.
     */
    private labelKeyDown(e): void {
        if (e.keyCode === 13) {
            this.switchToEditMode();
        }
    }


    private editModeKeyDown(e): void {
        // First check if we hit the escape key. In this case, switch immediately to label mode and don't save changes.
        if (e.which === 27) {
            this.switchToLabelMode();
            return;
        }

        // Otherwise, if we're not pressing the enter key, let the user proceed to input.
        if (e.which !== 13) {
            return;
        }

        if (this.saveChanges()) {
            this.switchToLabelMode();
        } else {
            //TODO: Raise validation error
        }

    }

    private editModeBlur(e): void {
        if (this.saveChanges()) {
            this.switchToLabelMode();
        } else {
            //TODO: Raise validation error
        }

    }


    render() {


        return (
            <div>
                <p
                    id={"dynamicLabelLabel_" + this.props.id}

                    className="label cw-dynamicLabel"
                    tabIndex={0}

                    onClick={e => {
                        this.labelClick(e);
                    }}
                    onKeyDown={e => {
                        this.labelKeyDown(e);
                    }}
                >

                    <span className="icon">
                        <i className={"fa " + this.props.iconClassName}> </i>
                    </span>
                    {this.props.value}
                </p>

                <p
                    id={"dynamicLabelInputContainer_" + this.props.id}

                    className="control has-icon"
                    style={{display: "none"}}
                >
                    <input
                        id={"dynamicLabelInput_" + this.props.id}

                        className="input"
                        type={DynamicLabelHelpers.mapTypeToInputTypeAttr(this.props.inputType)}

                        onKeyDown={e => {
                            this.editModeKeyDown(e);
                        }}
                        onBlur={e => {
                            this.editModeBlur(e);
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