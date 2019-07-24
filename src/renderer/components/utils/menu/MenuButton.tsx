// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import ReactDOM = require("react-dom");

interface MenuButtonProps {
    menuId: string;
    open: boolean;
    toggle: () => void;
    focusMenuButton?: (ref: React.RefObject<HTMLButtonElement>, menuID: string) => void;
}

export default class Header extends React.Component<MenuButtonProps, undefined> {
    private menuButton = React.createRef<HTMLButtonElement>();

    public constructor(props: any) {
        super(props);

        this.getFocusBack = this.getFocusBack.bind(this);
    }

    public render(): React.ReactElement<{}> {
        const { toggle, open, menuId, children } = this.props;
        return (
            <button
                aria-expanded={open}
                aria-controls={menuId}
                onClick={toggle}
                ref={this.menuButton}
            >
                {this.getFocusBack()}
                {children}
            </button>
        );
    }

    public getFocusBack() {
        /*console.log("get focus back: ", this.menuButton.current);
        console.log("menu open: ", this.props.open);
        console.log("menuID", this.props.menuId);*/
        if (this.menuButton && this.props.open) {
            console.log("get focus back: ", this.menuButton.current);
            console.log("menu open: ", this.props.open);
            console.log("menuID", this.props.menuId);
            this.props.focusMenuButton(this.menuButton, this.props.menuId);
        }
    }
}
