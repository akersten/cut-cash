/**
 * Created by akersten on 5/12/17.
 */
import {Party} from "../party/party";

export class Receipt {
    public id: string;
    public title: string;
    public payer: Party;
    public total: number; // Currency amount in cents.
    public date: Date;
    public lines: ReceiptLine[];

    constructor(id: string, title: string, date: Date) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.lines = [];
        this.total = 0;
    }
}

export class ReceiptLine {
    public title: string;
    public id: string;
    public amount: number; // Currency amount in cents.

    constructor(id: string) {
        this.id = id;
        this.amount = 0;
    }
}