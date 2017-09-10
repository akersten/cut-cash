/**
 * Created by akersten on 9/4/17.
 */

import * as React from "react";
import {DynamicLabel, IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";
import {Party} from "../../../core/party/party";

class ReceiptInfoProps {
    public receiptId: string;
    public date: Date;
    public payer: string;
    public parties: Party[];

    onReceiptDateChange: IDynamicLabelValueChangeEvent;
    onReceiptPayerChange: IDynamicLabelValueChangeEvent;
    onReceiptTotalChange: IDynamicLabelValueChangeEvent;
}

export class ReceiptInfoComponent extends React.Component<ReceiptInfoProps, any> {
    constructor(props: ReceiptInfoProps) {
        super(props);
    }

    render() {
        let partyNames: string[] = this.props.parties.map(
            (party: Party): string => {
                return party.name;
            }
        );

        return (
            <div>
                <DynamicLabel
                    elementId={this.props.receiptId + "_total"}
                    objectId={this.props.receiptId}
                    iconClassName="fa-money"
                    inputType={DynamicLabelType.NUMBER}
                    onValueChange={this.props.onReceiptTotalChange}
                />
                <DynamicLabel
                    elementId={this.props.receiptId + "_payer"}
                    objectId={this.props.receiptId}
                    iconClassName="fa-credit-card"
                    inputType={DynamicLabelType.SELECT}
                    selectValues={partyNames}
                    value={this.props.payer}

                    onValueChange={this.props.onReceiptPayerChange}/>

                <DynamicLabel
                    elementId={this.props.receiptId + "_date"}
                    objectId={this.props.receiptId}
                    iconClassName="fa-calendar"
                    inputType={DynamicLabelType.DATE}
                    value={this.props.date.toDateString()}
                    onValueChange={this.props.onReceiptDateChange}/>


            </div>
        );
    }
}