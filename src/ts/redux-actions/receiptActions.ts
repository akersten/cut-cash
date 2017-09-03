/**
 * Created by akersten on 5/27/17.
 */


// TODO: Better way of doing this so we have unique IDs?
let nextReceiptId = 0;

export const enum ReceiptActionType {
    CREATE_RECEIPT=1000,
    SET_AMOUNT,
    SET_DATE,
    SET_TITLE,
    SET_OWNER,
}


export interface IReceiptAction {
    type: ReceiptActionType,
}

export interface ICreateReceiptAction extends IReceiptAction {
    id: string,
    title: string,
    date: Date,
}

export interface ISetTitleAction extends IReceiptAction {
    id: string,
    title: string,
}


export function createReceipt(title: string): ICreateReceiptAction {
    return {type: ReceiptActionType.CREATE_RECEIPT, title, id: "CR_" + nextReceiptId++, date: new Date()};
}

export function setReceiptTitle(id: string, title: string): ISetTitleAction {
    return {type: ReceiptActionType.SET_TITLE, title, id};
}