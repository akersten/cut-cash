import * as React from "react";
import {DynamicLabelHelpers, DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";


export interface IDynamicLabelValueChangeEventArgs {
    objectId: string,
    newValueRaw: string,
    oldValueRaw: string,
    formatter: (string) => string
}

export interface IDynamicLabelValueChangeEvent {
    (args: IDynamicLabelValueChangeEventArgs): boolean;
}

class DynamicLabelProps {
    public id: string;
    public value?: string;

    public inputType: DynamicLabelType;

    public iconClassName: string;
    public onValueChange?: IDynamicLabelValueChangeEvent
}

export class DynamicLabel extends React.Component<DynamicLabelProps, any> {
    constructor(props: DynamicLabelProps) {
        super(props);
    }

    /**
     * The label element.
     * @return {JQuery<TElement>} The jQuery element.
     */
    private $label() {
        return $("#dynamicLabelLabel_" + this.props.id);
    }

    /**
     * The input container element.
     * @return {JQuery<TElement>} The jQuery element.
     */
    private $inputContainer() {
        return $("#dynamicLabelInputContainer_" + this.props.id);
    }

    /**
     * The input element.
     * @return {JQuery<TElement>} The jQuery element.
     */
    private $input() {
        return $("#dynamicLabelInput_" + this.props.id);
    }

    /**
     * Switch the control to edit mode and focus the input field.
     */
    private switchToEditMode(): void {
        this.$inputContainer().show();
        this.$input().val(this.props.value);
        this.$label().hide();
        this.$input().focus();
    }

    /**
     * Switch the control to label mode.
     */
    private switchToLabelMode(): void {
        this.clearValidationError();

        this.$inputContainer().hide();
        this.$label().show();
    }

    /**
     * Save any changes that have been made in edit mode. Assume that the DL input field currently has the value we
     * want to save.
     *
     * @return {boolean} Whether validation passed when saving the changes. This is based on the label type validator
     *                   and any additional validation by the owning control in its onValueChange. True if we
     *                   successfully saved the changes. False if we could not save the changes and should raise a
     *                   validation error.
     */
    private saveChanges(): boolean {
        let userInput: string = this.$input().val() as string;
        userInput = userInput.trim(); // There's really no convincing use case for leading or trailing spaces.

        let oldValueFormatted: string = this.props.value;
        let oldValueRaw: string = DynamicLabelHelpers.unformat(oldValueFormatted, this.props.inputType);

        // First, try to un-format the user's input. It might evaluate to "" if they just put in some junk that couldn't
        // be unformatted. This is fine and we'll treat it as if they tried to clear out the field.
        let newValueRaw: string = DynamicLabelHelpers.unformat(userInput, this.props.inputType);

        if (!this.validateChange(newValueRaw)) {
            return false;
        }

        // Raise event up the chain so the host can do additional validation and save the change. Might still be invalid
        // at this point.
        if (!this.props.onValueChange(
                {
                    objectId: this.props.id,
                    newValueRaw,
                    oldValueRaw,
                    formatter: DynamicLabelHelpers.getFormatter(this.props.inputType)
                }
            )) {
            return false;
        }

        return true;
    }

    /**
     * Validate a change that is being made to the value of this DL. First, we call the generic validator for this type
     * of field to rule out obvious errors. Then, we do local validation in case we want to compare against e.g. the
     * previous value or something known only to this control.
     *
     * @param   newValue The value to try to set.
     * @return {boolean} Whether this is an acceptable change. True if we pass generic and local validation.
     *                   False otherwise.
     */
    private validateChange(newValue: string): boolean {
        let oldValue: string = this.props.value;


        if (!DynamicLabelHelpers.validateGenericValue(newValue, this.props.inputType)) {
            return false;
        }

        // TODO: Any local validation based on things only this control knows about.

        return true;
    }

    /**
     * Mark the field as having a validation error.
     */
    private raiseValidationError(): void {

    }

    /**
     * Clear the validation error from the field.
     */
    private clearValidationError(): void {

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
            this.raiseValidationError();
        }

    }

    private editModeBlur(e): void {
        if (this.saveChanges()) {
            this.switchToLabelMode();
        } else {
            this.raiseValidationError();
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