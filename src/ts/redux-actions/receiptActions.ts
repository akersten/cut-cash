/**
 * Created by akersten on 5/27/17.
 */


// TODO: Better way of doing this so we have unique IDs?
let nextReceiptId = 0;

export const enum ReceiptActionType {
    CREATE_RECEIPT,
    SET_AMOUNT,
    SET_DATE,
    SET_TITLE,
    SET_OWNER,
}


export interface IReceiptAction {
    type: ReceiptActionType,
}

export interface ICreateReceipt extends IReceiptAction {
    id: string,
    title: string,
    date: Date,
}

export interface ISetTitle extends IReceiptAction {
    id: string,
    title: string,
}


export function createReceipt(title: string): ICreateReceipt {
    return {type: ReceiptActionType.CREATE_RECEIPT, title, id: "CR_" + nextReceiptId++, date: new Date()};
}

export function setReceiptTitle(id: string, title: string): ISetTitle {
    return {type: ReceiptActionType.SET_TITLE, title, id};
}