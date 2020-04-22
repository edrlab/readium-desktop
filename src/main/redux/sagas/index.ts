// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { all, call, take } from "redux-saga/effects";

import { appActions } from "../actions";
import * as api from "./api";
import * as app from "./app";
import * as i18n from "./i18n";
import * as ipc from "./ipc";
// import { netStatusWatcher } from "./net";
import * as keyboard from "./keyboard";
import * as persist from "./persist";
import * as reader from "./reader";
import * as streamer from "./streamer";
import * as win from "./win";

// import { updateStatusWatcher } from "./update";

function* appInitSuccessWatcher() {

    yield take(appActions.initSuccess.ID);

    yield all([
        call(api.watchers),

        // Net
        // call(netStatusWatcher),

        // Streamer
        call(streamer.watchers),

        call(keyboard.watchers),

        // Update checker
        // call(updateStatusWatcher),

        // Reader
        call(win.reader.watchers),

        call(win.library.watchers),

        call(win.session.library.watchers),
        call(win.session.reader.watchers),

        call(ipc.watchers),

        call(reader.watchers),

        // data persist to FS
        call(persist.watchers),

    ]);
}

export function* rootSaga() {
    yield all([

        // App
        call(app.watchers),

        call(appInitSuccessWatcher),

        // I18N
        call(i18n.watchers),

    ]);
}
