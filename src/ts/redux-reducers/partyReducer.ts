/**
 * Reducer for the array of parties.
 */

import {Party} from "../core/party/party";
import {ICreatePartyAction, IPartyAction, PartyActionType} from "../redux-actions/partyActions";

export function partyReducer(state: Array<Party> = [], action: IPartyAction): Array<Party> {
    switch (action.type) {
        case PartyActionType.CREATE_PARTY:
            let actCP = <ICreatePartyAction> action;
            return [
                ...state,
                new Party(actCP.id, actCP.name, actCP.color)
            ];


        default:
            return state;
    }
}