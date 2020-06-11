// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as debug_ from "debug";
import { app, protocol } from "electron";
import * as path from "path";
import { takeSpawnEveryChannel } from "readium-desktop/common/redux/sagas/takeSpawnEvery";
import { compactDb, diMainGet, getLibraryWindowFromDi } from "readium-desktop/main/di";
import { needToPersistState } from "readium-desktop/main/redux/sagas/persist.ts";
import { IS_DEV } from "readium-desktop/preprocessor-directives";
import { call, fork, join, race, spawn, take } from "redux-saga/effects";
import { put } from "typed-redux-saga";

import { clearSessions } from "@r2-navigator-js/electron/main/sessions";

import { streamerActions } from "../actions";
import {
    getBeforeQuitEventChannel, getQuitEventChannel, getShutdownEventChannel,
    getWindowAllClosedEventChannel,
} from "./getEventChannel";

// Logger
const filename_ = "readium-desktop:main:saga:app";
const debug = debug_(filename_);

export function* init() {

    app.setAppUserModelId("io.github.edrlab.thorium");

    // moved to saga/persist.ts
    // app.on("window-all-closed", async () => {
    //     // At the moment, there are no menu items to revive / re-open windows,
    //     // so let's terminate the app on MacOS too.
    //     // if (process.platform !== "darwin") {
    //     //     app.quit();
    //     // }

    //     setTimeout(() => app.exit(0), 2000);
    // });

    app.on("accessibility-support-changed", (_ev, accessibilitySupportEnabled) => {
        debug(`accessibilitySupportEnabled: ${accessibilitySupportEnabled}`);
    });

    yield call(() => app.whenReady());

    debug("Main app ready");

    // register file protocol to link locale file to renderer
    protocol.registerFileProtocol("store",
        (request, callback) => {

            // Extract publication item relative url
            const relativeUrl = request.url.substr(6);
            const pubStorage = diMainGet("publication-storage");
            const filePath: string = path.join(pubStorage.getRootPath(), relativeUrl);
            callback(filePath);
        },
    );

    app.on("will-quit", () => {

        debug("#####");
        debug("will-quit");
        debug("#####");
    });

}

export function exit() {
    return spawn(function*() {

        const beforeQuitEventChannel = getBeforeQuitEventChannel();
        const shutdownEventChannel = getShutdownEventChannel();
        const windowAllClosedEventChannel = getWindowAllClosedEventChannel();
        const quitEventChannel = getQuitEventChannel();
        let shouldExit = process.platform !== "darwin" || IS_DEV;

        /*
        // events order :
        - before-quit
        - window-all-closed
        - quit
        */

        const exitNow = () => {

            // clean the db just before to quit
            compactDb()
                .then(() => {

                    debug("EXIT NOW");
                    app.exit(0);
                })
                .catch(() => {
                    // ignore
                });
        };

        const closeLibWinAndExit = () => {

            // track ctrl-q/command-q
            shouldExit = true;

            const libraryWin = getLibraryWindowFromDi();

            if (process.platform === "darwin") {
                if (libraryWin.isDestroyed()) {
                    return exitNow();
                }
            }

            libraryWin.close();
        };

        yield takeSpawnEveryChannel(
            beforeQuitEventChannel,
            (e: Electron.Event) => {

                debug("#####");
                debug("#####");
                debug("#####");

                debug("before-quit");

                debug("#####");
                debug("#####");
                debug("#####");

                e.preventDefault();

                closeLibWinAndExit();
            },
        );

        yield takeSpawnEveryChannel(
            shutdownEventChannel,
            (e: Electron.Event) => {

                debug("#####");
                debug("#####");
                debug("#####");

                debug("shutdown");

                debug("#####");
                debug("#####");
                debug("#####");

                e.preventDefault();

                closeLibWinAndExit();
            },
        );

        yield takeSpawnEveryChannel(
            windowAllClosedEventChannel,
            function*() {

                debug("#####");
                debug("#####");
                debug("#####");

                debug("window-all-closed");

                debug("#####");
                debug("#####");
                debug("#####");

                // clear session in r2-navigator
                const t1 = yield fork(function*() {
                    try {
                        yield call(clearSessions);
                    } catch (e) {
                        debug("ERROR to clearSessions", e);
                    }
                });
                const t2 = yield fork(needToPersistState);

                join(t1);
                join(t2);

                yield put(streamerActions.stopRequest.build());

                yield race({
                    a: take(streamerActions.stopSuccess.ID),
                    b: take(streamerActions.stopError.ID),
                });

                if (shouldExit) {
                    exitNow();
                }
            },
        );

        yield takeSpawnEveryChannel(
            quitEventChannel,
            function*() {

                debug("#####");
                debug("#####");
                debug("#####");

                debug("quit");

                debug("#####");
                debug("#####");
                debug("#####");
            },
        );
    });
}
