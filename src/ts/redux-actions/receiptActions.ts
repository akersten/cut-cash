import {Party} from "../core/party/party";
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
    CREATE_CARVEOUT,
    SET_CARVEOUT_TITLE,
    SET_CARVEOUT_AMOUNT,
    DELETE_CARVEOUT,
}


export interface IReceiptAction {
    type: ReceiptActionType,
}

export interface ICreateReceiptAction extends IReceiptAction {
    id: string,
    title: string,
    date: Date,
}

export interface IDeleteReceiptAction extends IReceiptAction {
    id: string,
}

export interface ISetPayerAction extends IReceiptAction {
    receiptId: string,
    payer: Party,
}

export interface ISetTotalAction extends IReceiptAction {
    receiptId: string,
    totalRaw: number,
    totalFormatted: string,
}

export interface ISetTitleAction extends IReceiptAction {
    receiptId: string,
    title: string,
}

export interface ICreateCarveoutAction extends IReceiptAction {
    receiptId: string,
}

export interface ISetCarveoutTitleAction extends IReceiptAction {
    rowId: string;
    title: string;
}

export interface ISetCarveoutAmountAction extends IReceiptAction {
    rowId: string;
    amountRaw: number;
    amountFormatted: string;
}

export interface IDeleteCarveoutAction extends IReceiptAction {
    rowId: string;
    receiptId: string;
}

export function receiptCreate(title: string): ICreateReceiptAction {
    return {type: ReceiptActionType.CREATE_RECEIPT, title, id: "CR_" + nextReceiptId++, date: new Date()};
}

export function receiptDelete(id: string): IDeleteReceiptAction {
    return {type: ReceiptActionType.DELETE_RECEIPT, id};
}

export function receiptChangePayer(receiptId: string, payer: Party): ISetPayerAction {
    return {type: ReceiptActionType.SET_PAYER, receiptId, payer};
}

export function receiptChangeTotal(receiptId: string, totalRaw: number, totalFormatted: string): ISetTotalAction {
    return {type: ReceiptActionType.SET_TOTAL, receiptId, totalRaw, totalFormatted};
}

export function receiptChangeTitle(receiptId: string, title: string): ISetTitleAction {
    return {type: ReceiptActionType.SET_TITLE, receiptId, title};
}

export function receiptCreateCarveout(receiptId: string): ICreateCarveoutAction {
    return {type: ReceiptActionType.CREATE_CARVEOUT, receiptId};
}

export function receiptSetCarveoutTitle(rowId: string, title: string): ISetCarveoutTitleAction {
    return {type: ReceiptActionType.SET_CARVEOUT_TITLE, rowId, title};
}

export function receiptSetCarveoutAmount(rowId: string, amountRaw: number, amountFormatted: string): ISetCarveoutAmountAction {
    return {type: ReceiptActionType.SET_CARVEOUT_AMOUNT, rowId, amountRaw, amountFormatted};
}

export function receiptDeleteCarveout(rowId: string, receiptId: string): IDeleteCarveoutAction {
    return {type: ReceiptActionType.DELETE_CARVEOUT, rowId, receiptId};
}