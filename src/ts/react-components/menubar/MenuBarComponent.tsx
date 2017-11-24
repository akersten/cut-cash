import * as React from "react";

class MenuBarProps {
    public username?: string;
}

export class MenuBarComponent extends React.Component<MenuBarProps, any> {
    constructor(props: MenuBarProps) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item cwxs-navbar-logo" href="http://cut.cash">
                        <img src="static/img/logo/logo128.png" alt="CutCash: Receipt splitting made easy" width="128" height="72" />
                        <img src="static/img/logo/logo128_hover.png" alt="CutCash: Receipt splitting made easy" width="128" height="72" />
                    </a>
                </div>
                <div className="navbar-menu">
                </div>
            </nav>);
    }
}