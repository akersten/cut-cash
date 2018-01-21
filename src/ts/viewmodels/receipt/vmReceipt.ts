/**
 * Created by akersten on 9/10/17.
 */
import {Receipt} from "../../core/receipt/receipt";
import {VmParty} from "../party/vmParty";
import {FormatHelpers} from "../../core/lib/util/FormatHelpers";

export class VmReceipt extends Receipt {

    public totalFormatted: string;
    public dateFormatted: string;

    constructor(id: string, title: string, date: Date) {
        super(id, title, date);
        this.dateFormatted = FormatHelpers.formatDate(this.date.toString());
        this.totalFormatted = FormatHelpers.formatCurrency(this.total.toString());
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

        let totalForParty = receipt.total;

        for (let ln of receipt.lines) {
            totalForParty -= ln.amount;
        }

        totalForParty = Math.round(totalForParty / splitWays);

        // Subtract any line items that this party didn't receive value from.
        for (let ln of receipt.lines) {
            // How many parties received value from this line?
            let numPartiesForLine = 0;
            for (let p of parties) {
                if (p.excludedReceiptLines.indexOf(ln.id) > -1 || p.excludedReceipts.indexOf(receipt.id) > -1) {
                    continue;
                }
                numPartiesForLine++;
            }
            if (numPartiesForLine === 0) {
                continue;
            }

            if (party.excludedReceiptLines.indexOf(ln.id) > -1) {
                // We didn't get value from ths line
                continue;
            }

            totalForParty += Math.round(ln.amount / numPartiesForLine);

        }

        return totalForParty;
    }
}
