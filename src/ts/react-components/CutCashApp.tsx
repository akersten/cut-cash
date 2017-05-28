import * as React from "react";
import {ReceiptComponent} from "./receipt/ReceiptComponent";
import {Receipt, ReceiptLine} from "../core/receipt/receipt";

/**
 * Created by akersten on 4/30/17.
 */

/*
export class CutCashApp extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        //let rec = new Receipt();
        rec.date = new Date();
        rec.title = "Hey I'm a real react component!";
        rec.lines = [
            new ReceiptLine(1,"First item"),
            new ReceiptLine(2,"Second item"),
            new ReceiptLine(3,"Third item")
        ];

        //this.state = {receipt:rec};


        this.handleRowDeleteClick = this.handleRowDeleteClick.bind(this);
    }


    handleRowDeleteClick(rowId:number) {
        const rec = this.state.receipt;
        rec.lines[rowId-1].title = "DELETED";

        this.setState({receipt:rec});


    }

    render() {
        return (
            <div>
                <ReceiptComponent title={this.state.receipt.title} date={this.state.receipt.date} lines={this.state.receipt.lines} onRowDelete={this.handleRowDeleteClick}/>
            </div>
        );
    }
}
*/