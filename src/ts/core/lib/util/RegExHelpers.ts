/**
 * Created by akersten on 10/8/17.
 */

export class RegExHelpers {

    /**
     * Escapes user input for use in a regular expression.
     *
     * @param      text The input to escape.
     * @return {string} The input with RegEx special characters escaped.
     */
    public static escape(text: string): string {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
}