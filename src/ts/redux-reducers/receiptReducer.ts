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
import {VmReceipt} from "../viewmodels/receipt/vmReceipt";

export function receiptReducer(state: Array<VmReceipt> = [], action: IReceiptAction): Array<VmReceipt> {
    switch (action.type) {
        case ReceiptActionType.CREATE_RECEIPT:
            let actCR = <ICreateReceiptAction>action;
            return [
                new VmReceipt(actCR.id, actCR.title, actCR.date),
                ...state,
            ];

        case ReceiptActionType.SET_TITLE:
            let actST = <ISetTitleAction>action;
            return <Array<VmReceipt>> state.map(
                (receipt: VmReceipt): Receipt => {
                    if (receipt.id === actST.id) {
                        return <VmReceipt> Object.assign({}, receipt, <VmReceipt> {
                            title: actST.title,
                        });
                    }
                    return receipt;
                }
            );


        case ReceiptActionType.DELETE_RECEIPT:
            // TODO: Theoretically we could run into problems since parties might be tracking this receipt in a "not paying"
            // list, but since the IDs aren't really re-used, this shouldn't be a problem. Maybe something to tackle later.
            let actDR = <IDeleteReceiptAction>action;

            return state.filter(
                (receipt: VmReceipt): boolean => {
                    return receipt.id !== actDR.id;
                }
            );

        case ReceiptActionType.SET_PAYER:
            let actSP = <ISetPayerAction>action;

            return <Array<VmReceipt>> state.map(
                (receipt: VmReceipt): VmReceipt => {
                    if (receipt.id === actSP.receiptId) {
                        return <VmReceipt> Object.assign({}, receipt, <VmReceipt> {
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