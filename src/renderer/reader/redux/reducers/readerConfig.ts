// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { ReaderConfig } from "readium-desktop/common/models/reader";
import { readerConfigInitialState } from "readium-desktop/common/redux/states/reader";

import * as setConfig from "../actions/setConfig";

export function readerConfigReducer(
    state: ReaderConfig = readerConfigInitialState,
    action: setConfig.TAction,
): ReaderConfig {

    switch (action.type) {
        case setConfig.ID:

            return {
                ...action.payload,
                ...state,
            };
        default:
            return state;
    }
}
