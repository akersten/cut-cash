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
     * Does any special formatting for a user-entered number. Don't think there's much we need to do here.
     *
     * @param  rawValue The raw value to format.
     * @return {string} The formatted value.
     */
    public static formatNumber(rawValue: string): string {
        return rawValue;
    }

    /**
     * Does any special formatting for user-entered date.
     *
     * @param  rawValue The raw value to format.
     * @return {string} The formatted value.
     */
    public static formatDate(rawValue: string): string {
        //TODO: From our standard raw value format, we need to return something pleasant to the user.
        return rawValue;
    }

    /**
     * Does any special formatting for user-entered currency.
     *
     * @param  rawValue The raw value to format.
     * @return {string} The formatted value.
     */
    public static formatCurrency(rawValue: string): string {

        return rawValue;
    }
}