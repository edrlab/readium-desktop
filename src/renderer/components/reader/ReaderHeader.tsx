// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";

import * as styles from "readium-desktop/renderer/assets/styles/reader-app.css";

import * as BackIcon from "readium-desktop/renderer/assets/icons/baseline-arrow_back-24px-grey.svg";
import * as SettingsIcon from "readium-desktop/renderer/assets/icons/font-size.svg";
import * as TOCIcon from "readium-desktop/renderer/assets/icons/open_book.svg";
import * as MarkIcon from "readium-desktop/renderer/assets/icons/outline-bookmark_border-24px.svg";
import * as DetachIcon from "readium-desktop/renderer/assets/icons/outline-flip_to_front-24px.svg";
import * as InfosIcon from "readium-desktop/renderer/assets/icons/outline-info-24px.svg";
import * as FullscreenIcon from "readium-desktop/renderer/assets/icons/sharp-crop_free-24px.svg";
import * as QuitFullscreenIcon from "readium-desktop/renderer/assets/icons/sharp-uncrop_free-24px.svg";

import SVG from "readium-desktop/renderer/components/utils/SVG";

import { ReaderMode } from "readium-desktop/common/models/reader";
import { TranslatorProps, withTranslator } from "readium-desktop/renderer/components/utils/hoc/translator";

import ReaderMenu from "./ReaderMenu";
import ReaderOptions from "./ReaderOptions";

import {createRef} from "react";
import ReactDOM = require("react-dom");

interface Props extends TranslatorProps {
    menuOpen: boolean;
    infoOpen: boolean;
    mode?: ReaderMode;
    settingsOpen: boolean;
    handleMenuClick: () => void;
    handleSettingsClick: () => void;
    fullscreen: boolean;
    handleFullscreenClick: () => void;
    handleReaderClose: () => void;
    handleReaderDetach: () => void;
    toggleBookmark: any;
    isOnBookmark: boolean;
    displayPublicationInfo: any;
    readerMenuProps: any;
    readerOptionsProps: any;
}

export class ReaderHeader extends React.Component<Props, undefined> {
    private enableFullscreenRef = createRef<HTMLButtonElement>();
    private disableFullscreenRef = createRef<HTMLButtonElement>();
    private settingsMenuButtonRef = createRef<HTMLButtonElement>();
    private navigationMenuButtonRef = createRef<HTMLButtonElement>();
    private infoMenuButtonRef = createRef<HTMLButtonElement>();

    public constructor(props: Props) {
        super(props);

        this.focusSettingMenuButton = this.focusSettingMenuButton.bind(this);
        this.focusNaviguationMenuButton = this.focusNaviguationMenuButton.bind(this);
    }

    public componentDidUpdate(oldProps: Props) {
        if (this.props.fullscreen !== oldProps.fullscreen) {
            if (this.props.fullscreen && this.disableFullscreenRef.current) {
                this.disableFullscreenRef.current.focus();
            } else if (!this.props.fullscreen && this.enableFullscreenRef.current) {
                this.enableFullscreenRef.current.focus();
            }
        }

        if (this.props.infoOpen !== oldProps.infoOpen &&
            this.props.infoOpen === false) {
                this.infoMenuButtonRef.current.focus();
            }
    }

    public render(): React.ReactElement<{}> {
        const { __ } = this.props;

        return (
            <nav
                className={styles.main_navigation}
                role="navigation"
                aria-label={ __("accessibility.homeMenu")}
                {...(this.props.fullscreen && {style: {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                }})}
            >
                <ul>
                    { !this.props.fullscreen ? <>
                        { (this.props.mode === ReaderMode.Attached) ? (
                            <li>
                                <button
                                    className={styles.menu_button}
                                    onClick={this.props.handleReaderClose}
                                >
                                    <SVG svg={BackIcon} title={ __("reader.navigation.backHomeTitle")}/>
                                </button>
                            </li>
                            ) : (<></>)
                        }
                        <li>
                            <button
                                className={styles.menu_button}
                                onClick={() => this.props.displayPublicationInfo()}
                                ref={this.infoMenuButtonRef}
                            >
                                <SVG svg={InfosIcon} title={ __("reader.navigation.infoTitle")}/>
                            </button>
                        </li>
                        { (this.props.mode === ReaderMode.Attached) ? (
                            <li>
                                <button
                                    className={styles.menu_button}
                                    onClick={this.props.handleReaderDetach}
                                >
                                    <SVG svg={DetachIcon} title={ __("reader.navigation.detachWindowTitle")}/>
                                </button>
                            </li>
                            ) : (<></>)
                        }
                        <ul className={styles.menu_option}>
                            <li
                                className={this.props.isOnBookmark && styles.active}
                            >
                                <input
                                    id="bookmarkButton"
                                    className={styles.bookmarkButton}
                                    type="checkbox"
                                    checked={this.props.isOnBookmark}
                                    onChange={this.props.toggleBookmark}
                                    aria-label={ __("reader.navigation.bookmarkTitle")}
                                />
                                <label
                                    htmlFor="bookmarkButton"
                                    className={styles.menu_button}
                                >
                                    <SVG svg={MarkIcon} title={ __("reader.navigation.bookmarkTitle")}/>
                                </label>
                            </li>
                            <li
                                className={this.props.settingsOpen && styles.active}
                            >
                                <button
                                className={styles.menu_button}
                                onClick={this.props.handleSettingsClick.bind(this)}
                                ref={this.settingsMenuButtonRef}
                                >
                                    <SVG svg={SettingsIcon} title={ __("reader.navigation.settingsTitle")}/>
                                </button>
                                <ReaderOptions {...this.props.readerOptionsProps}
                                focusSettingMenuButton={this.focusSettingMenuButton}/>
                            </li>
                            <li
                                className={this.props.menuOpen && styles.active}
                            >
                                <button
                                    className={styles.menu_button}
                                    onClick={this.props.handleMenuClick.bind(this)}
                                    ref={this.navigationMenuButtonRef}
                                >
                                <SVG svg={TOCIcon} title={ __("reader.navigation.openTableOfContentsTitle")}/>
                            </button>
                            <ReaderMenu {...this.props.readerMenuProps}
                            focusNaviguationMenu={this.focusNaviguationMenuButton}/>
                            </li>
                            <li  className={styles.blue}>
                                <button
                                className={styles.menu_button}
                                onClick={this.props.handleFullscreenClick}
                                ref={this.enableFullscreenRef}
                                >
                                <SVG svg={FullscreenIcon} title={ __("reader.navigation.fullscreenTitle")}/>
                                </button>
                            </li>
                        </ul>
                        {/*<li className={styles.right}>
                            <button
                                className={styles.menu_button}
                            >
                                <SVG svg={AudioIcon} title={ __("reader.navigation.readBookTitle")}/>
                            </button>
                        </li>*/}
                    </> :
                    <li  className={styles.right}>
                        <button
                            className={styles.menu_button}
                            onClick={this.props.handleFullscreenClick}
                            ref={this.disableFullscreenRef}
                        >
                            <SVG svg={QuitFullscreenIcon} title={ __("reader.navigation.quitFullscreenTitle")}/>
                        </button>
                    </li>
                }
                </ul>
            </nav>
        );
    }

    private focusSettingMenuButton() {
        const button = ReactDOM.findDOMNode(this.settingsMenuButtonRef.current) as HTMLButtonElement;

        button.focus();
    }

    private focusNaviguationMenuButton() {
        const button = ReactDOM.findDOMNode(this.navigationMenuButtonRef.current) as HTMLButtonElement;

        button.focus();
    }
}

export default withTranslator(ReaderHeader);
