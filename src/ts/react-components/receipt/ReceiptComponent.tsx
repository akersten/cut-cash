/**
 * Created by akersten on 5/12/17.
 */

import * as React from "react";
import {Receipt} from "../../core/receipt/receipt";

class ReceiptProps {

}

export class ReceiptComponent extends React.Component<ReceiptProps, any> {
    private receipt:Receipt;

    constructor(props:ReceiptProps) {
        super(props);
        this.receipt = new Receipt{};
    }

    render() {
        return <ul>

        </ul>
    }
}