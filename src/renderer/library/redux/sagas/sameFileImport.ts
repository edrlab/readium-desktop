// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as debug_ from "debug";
import { ToastType } from "readium-desktop/common/models/toast";
import { importActions, toastActions } from "readium-desktop/common/redux/actions";
import { takeSpawnLeading } from "readium-desktop/common/redux/sagas/takeSpawnLeading";
import { select as selectTyped } from "typed-redux-saga/macro";
import { apiSaga } from "readium-desktop/renderer/common/redux/sagas/api";
import { diLibraryGet } from "readium-desktop/renderer/library/di";
import { ILibraryRootState } from "readium-desktop/renderer/library/redux/states";
import { all, put } from "redux-saga/effects";

const REQUEST_ID = "SAME_FILE_IMPORT_REQUEST";

// Logger
const filename_ = "readium-desktop:renderer:redux:saga:same-file-import";
const debug = debug_(filename_);

function* sameFileImport(action: importActions.verify.TAction) {

    const { link, pub } = action.payload;

    const downloads = yield* selectTyped(
        (state: ILibraryRootState) => state.download);

    if (Array.isArray(downloads)
        && downloads.map(([{ downloadUrl }]) => downloadUrl).find((ln) => ln === link.url)) {

        const translator = diLibraryGet("translator");

        yield put(
            toastActions.openRequest.build(
                ToastType.Success,
                translator.translate("message.import.alreadyImport",
                    {
                        title: pub.title || "",
                    },
                ),
            ),
        );

    } else {

        yield apiSaga("publication/importFromLink",
            REQUEST_ID,
            link,
            pub,
        );
    }
}

export function saga() {
    return all([
        takeSpawnLeading(
            importActions.verify.ID,
            sameFileImport,
            (e) => debug(e),
        ),
    ]);
}
