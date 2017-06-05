/**
 * Created by akersten on 5/12/17.
 */

import * as React from "react";
import {Receipt, ReceiptLine} from "../../core/receipt/receipt";
import {ReceiptHeaderComponent} from "./ReceiptHeaderComponent";
import {ReceiptBodyComponent} from "./ReceiptBodyComponent";
import {ReceiptFooterComponent} from "./ReceiptFooterComponent";
import {ReceiptComponent} from "./ReceiptComponent";


class ReceiptsControlsProps {
    onKeyPress: (e) => void;
}

export class ReceiptsControls extends React.Component<ReceiptsControlsProps, any> {
    constructor(props: ReceiptsControlsProps) {
        super(props);
    }

    render() {
        return (
              <p className="control">
                  <input className="input" type="text" placeholder="Create receipt" onKeyPress={this.props.onKeyPress} />
              </p>
        );
    }
}