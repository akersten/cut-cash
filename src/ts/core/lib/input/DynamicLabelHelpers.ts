/**
 * Created by akersten on 9/9/17.
 */


/**
 * The types of input that a DynamicLabel can support.
 */
export const enum DynamicLabelType {
    TEXT,
    NUMBER,
    DATE,
    CURRENCY,
    SELECT,
}

export class DynamicLabelHelpers {

    /**
     *
     * @param type
     * @return {string}
     */
    public static mapTypeToInputTypeAttr(type: DynamicLabelType): string {
        switch (type) {
            case DynamicLabelType.DATE:
                return "Date";
            case DynamicLabelType.SELECT:
                return ""; // It's actually special HTML for this one, not just putting something in the type attribute.
            default:
                return "";
        }
    }

    /**
     * Entry point from a DynamicLabel to validate its new value against generic rules for that value type. The new
     * value here should be an unformatted value, but post-parse (so any logic like converting syntactic sugar has
     * already run).
     *
     * @param            newValue The raw value trying to be set.
     * @param                type The type of DL this is.
     * @return {ValidationResult} Whether this is an acceptable value for this type of DL.
     */
    public static validateGenericValue<typeOfRawValue>(newValue: typeOfRawValue, type: DynamicLabelType): ValidationResult {
        switch (type) {
            case DynamicLabelType.DATE:
                return this.validateGenericDate<typeOfRawValue>(newValue);
            case DynamicLabelType.NUMBER:
                return this.validateGenericNumber<typeOfRawValue>(newValue);
            case DynamicLabelType.SELECT:
                return this.validateGenericSelection<typeOfRawValue>(newValue);
            case DynamicLabelType.TEXT:
                return this.validateGenericText<typeOfRawValue>(newValue);
            case DynamicLabelType.CURRENCY:
                return this.validateGenericCurrency<typeOfRawValue>(newValue);
            default:
                return new ValidationResult(true);
        }
    }

    /**
     * Validate a string being input into a DynamicLabel. Not much validation to do here, maybe in the future we'll
     * validate things like {no emoji} or {no crazy combinational characters that create giant avalanches of text}.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericText<typeOfRawValue>(newValue: typeOfRawValue): ValidationResult {
        // TODO: Prevent emoji and crazy combinational characters
        return new ValidationResult(true);
    }

    /**
     * Validate a selection being made for a DynamicLabel.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericSelection<typeOfRawValue>(newValue: typeOfRawValue): ValidationResult {
        return new ValidationResult(true);
    }

    /**
     * Validate a number being input into a DynamicLabel. Check things like whether this is actually a number.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericNumber<typeOfRawValue>(newValue: typeOfRawValue): ValidationResult {
        //TODO: Validate
        let testVal = <string><any> newValue;

        if (testVal.length === 0) {
            return new ValidationResult(true);
        }

        if (!/^-{0,1}\d+$/.test(testVal)) {
            return new ValidationResult(false, "Not a valid number.");
        }

        return new ValidationResult(true);
    }

    /**
     * Validate a date being input into a DynamicLabel. Make sure this can actually be parsed when we go to format the
     * date.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericDate<typeOfRawValue>(newValue: typeOfRawValue): ValidationResult {
        // TODO: Validate
        return new ValidationResult(true);
    }

    private static validateGenericCurrency<typeOfRawValue>(newValue: typeOfRawValue): ValidationResult {
        // TODO: Validate
        return new ValidationResult(true);
    }


    /**
     * Format a raw value for display. This will not check if the value is already formatted.
     *
     * @param  rawValue The raw value of this type.
     * @param      type The type of DL.
     * @return {string} A formatted version of the raw value.
     */
    public static format<typeOfRawValue>(rawValue: typeOfRawValue, type: DynamicLabelType): string {
        switch (type) {
            case DynamicLabelType.TEXT:
                return <string><any>rawValue;
            case DynamicLabelType.NUMBER:
                return <string><any>rawValue;
            case DynamicLabelType.DATE:
                // Given a date object,
                // TODO: format
                return <string><any>rawValue;
            case DynamicLabelType.SELECT:
                return <string><any>rawValue;
            case DynamicLabelType.CURRENCY:
                // TODO: format
                return <string><any>rawValue;
            default:
                return <string><any>rawValue;
        }
    }

    /**
     * Given a value and a type, remove any formatting that may be present. Fix up the value too (e.g. round currency or
     * interpret short dates) since the return value here is what is used as the new user-specified raw value.
     *
     * @param          value A formatted or raw value.
     * @param           type The type of DL.
     * @return {ParseResult} An unformatted version of the value, with metadata indicating if it was successfully parsed
     *                       or the input was malformed.
     */
    public static parse<typeOfRawValue>(value: string, type: DynamicLabelType): ParseResult<typeOfRawValue> {
        switch (type) {
            case DynamicLabelType.NUMBER:
                // TODO: Parse out commas

                return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>value);
            case DynamicLabelType.DATE:
                // There are lots of ways to represent a date. Try to put it in the standard format given by the Date
                // object..
                // TODO: unformat
                return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>value);
            case DynamicLabelType.CURRENCY:
                // TODO: Parse
                return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>value);
            default:
                return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>value);
        }
    }

    /**
     * Constructs a formatter object to be used by upstream validation functions after receiving a raw value that has
     * been validated generically. This formatter will be used to generate the value for display.
     *
     * @param type
     * @return {(rawValue:string)=>string}
     */
    public static getFormatter(type: DynamicLabelType): (string) => string {
        return (rawValue: string) => {
            return this.format(rawValue, type);
        }
    }
}

export class ParseResult<typeOfRawValue> {
    private success: boolean;
    private rawValue: typeOfRawValue;

    constructor(success: boolean, rawValue: typeOfRawValue) {
        this.success = success;
        this.rawValue = rawValue;
    }

    /**
     * Determine if this parse was successful.
     *
     * @return {boolean} True if the raw value associated with this parse was the result of a successful parse. False
     *                   otherwise.
     */
    wasSuccessful(): boolean {
        return this.success;
    }

    getRawValue(): typeOfRawValue {
        return this.rawValue;
    }

}

export class ValidationResult {
    private valid: boolean;
    private message: string;

    constructor(valid: boolean, message?: string) {
        this.valid = valid;
        this.message = message;
    }

    /**
     * Determine if there were any problems during the validation.
     *
     * @return {boolean} True if there is nothing to alert the user about regarding validation. False if there is a
     *                   validation message for the user.
     */
    isValid(): boolean {
        return this.valid;
    }

    /**
     * Return the validation message for the user to see.
     *
     * @return {string} The validation message for the user.
     */
    getMessage(): string {
        return this.message;
    }
}