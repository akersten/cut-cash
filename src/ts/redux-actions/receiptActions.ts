/**
 * Created by akersten on 5/27/17.
 */


// TODO: Better way of doing this so we have unique IDs?
let nextReceiptId = 0;

export const enum ReceiptActionType {
    CREATE_RECEIPT = 1000,
    SET_TOTAL,
    SET_DATE,
    SET_TITLE,
    SET_PAYER,
    DELETE_RECEIPT,
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

export interface IDeleteReceiptAction extends IReceiptAction {
    id: string,
}

export interface ISetPayerAction extends IReceiptAction {
    receiptId: string,
    payer: string,
}

export interface ISetTotalAction extends IReceiptAction {
    receiptId: string,
    totalRaw: number,
    totalFormatted: string,
}

export function receiptCreate(title: string): ICreateReceiptAction {
    return {type: ReceiptActionType.CREATE_RECEIPT, title, id: "CR_" + nextReceiptId++, date: new Date()};
}

export function receiptSetTitle(id: string, title: string): ISetTitleAction {
    return {type: ReceiptActionType.SET_TITLE, title, id};
}

export function receiptDelete(id: string): IDeleteReceiptAction {
    return {type: ReceiptActionType.DELETE_RECEIPT, id};
}

export function receiptChangePayer(receiptId: string, payer: string): ISetPayerAction {
    return {type: ReceiptActionType.SET_PAYER, receiptId, payer};
}

export function receiptChangeTotal(receiptId: string, totalRaw: number, totalFormatted: string): ISetTotalAction {
    return {type: ReceiptActionType.SET_TOTAL, receiptId, totalRaw, totalFormatted};
}