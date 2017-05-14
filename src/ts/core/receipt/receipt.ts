/**
 * Created by akersten on 5/12/17.
 */

export class Receipt {
    public title:string;
    public date:Date;
    public lines:ReceiptLine[];
}

export class ReceiptLine {
    public title:string;
    public id:number;

    constructor(id:number,title:string) {
        this.id = id;
        this.title = title;
    }
}