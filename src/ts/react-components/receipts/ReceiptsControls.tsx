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
                <div className="control has-icons-left">
                    <input className="input" type="text" placeholder="Create receipt"
                           onKeyPress={this.props.onKeyPress}/>
                    <span className="icon is-left">
                        <i className="fa fa-list-alt"> </i>
                    </span>
                </div>
            </div>

        );
    }
}