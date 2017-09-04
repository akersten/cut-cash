/**
 * Reducer for the array of parties.
 */

import {Party} from "../core/party/party";
import {
    ICreatePartyAction, IPartyAction, ITogglePartyOnReceiptAction,
    PartyActionType
} from "../redux-actions/partyActions";
import {VmParty} from "../viewmodels/party/vmParty";

export function partyReducer(state: Array<VmParty> = [], action: IPartyAction): Array<VmParty> {
    switch (action.type) {
        case PartyActionType.CREATE_PARTY:
            let actCP = <ICreatePartyAction> action;
            return [
                ...state,
                new VmParty(actCP.id, actCP.name, actCP.color)
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


        default:
            return state;
    }
}