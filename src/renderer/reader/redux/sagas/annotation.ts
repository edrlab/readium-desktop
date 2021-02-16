// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { nanoid } from "nanoid";
import { takeSpawnEvery } from "readium-desktop/common/redux/sagas/takeSpawnEvery";
import { SagaIterator } from "redux-saga";
import { all, put } from "redux-saga/effects";

import { readerLocalActionHighlights, readerLocalActionSetLocator } from "../actions";
import { IHighlightHandlerState } from "../state/highlight";

//
// WIP
// DEMO HIGHLIGHT HANDLER
//

function* selectionInfoWatcher(action: readerLocalActionSetLocator.TAction): SagaIterator {
    const {
        selectionInfo,
        selectionIsNew,
        locator: { href },
    } = action.payload;

    if (
        selectionInfo
        && selectionIsNew
    ) {

        const def: IHighlightHandlerState = {
            uuid: nanoid(),
            type: "annotation",
            href,
            def: {
                color: {
                    red: 255,
                    green: 0,
                    blue: 0,
                },
                selectionInfo,
            },
        };
        yield put(readerLocalActionHighlights.handler.push.build(def));
    }
}

export const saga = () =>
    all([
        takeSpawnEvery(
            readerLocalActionSetLocator.ID,
            selectionInfoWatcher,
            (e) => console.log("readerLocalActionSetLocator", e),
        ),
        takeSpawnEvery(
            readerLocalActionSetLocator.ID,
            () => console.log("hello"),
            (e) => console.log("readerLocalActionSetLocator", e),
        ),
    ]);
