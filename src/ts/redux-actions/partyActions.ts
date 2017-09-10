// TODO: Better way of doing this so we have unique IDs?
import {Color} from "../core/lib/color";


let nextPartyId = 0;


export const enum PartyActionType {
    CREATE_PARTY=1100,
    TOGGLE_PARTY_ON_RECEIPT,
    DELETE_PARTY
}


export interface IPartyAction {
    type: PartyActionType,
}

export interface ICreatePartyAction extends IPartyAction {
    id: string,
    name: string,
    color?: Color,
}

export interface ITogglePartyOnReceiptAction extends IPartyAction {
    id: string,
    partyId: string,
    checked: boolean
}

export interface IDeletePartyAction extends IPartyAction {
    id: string,
}


export function createParty(name: string): ICreatePartyAction {
    return {type: PartyActionType.CREATE_PARTY, name, id: "PARTY_" + nextPartyId++}
}

export function partyToggleOnReceipt(id: string, partyId: string, checked: boolean): ITogglePartyOnReceiptAction {
    return {type: PartyActionType.TOGGLE_PARTY_ON_RECEIPT, id, partyId, checked};
}

export function deleteParty(id: string): IDeletePartyAction {
    return {type: PartyActionType.DELETE_PARTY, id};
}
