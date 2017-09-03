import * as React from "react";
import {ReceiptsLink} from "./receipts/ReceiptsLink";
import {PartiesLink} from "./parties/PartiesLink";

/**
 * Created by akersten on 4/30/17.
 */


export class CutCashApp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>
            <PartiesLink/>
            <ReceiptsLink/>
        </div>;
    }
}
