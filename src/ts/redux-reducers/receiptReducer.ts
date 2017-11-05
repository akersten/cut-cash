/**
 * Created by akersten on 5/27/17.
 *
 * Reducer for a receipt object.
 */

import {Receipt, ReceiptLine} from "../core/receipt/receipt";
import {
    ICreateCarveoutAction,
    ICreateReceiptAction, IDeleteCarveoutAction, IDeleteReceiptAction, IReceiptAction, ISetCarveoutAmountAction,
    ISetCarveoutTitleAction,
    ISetPayerAction,
    ISetTitleAction, ISetTotalAction,
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

        case ReceiptActionType.SET_CARVEOUT_AMOUNT:
            let actSCA = <ISetCarveoutAmountAction>action;

            return <Array<VmReceipt>> state.map(
                (receipt: VmReceipt): VmReceipt => {
                    // See if this receipt contains this line...
                    for (let line of receipt.lines) {
                        if (line.id === actSCA.rowId) {
                            // This is the one.
                            return <VmReceipt> Object.assign({}, receipt, <VmReceipt> {
                                lines: receipt.lines.map(
                                    (rl: ReceiptLine): ReceiptLine => {
                                        if (rl.id === actSCA.rowId) {
                                            return <ReceiptLine> Object.assign({}, rl, <ReceiptLine>{
                                                amount: actSCA.amountRaw
                                            });
                                        }
                                        return rl;
                                    }
                                )
                            })
                        }
                    }

                    return receipt;
                }
            );

        case ReceiptActionType.SET_CARVEOUT_TITLE:

            let actSCT = <ISetCarveoutTitleAction>action;

            return <Array<VmReceipt>> state.map(
                (receipt: VmReceipt): VmReceipt => {
                    // See if this receipt contains this line...
                    for (let line of receipt.lines) {
                        if (line.id === actSCT.rowId) {
                            // This is the one.
                            return <VmReceipt> Object.assign({}, receipt, <VmReceipt> {
                                lines: receipt.lines.map(
                                    (rl: ReceiptLine): ReceiptLine => {
                                        if (rl.id === actSCT.rowId) {
                                            return <ReceiptLine> Object.assign({}, rl, <ReceiptLine>{
                                                title: actSCT.title
                                            });
                                        }
                                        return rl;
                                    }
                                )
                            })
                        }
                    }

                    return receipt;
                }
            );

        case ReceiptActionType.DELETE_CARVEOUT:
            let actDC = <IDeleteCarveoutAction>action;

            return <Array<VmReceipt>> state.map(
                (receipt: VmReceipt): VmReceipt => {
                    if (receipt.id === actDC.receiptId) {
                        // This is the one.
                        return <VmReceipt> Object.assign({}, receipt, <VmReceipt> {
                            lines: receipt.lines.filter(
                                (rl: ReceiptLine): boolean => {
                                    return rl.id !== actDC.rowId;
                                }
                            )
                        })
                    }

                    return receipt;
                }
            );

        default:
            return state;
    }
}