// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
    OPDS_AUTH_ENCRYPTION_IV_HEX, OPDS_AUTH_ENCRYPTION_KEY_HEX,
} from "readium-desktop/common/models/opds";
import { OpdsResultView } from "readium-desktop/common/views/opds";
import { apiAction } from "readium-desktop/renderer/apiAction";
import * as styles from "readium-desktop/renderer/assets/styles/dialog.css";
import {
    TranslatorProps, withTranslator,
} from "readium-desktop/renderer/components/utils/hoc/translator";
import { RootState } from "readium-desktop/renderer/redux/states";
import { IOpdsBrowse } from "readium-desktop/renderer/routing";
import { TMouseEvent } from "readium-desktop/typings/react";
import { TDispatch } from "readium-desktop/typings/redux";

// tslint:disable-next-line: no-empty-interface
interface IBaseProps extends TranslatorProps {
    data: OpdsResultView;
    url: string;
    browseOpds: (url: string) => void;
}
// IProps may typically extend:
// RouteComponentProps
// ReturnType<typeof mapStateToProps>
// ReturnType<typeof mapDispatchToProps>
// tslint:disable-next-line: no-empty-interface
interface IProps extends IBaseProps,
    RouteComponentProps<IOpdsBrowse>,
    ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
}

interface IState {
    login: string | undefined;
    password: string | undefined;
}

class OPDSAuth extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            login: undefined,
            password: undefined,
        };

        this.submit = this.submit.bind(this);
    }

    public render(): React.ReactElement<IProps>  {
        const { login, password } = this.state;
        return (
            <section>
                <h2>{this.props.data.title}</h2>
                {this.props.data.auth.logoImageUrl && <><hr></hr><img
                    src={this.props.data.auth.logoImageUrl}
                    role="presentation"
                    alt=""
                /><hr></hr></>}
                <form>
                        <div className={styles.field}>
                            <label>{this.props.data.auth.labelLogin}</label>
                            <br></br>
                            <input
                                onChange={(e) => this.setState({
                                    login: e.target.value,
                                })}
                                type="text"
                                aria-label={this.props.data.auth.labelLogin}
                                placeholder={this.props.data.auth.labelLogin}
                                defaultValue={login}
                            />
                        </div>
                        <br></br>
                        <div className={styles.field}>
                            <label>{this.props.data.auth.labelPassword}</label>
                            <br></br>
                            <input
                                onChange={(e) => this.setState({
                                    password: e.target.value,
                                })}
                                type="password"
                                aria-label={this.props.data.auth.labelPassword}
                                placeholder={this.props.data.auth.labelPassword}
                                defaultValue={password}
                            />
                        </div>
                        <br></br>
                        <div>
                            <input
                                disabled={!login || !password}
                                type="submit"
                                value={this.props.__("library.lcp.submit")}
                                onClick={this.submit}
                            />
                        </div>
                    </form>
            </section>
        );
    }

    public submit(e: TMouseEvent) {
        e.preventDefault();

        function hexStrToArrayBuffer(hexStr: string) {
            return new Uint8Array(
                hexStr
                .match(/.{1,2}/g)
                .map((byte) => {
                    return parseInt(byte, 16);
                }),
            );
        }
        const textEncoder = new TextEncoder();
        const passwordEncoded = textEncoder.encode(this.state.password); // Uint8Array

        const keyPromise = window.crypto.subtle.importKey(
            "raw",
            hexStrToArrayBuffer(OPDS_AUTH_ENCRYPTION_KEY_HEX),
            { name: "AES-CBC", length: 256 },
            false,
            ["encrypt", "decrypt"],
        );
        keyPromise.then((key) => { // CryptoKey

            const iv = hexStrToArrayBuffer(OPDS_AUTH_ENCRYPTION_IV_HEX);
            const encryptedPasswordPromise = window.crypto.subtle.encrypt(
                {
                    name: "AES-CBC",
                    iv,
                },
                key,
                passwordEncoded,
            );
            encryptedPasswordPromise.then((encryptedPassword) => { // ArrayBuffer
                // const arg = String.fromCharCode.apply(null, new Uint8Array(encryptedPassword));
                const arg = new Uint8Array(encryptedPassword).reduce((data, byte) => {
                    return data + String.fromCharCode(byte);
                }, "");
                const encryptedPasswordB64 = window.btoa(arg);

                apiAction("opds/oauth",
                    this.props.url,
                    this.state.login,
                    encryptedPasswordB64,
                    this.props.data.auth.oauthUrl,
                    this.props.data.auth.oauthRefreshUrl,
                    OPDS_AUTH_ENCRYPTION_KEY_HEX,
                    OPDS_AUTH_ENCRYPTION_IV_HEX)
                .then((okay) => {
                    console.log("SUCCESS fetch api opds/oauth");
                    if (okay) {
                        this.props.browseOpds(this.props.url);
                    }
                })
                .catch((err) => {
                    console.error("Error to fetch api opds/oauth", err);
                });
            }, (err) => {
                console.log(err);
            });
        }, (err) => {
            console.log(err);
        });
    }
}

const mapStateToProps = (_state: RootState, _props: IBaseProps) => ({
});

const mapDispatchToProps = (_dispatch: TDispatch, _props: IBaseProps) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTranslator(OPDSAuth)));