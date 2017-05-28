/**
 * Created by akersten on 5/27/17.
 *
 * Reducer for a receipt object.
 */

import {Receipt} from "../core/receipt/receipt";
import {ICreateReceipt, IReceiptAction, ISetTitle, ReceiptActionType} from "../redux-actions/receiptActions";

export function receiptReducer(state: Array<Receipt> = [], action: IReceiptAction): Array<Receipt> {
    switch (action.type) {
        case ReceiptActionType.CREATE_RECEIPT:
            return [
                ...state,
                new Receipt((<ICreateReceipt>action).id, (<ICreateReceipt>action).title, (<ICreateReceipt>action).date)
            ];

        case ReceiptActionType.SET_TITLE:
            return <Array<Receipt>> state.map(
                (receipt: Receipt, index: number): Receipt => {
                    if (receipt.id === (<ISetTitle>action).id) {
                        return <Receipt> Object.assign({}, receipt, <Receipt> {
                            title: (<ISetTitle>action).title,
                        });
                    }
                    return receipt;
                }
            );

        default:
            return state;
    }
}