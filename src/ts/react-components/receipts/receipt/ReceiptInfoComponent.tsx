/**
 * Created by akersten on 9/4/17.
 */

import * as React from "react";
import {DynamicLabel, DynamicLabelProps, IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";
import {DynamicLabelType} from "../../../core/lib/input/DynamicLabelHelpers";
import {Party} from "../../../core/party/party";
import {VmParty} from "../../../viewmodels/party/vmParty";

class ReceiptInfoProps {
    public receiptId: string;
    public date: string;
    public payer: VmParty;
    public parties: VmParty[];
    public total: string;

    onReceiptDateChange: IDynamicLabelValueChangeEvent<Date>;
    onReceiptPayerChange: IDynamicLabelValueChangeEvent<VmParty>;
    onReceiptTotalChange: IDynamicLabelValueChangeEvent<number>;
}

export class ReceiptInfoComponent extends React.Component<ReceiptInfoProps, any> {
    constructor(props: ReceiptInfoProps) {
        super(props);
    }

    render() {
        let amountLabelProps: DynamicLabelProps<number> = new DynamicLabelProps<number>();
        amountLabelProps.elementId = this.props.receiptId + "_total";
        amountLabelProps.objectId = this.props.receiptId;
        amountLabelProps.iconClassName = "fa-money";
        amountLabelProps.inputType = DynamicLabelType.CURRENCY;
        amountLabelProps.ghostText = "$0.00";
        amountLabelProps.value = this.props.total;
        amountLabelProps.onValueChange = this.props.onReceiptTotalChange;
        let amountLabel: any = React.createElement(DynamicLabel, amountLabelProps);

        let payerLabelProps: DynamicLabelProps<VmParty> = new DynamicLabelProps<VmParty>();
        payerLabelProps.elementId = this.props.receiptId + "_payer";
        payerLabelProps.objectId = this.props.receiptId;
        payerLabelProps.iconClassName = "fa-user";
        payerLabelProps.inputType = DynamicLabelType.SELECT;
        payerLabelProps.ghostText = "Who paid?";
        payerLabelProps.selectValues = this.props.parties;
        payerLabelProps.valueObject = this.props.payer;
        payerLabelProps.onValueChange = this.props.onReceiptPayerChange;
        let payerLabel: any = React.createElement(DynamicLabel, payerLabelProps);

        let dateLabelProps: DynamicLabelProps<Date> = new DynamicLabelProps<Date>();
        dateLabelProps.elementId = this.props.receiptId + "_date";
        dateLabelProps.objectId = this.props.receiptId;
        dateLabelProps.iconClassName = "fa-calendar";
        dateLabelProps.inputType = DynamicLabelType.DATE;
        dateLabelProps.ghostText = "When was this?";
        dateLabelProps.value = this.props.date;
        dateLabelProps.onValueChange = this.props.onReceiptDateChange;
        let dateLabel: any = React.createElement(DynamicLabel, dateLabelProps);

        // TODO: Add {dateLabel} below once it's working.
        return (
            <div className="columns is-mobile">
                <div className="column">
                    {amountLabel}
                </div>
                <div className="column">
                    {payerLabel}
                </div>
            </div>
        );
    }
}