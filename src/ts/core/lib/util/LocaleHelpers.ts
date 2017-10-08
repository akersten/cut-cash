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
}
