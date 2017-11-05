/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {DynamicLabel, DynamicLabelProps, IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {DynamicLabelHelpers, DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";

class ReceiptRowProps {
    public id: string;
    public title: string;
    public amount: string;

    public onRowDelete: (e, rowId: string) => void;
    public onRowTitleChange: IDynamicLabelValueChangeEvent<string>;
}

export class ReceiptRowComponent extends React.Component<ReceiptRowProps, any> {

    constructor(props:ReceiptRowProps) {
        super(props);
    }

    render() {
        let receiptRowProps: DynamicLabelProps<string> = new DynamicLabelProps<string>();
        receiptRowProps.elementId = this.props.id + "_title";
        receiptRowProps.objectId = this.props.id;
        receiptRowProps.inputType = DynamicLabelType.TEXT;
        receiptRowProps.ghostText = "Line item";
        receiptRowProps.value = this.props.title;
        receiptRowProps.maxLength = 30;
        receiptRowProps.onValueChange = this.props.onRowTitleChange;
        let receiptRowLabel: any = React.createElement(DynamicLabel, receiptRowProps);



        return (
            <li>
                {receiptRowLabel}
                <a className="is-pulled-right">x</a>
            </li>
        );
    }
}