/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";

class ReceiptFooterProps {
    receiptId: string;
    onCarveoutClick: (e, receiptId: string) => void;
}

export class ReceiptFooterComponent extends React.Component<ReceiptFooterProps, any> {

    constructor(props: ReceiptFooterProps) {
        super(props);
    }

    render() {
        return (
            <footer className="card-footer">
                <a className="card-footer-item" onClick={e => this.props.onCarveoutClick(e, this.props.receiptId)}>Add Line Item</a>
            </footer>
        );
    }
}