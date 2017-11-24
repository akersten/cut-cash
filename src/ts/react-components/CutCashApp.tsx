import * as React from "react";
import {ReceiptsLink} from "./receipts/ReceiptsLink";
import {PartiesLink} from "./parties/PartiesLink";
import {MenuBarLink} from "./menubar/MenuBarLink";

/**
 * Created by akersten on 4/30/17.
 */


export class CutCashApp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>
                        <MenuBarLink/>

            <section className="section">
            <div className="container">
                <PartiesLink/>
                <ReceiptsLink/>
            </div>
        </section>
        </div>
    }
}
