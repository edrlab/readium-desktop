// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { ReaderConfig, ReaderInfo } from "readium-desktop/common/models/reader";
import { ICommonRootState } from "readium-desktop/common/redux/states/renderer/commonRootState";

import { Locator } from "@r2-shared-js/models/locator";

export interface IReaderRootState extends ICommonRootState {
    reader: IReaderStateReader;
}

export interface IReaderStateReader {
    config: ReaderConfig;
    info: ReaderInfo;
    locator: Locator;
}