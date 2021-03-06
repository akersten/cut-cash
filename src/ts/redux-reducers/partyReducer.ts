/**
 * Reducer for the array of parties.
 */

import {Party} from "../core/party/party";
import {
    ICreatePartyAction, IPartyAction, ITogglePartyOnReceiptAction,
    PartyActionType, IDeletePartyAction, ITogglePartyOnReceiptLineAction
} from "../redux-actions/partyActions";
import {VmParty} from "../viewmodels/party/vmParty";

export function partyReducer(state: Array<VmParty> = [], action: IPartyAction): Array<VmParty> {
    switch (action.type) {
        case PartyActionType.CREATE_PARTY:
            let actCP = <ICreatePartyAction> action;
            return [
                new VmParty(actCP.id, actCP.name, actCP.color),
                ...state,
            ];


        case PartyActionType.TOGGLE_PARTY_ON_RECEIPT:
            let actTP = <ITogglePartyOnReceiptAction>action;

            return state.map(
                (party: VmParty): VmParty => {
                    if (party.id === actTP.partyId) {
                        if (actTP.checked) {
                            // Remove this party from the list.
                            let newList = party.excludedReceipts.filter(
                                (receiptId: string): boolean => {
                                    return receiptId !== actTP.id;
                                }
                            );

                            return <VmParty> Object.assign({}, party, <VmParty> {
                                excludedReceipts: newList
                            });
                        } else {
                            // Add party to excluded list.
                            return <VmParty> Object.assign({}, party, <VmParty> {
                               excludedReceipts: [
                                   ...party.excludedReceipts,
                                   actTP.id
                               ]
                            });
                        }
                    }
                    return party;
                }
            );

        case PartyActionType.DELETE_PARTY:
            let actDP = <IDeletePartyAction> action;

            // TODO: We'll have to remove this party from any receipts that have them listed as the payer.
            return state.filter((party: VmParty) : boolean => {
                return party.id !== actDP.id;
            });

        case PartyActionType.TOGGLE_PARTY_ON_RECEIPT_LINE:
            let actTPRL = <ITogglePartyOnReceiptLineAction> action;

              return state.map(
                (party: VmParty): VmParty => {
                    if (party.id === actTPRL.partyId) {
                        if (actTPRL.checked) {
                            // Remove this party from the list.
                            let newList = party.excludedReceiptLines.filter(
                                (rowId: string): boolean => {
                                    return rowId !== actTPRL.rowId;
                                }
                            );

                            return <VmParty> Object.assign({}, party, <VmParty> {
                                excludedReceiptLines: newList
                            });
                        } else {
                            // Add party to excluded list.
                            return <VmParty> Object.assign({}, party, <VmParty> {
                               excludedReceiptLines: [
                                   ...party.excludedReceiptLines,
                                   actTPRL.rowId
                               ]
                            });
                        }
                    }
                    return party;
                }
            );


        default:
            return state;
    }
}