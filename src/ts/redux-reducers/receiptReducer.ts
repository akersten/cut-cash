/**
 * Created by akersten on 5/27/17.
 *
 * Reducer for a receipt object.
 */

import {Receipt, ReceiptLine} from "../core/receipt/receipt";
import {
    ICreateCarveoutAction,
    ICreateReceiptAction, IDeleteReceiptAction, IReceiptAction, ISetPayerAction, ISetTitleAction, ISetTotalAction,
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
                    if (receipt.id === actST.receiptId) {
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

        case ReceiptActionType.SET_TOTAL:
            let actSTA = <ISetTotalAction>action;

            return <Array<VmReceipt>> state.map(
                (receipt: VmReceipt): VmReceipt => {
                    if (receipt.id === actSTA.receiptId) {
                        return <VmReceipt> Object.assign({}, receipt, <VmReceipt> {
                            total: actSTA.totalRaw,
                            totalFormatted: actSTA.totalFormatted,
                        });
                    }
                    return receipt;
                }
            );

        case ReceiptActionType.CREATE_CARVEOUT:
            let actCC = <ICreateCarveoutAction>action;

            return <Array<VmReceipt>> state.map(
                (receipt: VmReceipt): VmReceipt => {
                    if (receipt.id === actCC.receiptId) {
                        return <VmReceipt> Object.assign({}, receipt, <VmReceipt> {
                            lines: [
                                ...receipt.lines,
                                new ReceiptLine("RL_" + receipt.id + "_" + receipt.lines.length)
                            ]
                        });
                    }

                    return receipt;
                }
            );
        default:
            return state;
    }
}