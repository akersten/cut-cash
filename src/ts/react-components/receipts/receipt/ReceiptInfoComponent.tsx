/**
 * Created by akersten on 9/4/17.
 */

import * as React from "react";

class ReceiptInfoProps {
    public date: Date;
}

export class ReceiptInfoComponent extends React.Component<ReceiptInfoProps, any> {
    constructor(props: ReceiptInfoProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>{this.props.date.toDateString()}</p>
            </div>
        );
    }
}