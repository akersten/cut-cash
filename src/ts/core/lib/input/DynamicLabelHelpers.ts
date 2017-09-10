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
            case DynamicLabelType.TEXT:
                return "";
            case DynamicLabelType.NUMBER:
                return "";
            case DynamicLabelType.SELECT:
                return ""; // It's actually special HTML for this one, not just putting something in the type attribute.
        }
    }

    /**
     * Entry point from a DynamicLabel to validate its new value against generic rules for that value type.
     *
     * @param   newValue The raw value trying to be set.
     * @param       type The type of DL this is.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    public static validateGenericValue(newValue: string, type: DynamicLabelType): boolean {
        switch (type) {
            case DynamicLabelType.DATE:
                return this.validateGenericDate(newValue);
            case DynamicLabelType.NUMBER:
                return this.validateGenericNumber(newValue);
            case DynamicLabelType.SELECT:
                return this.validateGenericSelection(newValue);
            case DynamicLabelType.TEXT:
                return this.validateGenericText(newValue);

        }
    }

    /**
     * Validate a string being input into a DynamicLabel. Not much validation to do here, maybe in the future we'll
     * validate things like {no emoji} or {no crazy combinational characters that create giant avalanches of text}.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericText(newValue: string): boolean {
        return true;
    }

    /**
     * Validate a selection being made for a DynamicLabel.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericSelection(newValue: string): boolean {
        return true;
    }
    /**
     * Validate a number being input into a DynamicLabel. Check things like whether this is actually a number.
     *
     * @param   newValue The value trying to be set.
     * @return {boolean} Whether this is an acceptable value for this type of DL.
     */
    private static validateGenericNumber(newValue: string): boolean {
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
    private static validateGenericDate(newValue: string): boolean {
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
    public static format(rawValue: string, type: DynamicLabelType): string {
        switch (type) {
            case DynamicLabelType.TEXT:
                return rawValue;
            case DynamicLabelType.NUMBER:
                return rawValue;
            case DynamicLabelType.DATE:
                // Given a date object,
                // TODO: format
                return rawValue;
            case DynamicLabelType.SELECT:
                return rawValue;
        }
    }

    /**
     * Given a value and a type, remove any formatting that may be present.
     *
     * @param     value A formatted or raw value.
     * @param      type The type of DL.
     * @return {string} An unformatted version of the value.
     */
    public static unformat(value: string, type: DynamicLabelType): string {
        switch (type) {
            case DynamicLabelType.TEXT:
                return value;
            case DynamicLabelType.NUMBER:
                return value;
            case DynamicLabelType.DATE:
                // There are lots of ways to represent a date. Try to put it in the standard format given by the Date
                // object..
                // TODO: unformat
                return value;
            case DynamicLabelType.SELECT:
                return value;
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
