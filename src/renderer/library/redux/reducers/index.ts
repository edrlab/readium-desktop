// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { connectRouter } from "connected-react-router";
import { History } from "history";
import {
    downloadActions, publicationActions, readerActions,
} from "readium-desktop/common/redux/actions";
import { dialogReducer } from "readium-desktop/common/redux/reducers/dialog";
import { i18nReducer } from "readium-desktop/common/redux/reducers/i18n";
import { keyboardReducer } from "readium-desktop/common/redux/reducers/keyboard";
// import { netReducer } from "readium-desktop/common/redux/reducers/net";
import { toastReducer } from "readium-desktop/common/redux/reducers/toast";
// import { updateReducer } from "readium-desktop/common/redux/reducers/update";
import { apiReducer } from "readium-desktop/renderer/common/redux/reducers/api";
import { loadReducer } from "readium-desktop/renderer/common/redux/reducers/load";
import { winReducer } from "readium-desktop/renderer/common/redux/reducers/win";
// import { downloadReducer } from "readium-desktop/renderer/library/redux/reducers/download";
import { historyReducer } from "readium-desktop/renderer/library/redux/reducers/history";
import {
    opdsBreadcrumbReducer, opdsHeaderLinkReducer, opdsSearchLinkReducer,
} from "readium-desktop/renderer/library/redux/reducers/opds";
import { IRouterLocationState } from "readium-desktop/renderer/library/routing";
import { priorityQueueReducer } from "readium-desktop/utils/redux-reducers/pqueue.reducer";
import { Action, combineReducers } from "redux";

import { ILibraryRootState } from "../states";

export const rootReducer = (history: History<IRouterLocationState>) => {
    return combineReducers<ILibraryRootState>({
        i18n: i18nReducer,
        opds: combineReducers({
            browser: combineReducers({
                breadcrumb: opdsBreadcrumbReducer,
                header: opdsHeaderLinkReducer,
                search: opdsSearchLinkReducer,
            }),
        }),
        win: winReducer,
        // net: netReducer,
        // update: updateReducer,
        api: apiReducer,
        dialog: dialogReducer,
        router: connectRouter<IRouterLocationState>(history),
        toast: toastReducer,
        download: priorityQueueReducer
            <
                downloadActions.progress.TAction,
                downloadActions.done.TAction,
                downloadActions.progress.Payload,
                number
            >(
                {
                    push: {
                        type: downloadActions.progress.ID,
                        selector: (action) =>
                            [action.payload, action.payload.id],
                    },
                    pop: {
                        type: downloadActions.done.ID,
                        selector: (action) => [undefined, action.payload.id],
                    },
                    sortFct: (a, b) => b[1] - a[1],
                },
            ),
        history: historyReducer,
        // just to recall 'catalog/get' when readerActions.setReduxState is dispatched
        updateCatalog: (state = 0, action: Action) =>
            (
                action.type === readerActions.setReduxState.ID
                || action.type === publicationActions.publicationUpdated.ID
            )
                ? Number(state) + 1
                : state,
        keyboard: keyboardReducer,
        load: loadReducer,
    });
};
