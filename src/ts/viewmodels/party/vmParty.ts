import {Party} from "../../core/party/party";
import {Color} from "../../core/lib/color";

export class VmParty extends Party {

    public excludedReceipts: string[];

    constructor(id: string, name: string, color?: Color) {
        super(id, name, color);
        this.excludedReceipts = [];
    }
}