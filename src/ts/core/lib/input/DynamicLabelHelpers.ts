/**
 * Created by akersten on 9/9/17.
 */


/**
 * The types of input that a DynamicLabel can support.
 */
export const enum DynamicLabelType {
    TEXT,
    NUMBER,
    DATE
}

export class DynamicLabelHelpers {

    /**
     *
     * @param type
     * @return {string}
     */
    public static mapTypeToInputTypeAttr(type : DynamicLabelType) : string {
        switch (type) {
            case DynamicLabelType.DATE:
                return "Date";
        }
    }


    public static parseInput(): string {
        alert("HEYyy");
        return "";
    }
}
