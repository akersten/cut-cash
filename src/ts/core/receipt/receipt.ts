/**
 * Created by akersten on 5/12/17.
 */
import {Party} from "../party/party";

export class Receipt {
    public id: string;
    public title: string;
    public date: Date;
    public lines: ReceiptLine[];
    public parties: Party[];

    constructor(id: string, title: string, date: Date) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.lines = [];
    }
}

export class ReceiptLine {
    public title: string;
    public id: string;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}