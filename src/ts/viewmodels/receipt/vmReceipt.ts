/**
 * Created by akersten on 9/10/17.
 */
import {Party} from "../../core/party/party";
import {Color} from "../../core/lib/color";
import {Receipt, ReceiptLine} from "../../core/receipt/receipt";
import {DynamicLabelHelpers, DynamicLabelType} from "../../core/lib/input/DynamicLabelHelpers";
import {VmParty} from "../party/vmParty";

export class VmReceipt extends Receipt {

    public totalFormatted: string;
    public dateFormatted: string;

    constructor(id: string, title: string, date: Date) {
        super(id, title, date);
        this.dateFormatted = DynamicLabelHelpers.format(this.date.toString(), DynamicLabelType.DATE);
        this.totalFormatted = DynamicLabelHelpers.format(this.total.toString(), DynamicLabelType.CURRENCY);
    }


    static getReceivedValue(party: VmParty, parties: Array<VmParty>, receipt: Receipt): number {
        // See if this party is excluding this receipt, in that case it's 0.
        if (party.excludedReceipts.indexOf(receipt.id) > -1) {
            return 0;
        }

        if (!receipt.payer) {
            // No one got any value if no one paid.
            return 0;
        }

        let splitWays: number = 0;
        // See how many ways this receipt is split
        for (let p of parties) {
            if (p.excludedReceipts.indexOf(receipt.id) > -1) {
                continue;
            }
            splitWays++;
        }

        if (splitWays === 0) {
            // No one is getting any value from this.
            return 0;
        }

        return Math.round(receipt.total / splitWays); // Since we store as whole cents, we can easily round.
    }
}


export class VmReceiptLine extends ReceiptLine {

    public amountFormatted: string;

    constructor(id: string) {
        super(id);
        this.amountFormatted = DynamicLabelHelpers.format(this.amount.toString(), DynamicLabelType.CURRENCY);
    }
}