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

class ReceiptProps {
    public title: string;
    public date: Date;
    public lines: ReceiptLine[];
    public id: string;
    public parties: Party[];
}

export class ReceiptComponent extends React.Component<ReceiptProps, any> {
    constructor(props:ReceiptProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <ReceiptHeaderComponent title={this.props.title} date={this.props.date} id={this.props.id} />
                <ReceiptBodyComponent lines={this.props.lines} />
                <ReceiptPartiesComponent parties={this.props.parties}/>
                <ReceiptFooterComponent/>
            </div>
        );

    }
}