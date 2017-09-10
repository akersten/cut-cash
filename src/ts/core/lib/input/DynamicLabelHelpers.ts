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
     * Entry point from a DynamicLabel to validate its new value against generic rules for that value type.
     *
     * @param   newValue The raw value trying to be set.
     * @param       type The type of DL this is.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    public static validateGenericValue<typeOfRawValue>(newValue: typeOfRawValue, type: DynamicLabelType): boolean {
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
                return true;
        }
    }

    /**
     * Validate a string being input into a DynamicLabel. Not much validation to do here, maybe in the future we'll
     * validate things like {no emoji} or {no crazy combinational characters that create giant avalanches of text}.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericText<typeOfRawValue>(newValue: typeOfRawValue): boolean {
        return true;
    }

    /**
     * Validate a selection being made for a DynamicLabel.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericSelection<typeOfRawValue>(newValue: typeOfRawValue): boolean {
        return true;
    }

    /**
     * Validate a number being input into a DynamicLabel. Check things like whether this is actually a number.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericNumber<typeOfRawValue>(newValue: typeOfRawValue): boolean {
        //TODO: Validate
        return true;
    }

    /**
     * Validate a date being input into a DynamicLabel. Make sure this can actually be parsed when we go to format the
     * date.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericDate<typeOfRawValue>(newValue: typeOfRawValue): boolean {
        // TODO: Validate
        return true;
    }

    private static validateGenericCurrency<typeOfRawValue>(newValue: typeOfRawValue): boolean {
        // TODO: Validate
        return true;
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
     * @param     value A formatted or raw value.
     * @param      type The type of DL.
     * @return {string} An unformatted version of the value.
     */
    public static unformat<typeOfRawValue>(value: string, type: DynamicLabelType): typeOfRawValue {
        switch (type) {
            case DynamicLabelType.NUMBER:
                // TODO: Parse out commas
                return <typeOfRawValue><any>value;
            case DynamicLabelType.DATE:
                // There are lots of ways to represent a date. Try to put it in the standard format given by the Date
                // object..
                // TODO: unformat
                return <typeOfRawValue><any>value;
            case DynamicLabelType.CURRENCY:
                // TODO: Parse
                return <typeOfRawValue><any>value;
            default:
                return <typeOfRawValue><any>value;
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
