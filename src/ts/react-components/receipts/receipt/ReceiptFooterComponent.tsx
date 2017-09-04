/**
 * Created by akersten on 5/13/17.
 */

import * as React from "react";

export class ReceiptFooterComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <footer className="card-footer">
                <a className="card-footer-item" href="#">Add Carveou t</a>
            </footer>
        );
    }
}