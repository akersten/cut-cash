import {Party} from "../../core/party/party";
import {Color} from "../../core/lib/color";
import {IDynamicLabelListSelectable} from "../../react-components/lib/input/IDynamicLabelListSelectable";

export class VmParty extends Party implements IDynamicLabelListSelectable{

    public excludedReceipts: string[];
    public excludedReceiptLines: string[];

    constructor(id: string, name: string, color?: Color) {
        super(id, name, color);
        this.excludedReceipts = [];
        this.excludedReceiptLines = [];
    }
}