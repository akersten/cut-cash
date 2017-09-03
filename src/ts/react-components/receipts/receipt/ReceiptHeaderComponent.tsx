/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";

class ReceiptHeaderProps {
    public title: string;
    public date: Date;
    public id: string;
}

export class ReceiptHeaderComponent extends React.Component<ReceiptHeaderProps, any> {

    constructor(props:ReceiptHeaderProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.date.toDateString()}</h2>
                <h3>{this.props.id}</h3>
            </div>
        );
    }
}