/**
 * Created by akersten on 10/8/17.
 */


export class LocaleHelpers {

    /**
     * Determine the decimal separator of the current platform.
     *
     * @return {string} The decimal separator of the current platform.
     */
    public static getDecimalSeparator(): string {
        return /^1(.+)1$/.exec(1.1.toLocaleString())[1];
    }

    /**
     * Determine the group separator of the current platform.
     *
     * We don't have a good way to detect this, so for now it's always ,.
     *
     * @return {string} The group separator of the current platform.
     */
    public static getGroupSeparator(): string {
        return ",";
    }


    /**
     * Determine the currency symbol of the current platform. For now, it's always $. We don't have a standard way of
     * determining this in JavaScript. Once there is one, we can switch to supporting it.
     *
     * @return {string} The currency symbol of the current platform.
     */
    public static getCurrencySymbol(): string {
        return "$";
    }

    /**
     * Determine the number of currency symbol decimal places for the current platform. We don't have a standard way of
     * determining this in JavaScript. Once there is one, we can switch to supporting it. For now, it's always 2.
     *
     * @return {number} The number of currency decimal places of the current platform.
     */
    public static getCurrencyDecimalPlaces(): number {
        return 2;
    }

    /**
     * Returns the locale (e.g. en-US) of the current platform.
     *
     * Right now we don't have a good way to detect this, so for now it's always en-US.
     *
     * @return {string} The locale string of the current platform.
     */
    public static getLocaleString(): string {
        return "en-US";
    }

    /**
     * Returns the locale currency string (e.g. USD) of the current platform.
     *
     * Right now we don't have a good way to detect this, so for now it's always USD.
     *
     * @return {string} The locale string of the current platform.
     */
    public static getLocaleCurrencyString(): string {
        return "USD";
    }

}
