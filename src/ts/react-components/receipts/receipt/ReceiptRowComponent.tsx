/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";

class ReceiptRowProps {
    public id: string;
    public title: string;
    public amount: string;

    public onRowDelete: (e, rowId: string) => void;
}

export class ReceiptRowComponent extends React.Component<ReceiptRowProps, any> {

    constructor(props:ReceiptRowProps) {
        super(props);
    }

    render() {
        return (
            <li>
                <span>{this.props.title}</span>
                <a className="is-pulled-right">x</a>
            </li>
        );
    }
}