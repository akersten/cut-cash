/**
 * Created by akersten on 5/12/17.
 */

import * as React from "react";
import {ReceiptLine} from "../../../core/receipt/receipt";
import {ReceiptHeaderComponent} from "./ReceiptHeaderComponent";
import {ReceiptBodyComponent} from "./ReceiptBodyComponent";
import {ReceiptFooterComponent} from "./ReceiptFooterComponent";
import {Party} from "../../../core/party/party";
import {ReceiptPartiesComponent} from "./ReceiptPartiesComponent";
import {ReceiptInfoComponent} from "./ReceiptInfoComponent";
import {IDynamicLabelValueChangeEvent} from "../../lib/input/DynamicLabel";

class ReceiptProps {
    public title: string;
    public date: Date;
    public lines: ReceiptLine[];
    public id: string;
    public payer: string;
    public parties: Party[];
    public onReceiptPartyChange: (e, receiptId: string, partyId: string) => void;
    public onReceiptDeleteClick: (e, id: string) => void;
    public onReceiptDateChange: IDynamicLabelValueChangeEvent<Date>;
    public onReceiptPayerChange: IDynamicLabelValueChangeEvent<string>;
    public onReceiptTotalChange: IDynamicLabelValueChangeEvent<number>;
}

export class ReceiptComponent extends React.Component<ReceiptProps, any> {
    constructor(props: ReceiptProps) {
        super(props);
    }

    render() {
        return (
            <div className="column is-one-third cw-fx-expand-on-create" data-id={this.props.id}>
                <div className="card">
                    <ReceiptHeaderComponent title={this.props.title} id={this.props.id}
                                            onReceiptDeleteClick={this.props.onReceiptDeleteClick}/>

                    <div className="card-content">
                        <ReceiptInfoComponent receiptId={this.props.id} date={this.props.date} payer={this.props.payer}
                                              parties={this.props.parties}
                                              onReceiptDateChange={this.props.onReceiptDateChange}
                                              onReceiptPayerChange={this.props.onReceiptPayerChange}
                                              onReceiptTotalChange={this.props.onReceiptTotalChange}
                        />
                        <ReceiptBodyComponent lines={this.props.lines}/>
                        <ReceiptPartiesComponent parties={this.props.parties} receiptId={this.props.id}
                                                 onReceiptPartyChange={this.props.onReceiptPartyChange}/>
                    </div>
                    <ReceiptFooterComponent/>
                </div>
            </div>
        );

    }
}