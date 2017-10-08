/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {DynamicLabel, DynamicLabelProps, IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";

class ReceiptHeaderProps {
    public title: string;
    public id: string;

    public onReceiptDeleteClick: (e, id: string) => void;
    public onReceiptTitleChange: IDynamicLabelValueChangeEvent<string>;
}

export class ReceiptHeaderComponent extends React.Component<ReceiptHeaderProps, any> {

    constructor(props: ReceiptHeaderProps) {
        super(props);
    }

    render() {
        let receiptTitleLabelProps: DynamicLabelProps<string> = new DynamicLabelProps<string>();
        receiptTitleLabelProps.elementId = this.props.id + "_title";
        receiptTitleLabelProps.objectId = this.props.id;
        receiptTitleLabelProps.inputType = DynamicLabelType.TEXT;
        receiptTitleLabelProps.ghostText = "Receipt title?";
        receiptTitleLabelProps.value = this.props.title;
        receiptTitleLabelProps.maxLength = 40;
        receiptTitleLabelProps.onValueChange = this.props.onReceiptTitleChange;
        let receiptTitleLabel: any = React.createElement(DynamicLabel, receiptTitleLabelProps);

        return (
            <header className="card-header">
                <div className="card-header-title">
                    {receiptTitleLabel}
                </div>

                <a className="card-header-icon" onClick={e => this.props.onReceiptDeleteClick(e, this.props.id)}>
                    <button className="delete"> </button>
                </a>
            </header>
        );
    }
}