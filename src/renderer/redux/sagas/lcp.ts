// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { DialogTypeName } from "readium-desktop/common/models/dialog";
import { lcpActions } from "readium-desktop/common/redux/actions";
import { dialogActions } from "readium-desktop/common/redux/actions/";
import { selectTyped, takeTyped } from "readium-desktop/common/redux/typed-saga";
import { SagaIterator } from "redux-saga";
import { all, call, put } from "redux-saga/effects";

import { RootState } from "../states";

function* lcpUserKeyCheckRequestWatcher(): SagaIterator {
    while (true) {
        const action = yield* takeTyped(lcpActions.userKeyCheckRequest.build);

        const { hint, publicationView, message } = action.payload;

        const isReader = yield* selectTyped((state: RootState) => {
            return typeof state.reader.reader !== "undefined";
        });
        if (isReader) {
            // passphrase dialog only in library/bookshelf view
            // already-opened reader BrowserWindows (distinct renderer processes)
            // must not display the popup dialog!
            continue;
        }

        // will call API.unlockPublicationWithPassphrase()
        yield put(dialogActions.openRequest.build(DialogTypeName.LcpAuthentication,
            {
                publicationView,
                hint,
                message,
            },
        ));
    }
}

export function* watchers() {
    yield all([
        call(lcpUserKeyCheckRequestWatcher),
    ]);
}
