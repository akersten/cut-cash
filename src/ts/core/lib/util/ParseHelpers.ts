import {ParseResult} from "../input/DynamicLabelHelpers";
import {RegExHelpers} from "./RegExHelpers";
import {LocaleHelpers} from "./LocaleHelpers";
/**
 * Created by akersten on 10/8/17.
 */
export class ParseHelpers {

    public static parseNumber<typeOfRawValue>(userInput: string): ParseResult<typeOfRawValue> {
        // TODO: Allow commas in user input? If we do, we'll need to take them out here.

        if (userInput.length === 0) {
            return new ParseResult(true, null);
        }

        let numberRegEx = new RegExp("^-?\\d+(" + RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()) + "\\d+)?$");
        if (!numberRegEx.test(userInput)) {
            return new ParseResult(false, null, "Not a valid number.");
        }

        return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>parseFloat(userInput));
    }

    public static parseCurrency<typeOfRawValue>(userInput: string): ParseResult<typeOfRawValue> {
        // TODO: Allow commas in user input? If we do, we'll need to take them out here.
        if (userInput.length === 0) {
            return new ParseResult(true, null);
        }

        let currencyRegEx = new RegExp("^-?\\s*" + RegExHelpers.escape(LocaleHelpers.getCurrencySymbol()) + "?\\s*\\d+(" + RegExHelpers.escape(LocaleHelpers.getDecimalSeparator()) + "\\d{" + LocaleHelpers.getCurrencyDecimalPlaces() + "})?$");
        if (!currencyRegEx.test(userInput)) {
            return new ParseResult(false, null, "Not a valid currency amount.");
        }

        // TODO: Need to strip out formatting characters before trying to parse the underlying raw value.

        return new ParseResult<typeOfRawValue>(true, <typeOfRawValue><any>parseFloat(userInput));
    }

}
