/**
 * Created by akersten on 5/27/17.
 *
 * Reducer for a receipt object.
 */

import {Receipt} from "../core/receipt/receipt";
import {
    ICreateReceiptAction, IDeleteReceiptAction, IReceiptAction, ISetPayerAction, ISetTitleAction,
    ReceiptActionType
} from "../redux-actions/receiptActions";

export function receiptReducer(state: Array<Receipt> = [], action: IReceiptAction): Array<Receipt> {
    switch (action.type) {
        case ReceiptActionType.CREATE_RECEIPT:
            let actCR = <ICreateReceiptAction>action;
            return [
                new Receipt(actCR.id, actCR.title, actCR.date),
                ...state,
            ];

        case ReceiptActionType.SET_TITLE:
            let actST = <ISetTitleAction>action;
            return <Array<Receipt>> state.map(
                (receipt: Receipt): Receipt => {
                    if (receipt.id === actST.id) {
                        return <Receipt> Object.assign({}, receipt, <Receipt> {
                            title: actST.title,
                        });
                    }
                    return receipt;
                }
            );


        case ReceiptActionType.DELETE_RECEIPT:
            let actDR = <IDeleteReceiptAction>action;

            return state.filter(
                (receipt: Receipt): boolean => {
                    return receipt.id !== actDR.id;
                }
            );

        case ReceiptActionType.SET_PAYER:
            let actSP = <ISetPayerAction>action;

            return <Array<Receipt>> state.map(
                (receipt: Receipt): Receipt => {
                    if (receipt.id === actSP.receiptId) {
                        return <Receipt> Object.assign({}, receipt, <Receipt> {
                            payer: actSP.payer,
                        });
                    }
                    return receipt;
                }
            );
        default:
            return state;
    }
}