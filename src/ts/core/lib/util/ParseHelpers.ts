import {ParseResult} from "../input/DynamicLabelHelpers";
import {RegExHelpers} from "./RegExHelpers";
import {LocaleHelpers} from "./LocaleHelpers";
/**
 * Created by akersten on 10/8/17.
 */
export class ParseHelpers {

    public static parseNumber<typeOfRawValue>(userInput: string): ParseResult<typeOfRawValue> {
        if (userInput === null || userInput.length === 0) {
            return new ParseResult(true, null);
        }

        userInput = userInput + ""; // JS decides this is a number at some point, so force it to a string.

        let numberRegEx: RegExp = new RegExp("^-?(\\d|" + RegExHelpers.escape(LocaleHelpers.getGroupSeparator()) + ")+(" + RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()) + "\\d+)?$");
        if (!numberRegEx.test(userInput)) {
            return new ParseResult(false, null, "Not a valid number.");
        }

        let replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getGroupSeparator()), "g");
        userInput = userInput.replace(replaceRegEx, "");

        // Convert decimal separator to period
        replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()), "g");
        userInput = userInput.replace(replaceRegEx, ".");

        return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>parseFloat(userInput));
    }

    public static parseCurrency<typeOfRawValue>(userInput: string): ParseResult<typeOfRawValue> {
        if (userInput === null || userInput.length === 0) {
            return new ParseResult(true, null);
        }

        userInput = userInput + ""; // JS decides this is a number at some point, so force it to a string.

        let currencyRegEx = new RegExp("^-?\\s*" + RegExHelpers.escape(LocaleHelpers.getCurrencySymbol()) + "?\\s*(\\d|" + RegExHelpers.escape(LocaleHelpers.getGroupSeparator()) + ")+(" + RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()) + "\\d{" + LocaleHelpers.getCurrencyDecimalPlaces() + "})?\\s*" + RegExHelpers.escape(LocaleHelpers.getCurrencySymbol()) + "?$");
        if (!currencyRegEx.test(userInput)) {
            return new ParseResult(false, null, "Not a valid currency amount.");
        }

        // Strip out formatting characters (currency symbol and comma separator).
        let replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getCurrencySymbol()), "g");
        userInput = userInput.replace(replaceRegEx, "");

        replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getGroupSeparator()), "g");
        userInput = userInput.replace(replaceRegEx, "");

        // Convert decimal separator to period
        replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()), "g");
        userInput = userInput.replace(replaceRegEx, ".");

        // We don't want to store currency as float. We'll store an integer amount of the lowest denomination (e.g.
        // cents). Piece out the whole value, shift by the # of decimal places expected, and then add the fractional
        // value.
        let numberOfCents: number = null;

        if (userInput.indexOf(LocaleHelpers.getDecimalSeparator()) > 0) {
            let wholeValue: number = parseInt(userInput.substr(0, userInput.indexOf(LocaleHelpers.getDecimalSeparator())), 10);
            wholeValue *= parseInt("" + Math.pow(10, LocaleHelpers.getCurrencyDecimalPlaces()));
            wholeValue = parseInt("" + wholeValue); // In case there is any precision error from the multiplication.

            let fractionalValue: number = parseInt(userInput.substr(userInput.indexOf(LocaleHelpers.getDecimalSeparator()) + 1, LocaleHelpers.getCurrencyDecimalPlaces()));
            numberOfCents = wholeValue + fractionalValue;
        } else {
            numberOfCents = parseInt(userInput);
            numberOfCents *= parseInt("" + Math.pow(10, LocaleHelpers.getCurrencyDecimalPlaces()));
            numberOfCents = parseInt("" + numberOfCents); // In case there is any precision error from the multiplication.
        }

        return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>numberOfCents);
    }

}
