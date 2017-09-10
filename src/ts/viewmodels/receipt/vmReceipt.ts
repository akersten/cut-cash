/**
 * Created by akersten on 9/10/17.
 */
import {Party} from "../../core/party/party";
import {Color} from "../../core/lib/color";
import {Receipt, ReceiptLine} from "../../core/receipt/receipt";
import {DynamicLabelHelpers, DynamicLabelType} from "../../core/lib/input/DynamicLabelHelpers";

export class VmReceipt extends Receipt {

    public totalFormatted: string;
    public dateFormatted: string;

    constructor(id: string, title: string, date: Date) {
        super(id, title, date);
        this.dateFormatted = DynamicLabelHelpers.format(this.date.toString(), DynamicLabelType.DATE);
        //this.totalFormatted = DynamicLabelHelpers.format(this.total.toString(), DynamicLabelType.CURRENCY);
    }
}


export class VmReceiptLine extends ReceiptLine {

    public amountFormatted: string;

    constructor(id: string) {
        super(id);
    }
}