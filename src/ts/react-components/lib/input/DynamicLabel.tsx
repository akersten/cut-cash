import * as React from "react";
import {
    DynamicLabelHelpers, DynamicLabelType, ParseResult,
    ValidationResult
} from "../../../core/lib/input/DynamicLabelHelpers";
import {IDynamicLabelListSelectable} from "./IDynamicLabelListSelectable";


export interface IDynamicLabelValueChangeEventArgs<typeOfRawValue> {
    objectId: string,
    newValueRaw: typeOfRawValue,
    oldValueRaw: typeOfRawValue,
    formatter: (typeOfRawValue) => string
}

export interface IDynamicLabelValueChangeEvent<typeOfRawValue> {
    (args: IDynamicLabelValueChangeEventArgs<typeOfRawValue>): ValidationResult;
}

export class DynamicLabelProps<typeOfRawValue> {
    public elementId: string;
    public objectId: string;

    public value: string;                                // The formatted value to display, in non-select mode.

    public valueObject: IDynamicLabelListSelectable;     // A selected item from the selectValues list, in select mode.
    public selectValues?: IDynamicLabelListSelectable[]; // The options for selection in select mode.

    public ghostText: string;

    public inputType: DynamicLabelType;

    public iconClassName?: string;
    public onValueChange?: IDynamicLabelValueChangeEvent<typeOfRawValue>;
    public maxLength?: number;
}

export class DynamicLabel<typeOfRawValue> extends React.Component<DynamicLabelProps<typeOfRawValue>, any> {
    constructor(props: DynamicLabelProps<typeOfRawValue>) {
        super(props);
    }

    //#region Selectors

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
     * The warning icon element for a validation warning.
     * @return {JQuery<TElement>} The jQuery element.
     */
    private $validationWarningIcons() {
        return this.$inputContainer().find(".cw-dynamicLabel-validation-icon-warning");
    }

    /**
     * The help text element for a validation warning.
     * @return {JQuery<IElement>} The jQuery element.
     */
    private $validationWarningHelp() {
        return this.$inputContainer().parent().find(".cw-dynamicLabel-validation-help-warning");
    }

    //#endregion

    //#region Local state mutators

    /**
     * Switch the control to edit mode and focus the input field.
     */
    private switchToEditMode(): void {
        // If we don't have any choices as a select, don't let user change to edit mode.
        if (this.props.inputType === DynamicLabelType.SELECT && (!this.props.selectValues || this.props.selectValues.length === 0)) {
            return;
        }

        this.$inputContainer().show();

        if (this.props.inputType === DynamicLabelType.SELECT) {
            if (this.props.valueObject && this.props.valueObject.getId()) {
                this.$input().val(this.props.valueObject.getId());
            } else {
                this.$input().val("");
            }
        } else {
            this.$input().val(this.props.value);
        }

        this.$label().hide();
        this.$input().focus();
        this.$input().select(); // Default-highlight the input so it's easy to change without having to click again.
    }

    /**
     * Switch the control to label mode. Assumes validation has already been done and we have no errors preventing the
     * switch.
     */
    private switchToLabelMode(): void {
        this.clearValidationErrors();

        this.$inputContainer().hide();
        this.$label().show();
    }

    /**
     * Called when the user action is to update the value from edit mode. We'll do validation and try to save the input.
     */
    private attemptSaveAndSwitchToLabelMode(): void {
        this.clearValidationErrors();

        let saveChangesValidationResult: ValidationResult = this.saveChanges();

        if (saveChangesValidationResult.isValid()) {
            this.switchToLabelMode();
        } else {
            this.raiseValidationError(saveChangesValidationResult);
        }
    }

    //#endregion

    //#region Saving and validation

    /**
     * Save any changes that have been made in edit mode. Assume that the DL input field currently has the value we
     * want to save.
     *
     * @return {ValidationResult} Whether validation passed when saving the changes. This is based on the label type
     *                            validator and any additional validation by the owning control in its onValueChange.
     *                            True if we successfully saved the changes. False if we could not save the changes and
     *                            should raise a validation error.
     */
    private saveChanges(): ValidationResult {
        let userInput: string = null;

        if (this.props.inputType === DynamicLabelType.SELECT) {
            userInput = this.$input().find(":selected").val() as string;
        } else {
            userInput = this.$input().val() as string;
        }

        if (typeof userInput === "undefined" || userInput === null) {
            return new ValidationResult(true); // Just silently eat this... Likely case for selecting nothing on a dropdown.
        }

        userInput = userInput.trim(); // There's really no convincing use case for leading or trailing spaces.

        let oldValueFormatted: string = null;

        if (this.props.inputType === DynamicLabelType.SELECT) {
            if (this.props.valueObject) {
                oldValueFormatted = this.props.valueObject.getName();
            }
        } else {
            oldValueFormatted = this.props.value;
        }

        let oldValueParseResult: ParseResult<typeOfRawValue> = DynamicLabelHelpers.parse<typeOfRawValue>(oldValueFormatted, this.props.inputType);

        if (!oldValueParseResult.wasSuccessful()) {
            // TODO: There probably isn't a way for the user to fix this - what to do in that scenario? We'll just have an un-editable field.
            return new ValidationResult(false, "Previous value could not be parsed.");
        }

        let oldValueRaw: typeOfRawValue = oldValueParseResult.getRawValue();

        // First, try to un-format the user's input. It might evaluate to "" if they just put in some junk that couldn't
        // be unformatted. This is fine and we'll treat it as if they tried to clear out the field.
        let newValueParseResult: ParseResult<typeOfRawValue> = DynamicLabelHelpers.parse<typeOfRawValue>(userInput, this.props.inputType);

        if (!newValueParseResult.wasSuccessful()) {
            return new ValidationResult(false, newValueParseResult.getMessage());
        }

        let newValueRaw: typeOfRawValue = newValueParseResult.getRawValue();

        let validateChangeResult = this.validateChange(newValueRaw);

        if (!validateChangeResult.isValid()) {
            return validateChangeResult;
        }


        if (this.props.inputType === DynamicLabelType.SELECT) {
            // Map newValueRaw (which was previously the key) to the actual object.
            let selection: IDynamicLabelListSelectable[] = this.props.selectValues.filter(
                (item: IDynamicLabelListSelectable): boolean => {
                    return item.getId() === newValueRaw as any as string;
                }
            );

            if (selection.length > 0) {
                newValueRaw = selection[0] as any as typeOfRawValue;
            } else {
                newValueRaw = null;
            }
        }

        // Raise event up the chain so the host can do additional validation and save the change. Might still be invalid
        // at this point.
        let higherOrderValidationResult: ValidationResult = this.props.onValueChange(
            {
                objectId: this.props.objectId,
                newValueRaw,
                oldValueRaw,
                formatter: DynamicLabelHelpers.getFormatter(this.props.inputType)
            }
        );

        if (!higherOrderValidationResult.isValid()) {
            return higherOrderValidationResult;
        }

        return new ValidationResult(true);
    }

    /**
     * Validate a change that is being made to the value of this DL. First, we call the generic validator for this type
     * of field to rule out obvious errors. Then, we do local validation in case we want to compare against e.g. the
     * previous value or something known only to this control.
     *
     * This is mostly about bounds/sanity checking - the actual parse for e.g. valid characters happens earlier.
     *
     * @param            newValue The value to try to set.
     * @return {ValidationResult} Whether this is an acceptable change. True if we pass generic and local validation.
     *                            False otherwise, with a corresponding message..
     */
    private validateChange(newValue: typeOfRawValue): ValidationResult {
        if (this.props.inputType === DynamicLabelType.SELECT) {
            return new ValidationResult(true);
        }

        let genericValidationResult: ValidationResult = DynamicLabelHelpers.validateGenericValue(newValue, this.props.inputType);

        if (!genericValidationResult.isValid()) {
            return genericValidationResult;
        }

        // TODO: Any local validation based on things only this control knows about.

        return new ValidationResult(true);
    }

    /**
     * Mark the field as having a validation error.
     *
     * A braver person than I would make this part of the React state and have it automatically appear in the DOM, but
     * it seems way too specific to this control to have it exist in global state like that.
     */
    private raiseValidationError(validationResult: ValidationResult): void {
        this.$validationWarningHelp().show();
        this.$validationWarningHelp().text(validationResult.getMessage());
        this.$validationWarningIcons().show();
        this.$input().addClass("is-danger");
    }

    /**
     * Clear the validation error from the field.
     */
    private clearValidationErrors(): void {
        this.$validationWarningHelp().hide();
        this.$validationWarningHelp().text("");
        this.$validationWarningIcons().hide();
        this.$input().removeClass("is-danger");
    }

    //#endregion

    //#region Event listeners

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

        this.attemptSaveAndSwitchToLabelMode();
    }

    private editModeBlur(e): void {
        // Maybe we are blurring because we're being switched into label mode (e.g. we were in the field and hit enter).
        // In this case, don't try to save because we've already gone through the process.
        if (!this.$inputContainer().is(":visible")) {
            return;
        }

        this.attemptSaveAndSwitchToLabelMode();
    }

    /**
     * Just for the selection style input, when the value is changed attempt to save it.
     * @param e The event.
     */
    private editModeChange(e): void {
        this.attemptSaveAndSwitchToLabelMode();
    }

    //#endregion

    //#region React generators and helpers

    /**
     * Generates the read-only portion of the control.
     */
    private generateLabelComponent() {
        let ret = null;
        let extraLabelContent = null;
        let labelInnerText = null;
        let labelIconContent = null;
        let labelInnerClasses = "";

        if (this.props.inputType === DynamicLabelType.SELECT) {
            if (this.props.valueObject && this.props.valueObject.getName()) {
                labelInnerText = this.props.valueObject.getName();
            } else {
                labelInnerText = this.props.ghostText;
                labelInnerClasses = "has-text-grey";
            }
        } else {
            if (this.props.value == null || this.props.value === "") {
                labelInnerText = this.props.ghostText;
                labelInnerClasses = "has-text-grey";
            } else {
                labelInnerText = this.props.value;
            }
        }


        if (this.props.iconClassName) {
            labelIconContent =
                <span className="icon">
                        <i className={"fa " + this.props.iconClassName}> </i>
                </span>;
        }

        ret =
            <span>
                {labelIconContent}
                <span className={labelInnerClasses}>{labelInnerText}</span>
                {extraLabelContent}
            </span>;

        return ret;
    }

    /**
     * Generates the input portion of the control.
     */
    private generateInputComponent() {
        let ret = null;
        if (this.props.inputType !== DynamicLabelType.SELECT) {
            ret =

                <input
                    id={"dynamicLabelInput_" + this.props.elementId}

                    className="input"
                    maxLength={this.props.maxLength ? this.props.maxLength : -1}
                    type={DynamicLabelHelpers.mapTypeToInputTypeAttr(this.props.inputType)}

                    onKeyDown={e => {
                        this.editModeKeyDown(e);
                    }}
                    onBlur={e => {
                        this.editModeBlur(e);
                    }}
                />


        } else {
            let selectComponents = this.props.selectValues.map((val: IDynamicLabelListSelectable): any => {
                return <option key={val.getId()} value={val.getId()}>{val.getName()}</option>
            });

            ret =
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

        return ret;
    }

    render() {
        let labelComponent = this.generateLabelComponent();
        let inputComponent = this.generateInputComponent();

        let inputIconContent = null;
        let inputValidationIconContent = null;
        let inputClasses = "control";

        if (this.props.iconClassName) {
            inputIconContent =
                <span className="icon is-left">
                    <i className={"fa " + this.props.iconClassName}> </i>
                </span>;
            inputClasses += " has-icons-left";
        }

        inputValidationIconContent =
            <span className="icon is-right cw-dynamicLabel-validation-icon-warning" style={{display: "none"}}>
                <i className="fa fa-warning"> </i>
            </span>;
        inputClasses += " has-icons-right";

        return (
            <div className="cw-dynamicLabelContainer">
                <p
                    id={"dynamicLabelLabel_" + this.props.elementId}

                    className="label cw-dynamicLabelLabel"
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

                    className={inputClasses}
                    style={{display: "none"}}
                >
                    {inputComponent}
                    {inputIconContent}
                    {inputValidationIconContent}
                </div>
                <p className="help is-danger cw-dynamicLabel-validation-help-warning" style={{display: "none"}}></p>
            </div>
        );
    }

    //#endregion
}