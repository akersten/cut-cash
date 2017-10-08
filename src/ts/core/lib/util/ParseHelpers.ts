import {ParseResult} from "../input/DynamicLabelHelpers";
import {RegExHelpers} from "./RegExHelpers";
import {LocaleHelpers} from "./LocaleHelpers";
/**
 * Created by akersten on 10/8/17.
 */
export class ParseHelpers {

    public static parseNumber<typeOfRawValue>(userInput: string): ParseResult<typeOfRawValue> {
        // TODO: Allow commas in user input? If we do, we'll need to take them out here.

        userInput = userInput + ""; // JS decides this is a number at some point, so force it to a string.

        if (userInput.length === 0) {
            return new ParseResult(true, null);
        }

        let numberRegEx = new RegExp("^-?\\d+(" + RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()) + "\\d+)?$");
        if (!numberRegEx.test(userInput)) {
            return new ParseResult(false, null, "Not a valid number.");
        }

        // Convert decimal separator to period
        let replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()), "g");
        userInput = userInput.replace(replaceRegEx, ".");

        return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>parseFloat(userInput));
    }

    public static parseCurrency<typeOfRawValue>(userInput: string): ParseResult<typeOfRawValue> {
        // TODO: Allow commas in user input? If we do, we'll need to take them out here.
        if (userInput.length === 0) {
            return new ParseResult(true, null);
        }

        userInput = userInput + ""; // JS decides this is a number at some point, so force it to a string.

        let currencyRegEx = new RegExp("^-?\\s*" + RegExHelpers.escape(LocaleHelpers.getCurrencySymbol()) + "?\\s*\\d+(" + RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()) + "\\d{" + LocaleHelpers.getCurrencyDecimalPlaces() + "})?\\s*" + RegExHelpers.escape(LocaleHelpers.getCurrencySymbol()) + "?$");
        if (!currencyRegEx.test(userInput)) {
            return new ParseResult(false, null, "Not a valid currency amount.");
        }

        // Strip out formatting characters (currency symbol and comma separator).
        let replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getCurrencySymbol()), "g");
        userInput = userInput.replace(replaceRegEx, "");

        // Convert decimal separator to period
        replaceRegEx = new RegExp(RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()), "g");
        userInput = userInput.replace(replaceRegEx, ".");

        // Round to # of decimal places for currency.
        return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>+(parseFloat(userInput)).toFixed(LocaleHelpers.getCurrencyDecimalPlaces()));
    }

}
