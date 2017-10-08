import {LocaleHelpers} from "./LocaleHelpers";
/**
 * Created by akersten on 10/8/17.
 */

export class FormatHelpers {

    /**
     * Does any special formatting for user-entered text. Don't think there's much we need to do here.
     *
     * @param  rawValue The raw value to format.
     * @return {string} The formatted value.
     */
    public static formatText(rawValue: string): string {
        return rawValue;
    }

    /**
     * Does any special formatting for a user-entered number. Don't think there's much we need to do here other than
     * add group separators.
     *
     * @param  rawValue The raw value to format.
     * @return {string} The formatted value.
     */
    public static formatNumber(rawValue: string): string {
        if (rawValue === null || rawValue.length === 0) {
            return "";
        }

        return (parseFloat(rawValue)).toLocaleString(LocaleHelpers.getLocaleString());
    }

    /**
     * Does any special formatting for user-entered date. Remember, this is a Unix time that we need to format.
     *
     * @param  rawValue The raw value to format.
     * @return {string} The formatted value.
     */
    public static formatDate(rawValue: string): string {
        //TODO: From our standard raw value format, we need to return something pleasant to the user.
        return rawValue;
    }

    /**
     * Does any special formatting for user-entered currency. Add group separators and currency symbol. Remember, the
     * raw value of currency is an integer number of the lowest fractional denomination (e.g. cents).
     *
     * @param  rawValue The raw value to format.
     * @return {string} The formatted value.
     */
    public static formatCurrency(rawValue: string): string {
        if (rawValue === null || rawValue.length === 0) {
            return "";
        }

        let divisor: number = Math.pow(10, LocaleHelpers.getCurrencyDecimalPlaces());
        return (parseFloat(rawValue) / divisor).toLocaleString(LocaleHelpers.getLocaleString(), {style: "currency", currency: LocaleHelpers.getLocaleCurrencyString()});
    }
}