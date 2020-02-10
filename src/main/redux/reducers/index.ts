// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { readerActions } from "readium-desktop/common/redux/actions";
import { i18nReducer } from "readium-desktop/common/redux/reducers/i18n";
// import { netReducer } from "readium-desktop/common/redux/reducers/net";
// import { updateReducer } from "readium-desktop/common/redux/reducers/update";
import { appReducer } from "readium-desktop/main/redux/reducers/app";
import { streamerReducer } from "readium-desktop/main/redux/reducers/streamer";
import { RootState } from "readium-desktop/main/redux/states";
import { priorityQueueReducer } from "readium-desktop/utils/redux-reducers/pqueue.reducer";
import { combineReducers } from "redux";

import { publicationActions } from "../actions";
import { lcpReducer } from "./lcp";
import { readerDefaultConfigReducer } from "./reader/defaultConfig";
import { winRegistryReaderReducer } from "./win/registry/reader";
import { winSessionLibraryReducer } from "./win/session/library";
import { winSessionReaderReducer } from "./win/session/reader";
import { winModeReducer } from "./win/winModeReducer";

export const rootReducer = combineReducers<RootState>({
    streamer: streamerReducer,
    i18n: i18nReducer,
    reader: combineReducers({
        defaultConfig: readerDefaultConfigReducer,
    }),
    // net: netReducer,
    // update: updateReducer,
    app: appReducer,
    win: combineReducers({
        session: combineReducers({
            library: winSessionLibraryReducer,
            reader: winSessionReaderReducer,
        }),
        registry: combineReducers({
            reader: winRegistryReaderReducer,
        }),
    }),
    mode: winModeReducer,
    lcp: lcpReducer,
    publication: combineReducers({
        lastReadingQueue: priorityQueueReducer
            <
                readerActions.setReduxState.TAction,
                publicationActions.deletePublication.TAction
            >(
                {
                    push: {
                        type: readerActions.setReduxState.ID,
                        selector: (action) =>
                            [(new Date()).getTime(), action.payload.reduxState?.info?.publicationIdentifier],
                    },
                    pop: {
                        type: publicationActions.deletePublication.ID,
                        selector: (action) => [undefined, action.payload.publicationIdentifier],
                    },
                    sortFct: (a, b) => b[0] - a[0],
                },
            ),
    }),
});
