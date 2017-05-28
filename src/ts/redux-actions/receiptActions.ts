/**
 * Created by akersten on 5/27/17.
 */

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
    id: number,
    title: string,
    date: Date,
}

export interface ISetTitle extends IReceiptAction {
    id: number,
    title: string,
}


export function createReceipt(id: number, title: string): ICreateReceipt {
    return {type: ReceiptActionType.CREATE_RECEIPT, title, id, date: new Date()};
}

export function setReceiptTitle(id: number, title: string): ISetTitle {
    return {type: ReceiptActionType.SET_TITLE, title, id};
}