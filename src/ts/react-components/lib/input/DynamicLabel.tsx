import * as React from "react";
import {DynamicLabelHelpers, DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";


export interface IDynamicLabelValueChangeEventArgs<typeOfRawValue> {
    objectId: string,
    newValueRaw: typeOfRawValue,
    oldValueRaw: typeOfRawValue,
    formatter: (string) => string
}

export interface IDynamicLabelValueChangeEvent<typeOfRawValue> {
    (args: IDynamicLabelValueChangeEventArgs<typeOfRawValue>): boolean;
}

export class DynamicLabelProps<typeOfRawValue> {
    public elementId: string;
    public objectId: string;
    public value?: string;
    public selectValues?: string[];
    public ghostText: string;

    public inputType: DynamicLabelType;

    public iconClassName: string;
    public onValueChange?: IDynamicLabelValueChangeEvent<typeOfRawValue>
}

export class DynamicLabel<typeOfRawValue> extends React.Component<DynamicLabelProps<typeOfRawValue>, any> {
    constructor(props: DynamicLabelProps<typeOfRawValue>) {
        super(props);
    }

    /**
     * The label element.
     * @return {JQuery<TElement>} The jQuery element.
     */
    private $label() {
        return $("#dynamicLabelLabel_" + this.props.elementId);
    }

    /**
     * The input container element.
     * @return {JQuery<TElement>} The jQuery element.
     */
    private $inputContainer() {
        return $("#dynamicLabelInputContainer_" + this.props.elementId);
    }

    /**
     * The input element.
     * @return {JQuery<TElement>} The jQuery element.
     */
    private $input() {
        return $("#dynamicLabelInput_" + this.props.elementId);
    }

    /**
     * Switch the control to edit mode and focus the input field.
     */
    private switchToEditMode(): void {
        // If we don't have any choices as a select, don't let user change to edit mode.
        if (this.props.inputType === DynamicLabelType.SELECT && (!this.props.selectValues || this.props.selectValues.length === 0)) {
            return;
        }

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
        if (userInput === null) {
            return true; // Just silently eat this... Likely case for selecting nothing on a dropdown.
        }

        userInput = userInput.trim(); // There's really no convincing use case for leading or trailing spaces.

        let oldValueFormatted: string = this.props.value;
        let oldValueRaw: typeOfRawValue = DynamicLabelHelpers.unformat<typeOfRawValue>(oldValueFormatted, this.props.inputType);

        // First, try to un-format the user's input. It might evaluate to "" if they just put in some junk that couldn't
        // be unformatted. This is fine and we'll treat it as if they tried to clear out the field.
        let newValueRaw: typeOfRawValue = DynamicLabelHelpers.unformat<typeOfRawValue>(userInput, this.props.inputType);

        if (!this.validateChange(newValueRaw)) {
            return false;
        }

        // Raise event up the chain so the host can do additional validation and save the change. Might still be invalid
        // at this point.
        if (!this.props.onValueChange(
                {
                    objectId: this.props.objectId,
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
    private validateChange(newValue: typeOfRawValue): boolean {
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
        // Maybe we are blurring because we're being switched into label mode (e.g. we were in the field and hit enter).
        // In this case, don't try to save because we've already gone through the process.
        if (!this.$inputContainer().is(":visible")) {
            return;
        }

        if (this.saveChanges()) {
            this.switchToLabelMode();
        } else {
            this.raiseValidationError();
        }
    }

    /**
     * Just for the selection style input, when the value is changed attempt to save it.
     * @param e The event.
     */
    private editModeChange(e): void {
        if (this.saveChanges()) {
            this.switchToLabelMode();
        } else {
            this.raiseValidationError();
        }
    }


    render() {

        let inputComponent = null;
        let labelComponent = null;

        if (this.props.inputType !== DynamicLabelType.SELECT) {
            inputComponent =

                <input
                    id={"dynamicLabelInput_" + this.props.elementId}

                    className="input"
                    type={DynamicLabelHelpers.mapTypeToInputTypeAttr(this.props.inputType)}

                    onKeyDown={e => {
                        this.editModeKeyDown(e);
                    }}
                    onBlur={e => {
                        this.editModeBlur(e);
                    }}
                />


        } else {
            // TODO: should really key these off of something unique.. oh well, current assumption is that selectValues
            // is all unique.

            let selectComponents = this.props.selectValues.map((val: string): any => {
                return <option key={val}>{val}</option>
            });

            inputComponent =
                <div className="select">
                    <select
                        id={"dynamicLabelInput_" + this.props.elementId}

                        onChange={e => {
                            this.editModeChange(e);
                        }}
                        onBlur={e => {
                            this.editModeBlur(e);
                        }}

                    >

                        {selectComponents}
                    </select>
                </div>
        }


        let labelInnerText = null;
        let labelInnerClasses = "";

        if (this.props.value == null || this.props.value === "") {
            labelInnerText = this.props.ghostText;
            labelInnerClasses = "has-text-grey";
        } else {
            labelInnerText = this.props.value;
        }

        labelComponent =
                <span>
                    <span className="icon">
                        <i className={"fa " + this.props.iconClassName}> </i>
                    </span>
                    <span className={labelInnerClasses}>{labelInnerText}</span>
                </span>;

        return (
            <div>
                <p
                    id={"dynamicLabelLabel_" + this.props.elementId}

                    className="label cw-dynamicLabel"
                    tabIndex={0}

                    onClick={e => {
                        this.labelClick(e);
                    }}
                    onKeyDown={e => {
                        this.labelKeyDown(e);
                    }}
                >
                    {labelComponent}
                </p>
                <div
                    id={"dynamicLabelInputContainer_" + this.props.elementId}

                    className="control has-icons-left"
                    style={{display: "none"}}
                >
                    {inputComponent}
                    <span
                        className="icon is-left">
                        <i className={"fa " + this.props.iconClassName}> </i>
                    </span>
                </div>
            </div>
        );
    }
}