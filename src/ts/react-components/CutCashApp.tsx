import * as React from "react";
import {ReceiptComponent} from "./receipt/ReceiptComponent";

/**
 * Created by akersten on 4/30/17.
 */
class CutCashAppProps {
     public name:string;
     public age:number;
}

export class CutCashApp extends React.Component<CutCashAppProps, any> {
    constructor(props:CutCashAppProps) {
        super(props);
    }

    render() {
        return <div>
                <div>Hello world! My name is {this.props.name} and my age is {this.props.age}. Looks like you've got some receipts!</div>
                <ReceiptComponent title="Aaaaaaa"/>
               </div>
    }
}
