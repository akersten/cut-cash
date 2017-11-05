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
import {VmParty} from "../../../viewmodels/party/vmParty";

class ReceiptProps {
    public title: string;
    public date: string;
    public lines: ReceiptLine[];
    public id: string;
    public payer: VmParty;
    public total: string;
    public parties: VmParty[];
    public onReceiptPartyChange: (e, receiptId: string, partyId: string) => void;
    public onReceiptDeleteClick: (e, id: string) => void;
    public onReceiptDateChange: IDynamicLabelValueChangeEvent<Date>;
    public onReceiptPayerChange: IDynamicLabelValueChangeEvent<VmParty>;
    public onReceiptTotalChange: IDynamicLabelValueChangeEvent<number>;
    public onReceiptTitleChange: IDynamicLabelValueChangeEvent<string>;
    public onCarveoutClick: (e, receiptId: string) => void;
    public onRowDelete: (e, receiptId: string, rowId: string) => void;
    public onRowTitleChange: IDynamicLabelValueChangeEvent<string>;
    public onRowAmountChange: IDynamicLabelValueChangeEvent<number>;
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
                                            onReceiptDeleteClick={this.props.onReceiptDeleteClick}
                                            onReceiptTitleChange={this.props.onReceiptTitleChange}/>

                    <div className="card-content">
                        <ReceiptInfoComponent receiptId={this.props.id} date={this.props.date} payer={this.props.payer}
                                              parties={this.props.parties} total={this.props.total}
                                              onReceiptDateChange={this.props.onReceiptDateChange}
                                              onReceiptPayerChange={this.props.onReceiptPayerChange}
                                              onReceiptTotalChange={this.props.onReceiptTotalChange}
                        />
                        <ReceiptBodyComponent lines={this.props.lines} onRowDelete={this.props.onRowDelete}
                            onRowTitleChange={this.props.onRowTitleChange} receiptId={this.props.id}
                                              onRowAmountChange={this.props.onRowAmountChange}
                        />
                        <ReceiptPartiesComponent parties={this.props.parties} receiptId={this.props.id}
                                                 onReceiptPartyChange={this.props.onReceiptPartyChange}/>
                    </div>
                    <ReceiptFooterComponent
                        receiptId={this.props.id}
                        onCarveoutClick={this.props.onCarveoutClick}
                    />
                </div>
            </div>
        );

    }
}