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

class ReceiptProps {
    public title: string;
    public date: Date;
    public lines: ReceiptLine[];
    public id: string;
    public parties: Party[];
    public onReceiptPartyChange: (e, receiptId: string, partyId: string) => void;
    public onReceiptDeleteClick: (e, id: string) => void;
    public onReceiptDateChange: (e, receiptId: string, newValue: string, oldValue: string) => void;
    public onReceiptPayorChange: (e, receiptId: string, newValue: string, oldValue: string) => void;
    public onReceiptTotalChange: (e, receiptId: string, newValue: string, oldValue: string) => void;
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
                        <ReceiptInfoComponent receiptId={this.props.id} date={this.props.date}
                                              onReceiptDateChange={this.props.onReceiptDateChange}
                                              onReceiptPayorChange={this.props.onReceiptPayorChange}
                                              onReceiptTotalChange={this.props.onReceiptTotalChange}/>
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