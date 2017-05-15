/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";
import {ReceiptLine} from "../../core/receipt/receipt";

class ReceiptBodyProps {
    public lines: ReceiptLine[];
    public onRowDelete: (rowKey) => void;
}

export class ReceiptBodyComponent extends React.Component<ReceiptBodyProps, any> {

    constructor(props:ReceiptBodyProps) {
        super(props);

        this.handleRowDeleteClick = this.handleRowDeleteClick.bind(this);
    }

    handleRowDeleteClick(e) {
        this.props.onRowDelete($(e.target).parent().data('id'));
    }

    render() {
        let rows = this.props.lines.map(line => <li key={line.id} data-id={line.id}><a href="#" onClick={this.handleRowDeleteClick}>x</a> {line.title}</li>);

        return (
            <div>
                <ul>{rows}</ul>
            </div>
        );
    }
}