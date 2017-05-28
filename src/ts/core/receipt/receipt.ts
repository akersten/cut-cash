/**
 * Created by akersten on 5/12/17.
 */

export class Receipt {
    public id: number;
    public title: string;
    public date: Date;
    public lines: ReceiptLine[];

    constructor(id: number, title: string, date: Date) {
        this.id = id;
        this.title = title;
        this.date = date;
    }
}

export class ReceiptLine {
    public title: string;
    public id: number;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }
}