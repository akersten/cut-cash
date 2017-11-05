/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {DynamicLabel, DynamicLabelProps, IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {DynamicLabelHelpers, DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";

class ReceiptRowProps {
    public id: string;
    public receiptId: string;
    public title: string;
    public amount: string;

    public onRowDelete: (e, receiptId: string, rowId: string) => void;
    public onRowTitleChange: IDynamicLabelValueChangeEvent<string>;
    public onRowAmountChange: IDynamicLabelValueChangeEvent<number>;
}

export class ReceiptRowComponent extends React.Component<ReceiptRowProps, any> {

    constructor(props:ReceiptRowProps) {
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

        return (
            <li>
                {receiptRowTitleLabel}
                {receiptRowAmountLabel}
                <a className="is-pulled-right" onClick={e => this.props.onRowDelete(e, this.props.receiptId, this.props.id)}>x</a>
                <ul>
                    <li>Alex</li>
                    <li>Wendy</li>
                </ul>
            </li>
        );
    }
}