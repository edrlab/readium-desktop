// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { TApiMethodName } from "readium-desktop/main/api/api.type";
import { TMethodApi, TModuleApi } from "readium-desktop/main/di";
import { diRendererGet } from "readium-desktop/renderer/di";
import { ApiLastSuccess } from "readium-desktop/renderer/redux/states/api";

export function apiRefresh(pathArrayToRefresh: TApiMethodName[], cb: () => void | Promise<void>) {
    const store = diRendererGet("store");
    let lastSuccess: ApiLastSuccess | undefined;

    cb();

    return store.subscribe(() => {
        const state = store.getState();
        const apiLastSuccess = state.api.lastSuccess;
        const lastSuccessDate = (lastSuccess && lastSuccess.date) || 0;

        if (!apiLastSuccess || apiLastSuccess.date <= lastSuccessDate) {
            return;
        }

        // New api success
        lastSuccess = apiLastSuccess;

        const meta = apiLastSuccess.action.meta.api;
        if (pathArrayToRefresh.find((path) => {
            const moduleId = path.split("/")[0] as TModuleApi;
            const methodId = path.split("/")[1] as TMethodApi;
            return meta.methodId === methodId && meta.moduleId === moduleId;
        })) {
            cb();
        }
    });
}
