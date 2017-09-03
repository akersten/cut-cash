// TODO: Better way of doing this so we have unique IDs?
import {Color} from "../core/lib/color";


let nextPartyId = 0;


export const enum PartyActionType {
    CREATE_PARTY=1100,
}


export interface IPartyAction {
    type: PartyActionType,
}

export interface ICreatePartyAction extends IPartyAction {
    id: string,
    name: string,
    color?: Color,
}


export function createParty(name: string): ICreatePartyAction {
    return {type: PartyActionType.CREATE_PARTY, name, id: "PARTY_" + nextPartyId++}
}
