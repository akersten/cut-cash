/**
 * Created by akersten on 9/4/17.
 */

import * as React from "react";
import {DynamicLabel, IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";

class ReceiptInfoProps {
    public receiptId: string;
    public date: Date;

    onReceiptDateChange: IDynamicLabelValueChangeEvent;
    onReceiptPayorChange: IDynamicLabelValueChangeEvent;
    onReceiptTotalChange: IDynamicLabelValueChangeEvent;
}

export class ReceiptInfoComponent extends React.Component<ReceiptInfoProps, any> {
    constructor(props: ReceiptInfoProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <DynamicLabel
                    id={this.props.receiptId + "_total"}
                    iconClassName="fa-money"
                    inputType={DynamicLabelType.NUMBER}
                    onValueChange={this.props.onReceiptTotalChange}
                />
                <DynamicLabel
                    id={this.props.receiptId + "_payer"}
                    iconClassName="fa-credit-card"
                    inputType={DynamicLabelType.TEXT}

                    onValueChange={this.props.onReceiptPayorChange}/>

                <DynamicLabel
                    id={this.props.receiptId + "_date"}
                    iconClassName="fa-calendar"
                    inputType={DynamicLabelType.DATE}
                    value={this.props.date.toDateString()}
                    onValueChange={this.props.onReceiptDateChange}/>


            </div>
        );
    }
}