/**
 * Created by akersten on 5/12/17.
 */

import * as React from "react";
import {Receipt, ReceiptLine} from "../../core/receipt/receipt";
import {ReceiptHeaderComponent} from "./receipt/ReceiptHeaderComponent";
import {ReceiptBodyComponent} from "./receipt/ReceiptBodyComponent";
import {ReceiptFooterComponent} from "./receipt/ReceiptFooterComponent";
import {ReceiptComponent} from "./receipt/ReceiptComponent";


class ReceiptsControlsProps {
    onKeyPress: (e) => void;
}

export class ReceiptsControls extends React.Component<ReceiptsControlsProps, any> {
    constructor(props: ReceiptsControlsProps) {
        super(props);
    }

    render() {
        return (
            <div className="column is-one-third">
                <p className="control">
                    <input className="input" type="text" placeholder="Create receipt"
                           onKeyPress={this.props.onKeyPress}/>
                </p>
            </div>

        );
    }
}