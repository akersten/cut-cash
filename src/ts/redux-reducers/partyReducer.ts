/**
 * Reducer for the array of parties.
 */

import {Party} from "../core/party/party";
import {
    ICreatePartyAction, IPartyAction, ITogglePartyOnReceiptAction,
    PartyActionType
} from "../redux-actions/partyActions";

export function partyReducer(state: Array<Party> = [], action: IPartyAction): Array<Party> {
    switch (action.type) {
        case PartyActionType.CREATE_PARTY:
            let actCP = <ICreatePartyAction> action;
            return [
                ...state,
                new Party(actCP.id, actCP.name, actCP.color)
            ];


        case PartyActionType.TOGGLE_PARTY_ON_RECEIPT:
            let actTP = <ITogglePartyOnReceiptAction>action;

            return state.map(
                (party: Party): Party => {
                    if (party.id === actTP.partyId) {
                        if (actTP.checked) {
                            // Remove this party from the list.
                            let newList = party.excludedReceipts.filter(
                                (receiptId: string): boolean => {
                                    return receiptId !== actTP.id;
                                }
                            );

                            return <Party> Object.assign({}, party, <Party> {
                                excludedReceipts: newList
                            });
                        } else {
                            // Add party to excluded list.
                            return <Party> Object.assign({}, party, <Party> {
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