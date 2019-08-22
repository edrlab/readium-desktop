// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import {
    ReaderConfig, ReaderMode,
} from "readium-desktop/common/models/reader";
import { Reader } from "readium-desktop/renderer/components/reader/Reader";

export interface ReaderState {
    // Base url of started server
    readerCount: number;

    // Config for all readers
    config: ReaderConfig;

    mode: ReaderMode;

    reader: Reader;
}
