// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { ReaderConfig } from "readium-desktop/common/models/reader";
import { Action } from "readium-desktop/common/models/redux";

export const ID = "READER_CONFIG_SET_REQUEST";

export interface Payload {
    config: ReaderConfig;
}

export function build(config: ReaderConfig):
    Action<typeof ID, Payload> {

    return {
        type: ID,
        payload: {
            config,
        },
    };
}
build.toString = () => ID; // Redux StringableActionCreator
