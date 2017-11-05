/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {DynamicLabel, DynamicLabelProps, IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {DynamicLabelHelpers, DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";
import {VmParty} from "../../../viewmodels/party/vmParty";
import {ReceiptPartiesLineComponent} from "./ReceiptPartiesLineComponent";

class ReceiptRowProps {
    public id: string;
    public receiptId: string;
    public title: string;
    public amount: string;
    public parties: Array<VmParty>;

    public onRowDelete: (e, receiptId: string, rowId: string) => void;
    public onRowTitleChange: IDynamicLabelValueChangeEvent<string>;
    public onRowAmountChange: IDynamicLabelValueChangeEvent<number>;
    public onReceiptPartyLineChange: (e, rowId: string, partyId: string) => void;
}

export class ReceiptRowComponent extends React.Component<ReceiptRowProps, any> {

    constructor(props: ReceiptRowProps) {
        super(props);
    }

    render() {
        let receiptRowTitleProps: DynamicLabelProps<string> = new DynamicLabelProps<string>();
        receiptRowTitleProps.elementId = this.props.id + "_title";
        receiptRowTitleProps.objectId = this.props.id;
        receiptRowTitleProps.inputType = DynamicLabelType.TEXT;
        receiptRowTitleProps.ghostText = "Line item";
        receiptRowTitleProps.value = this.props.title;
        receiptRowTitleProps.maxLength = 30;
        receiptRowTitleProps.onValueChange = this.props.onRowTitleChange;
        let receiptRowTitleLabel: any = React.createElement(DynamicLabel, receiptRowTitleProps);

        let receiptRowAmountProps: DynamicLabelProps<number> = new DynamicLabelProps<number>();
        receiptRowAmountProps.elementId = this.props.id + "_amount";
        receiptRowAmountProps.objectId = this.props.id;
        receiptRowAmountProps.inputType = DynamicLabelType.CURRENCY;
        receiptRowAmountProps.ghostText = "Line item";
        receiptRowAmountProps.value = this.props.amount;
        receiptRowAmountProps.maxLength = 30;
        receiptRowAmountProps.onValueChange = this.props.onRowAmountChange;
        let receiptRowAmountLabel: any = React.createElement(DynamicLabel, receiptRowAmountProps);


        // Note that below we're re-using receiptId to store the rowId in ReceiptPartiesLineComponent. This is ok.
        return (
            <li>
                <div className="columns is-mobile">
                    <div className="column">
                        {receiptRowTitleLabel}
                    </div>
                    <div className="column">
                        {receiptRowAmountLabel}
                    </div>
                    <div className="column is-narrow">
                        <a className="delete is-small"
                           onClick={e => this.props.onRowDelete(e, this.props.receiptId, this.props.id)}> </a>
                    </div>
                </div>

                <ReceiptPartiesLineComponent
                        receiptId={this.props.id}
                        parties={this.props.parties}
                        onReceiptPartyLineChange={this.props.onReceiptPartyLineChange}
                />
            </li>
        );
    }
}