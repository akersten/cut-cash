/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {ReceiptLine} from "../../core/receipt/receipt";

class ReceiptBodyProps {
    public lines: ReceiptLine[];
}

export class ReceiptBodyComponent extends React.Component<ReceiptBodyProps, any> {

    constructor(props:ReceiptBodyProps) {
        super(props);
    }

    render() {
        let rows = this.props.lines.map(line => <li key={line.id}>{line.title}</li>);

        return (
            <div>
                <ul>{rows}</ul>
            </div>
        );
    }
}