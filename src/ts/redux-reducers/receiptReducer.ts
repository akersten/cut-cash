/**
 * Created by akersten on 5/27/17.
 *
 * Reducer for a receipt object.
 */

import {Receipt} from "../core/receipt/receipt";
import {
    ICreateReceiptAction, IReceiptAction, ISetTitleAction,
    ReceiptActionType
} from "../redux-actions/receiptActions";

export function receiptReducer(state: Array<Receipt> = [], action: IReceiptAction): Array<Receipt> {
    switch (action.type) {
        case ReceiptActionType.CREATE_RECEIPT:
            let actCR = <ICreateReceiptAction>action;
            return [
                ...state,
                new Receipt(actCR.id, actCR.title, actCR.date)
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

        default:
            return state;
    }
}