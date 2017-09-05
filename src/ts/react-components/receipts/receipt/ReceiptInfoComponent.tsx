/**
 * Created by akersten on 9/4/17.
 */

import * as React from "react";
import {DynamicLabel} from "../../lib/input/DynamicLabel";

class ReceiptInfoProps {
    public receiptId: string;
    public date: Date;

    onReceiptDateChange: (e, receiptId: string, newValue: string, oldValue: string) => void;
    onReceiptPayorChange: (e, receiptId: string, newValue: string, oldValue: string) => void;
}

export class ReceiptInfoComponent extends React.Component<ReceiptInfoProps, any> {
    constructor(props: ReceiptInfoProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <DynamicLabel id={this.props.receiptId + "_payer"}  iconClassName="fa-credit-card"
                    onValueChange={this.props.onReceiptPayorChange} />

                <DynamicLabel id={this.props.receiptId + "_date"} iconClassName="fa-calendar"
                              value={this.props.date.toDateString()} onValueChange={this.props.onReceiptDateChange}/>

            </div>
        );
    }
}