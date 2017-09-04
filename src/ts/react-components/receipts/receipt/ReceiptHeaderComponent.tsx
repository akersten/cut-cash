/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";

class ReceiptHeaderProps {
    public title: string;
    public id: string;
    public onReceiptDeleteClick: (e, id: string) => void;
}

export class ReceiptHeaderComponent extends React.Component<ReceiptHeaderProps, any> {

    constructor(props: ReceiptHeaderProps) {
        super(props);
    }

    render() {
        return (
            <header className="card-header">
                <p className="card-header-title">{this.props.title}</p>

                <a className="card-header-icon" onClick={e => this.props.onReceiptDeleteClick(e, this.props.id)}>
                    <button className="delete"></button>
                </a>
            </header>
        );
    }
}