// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import { TApiMethodName } from "readium-desktop/common/api/api.type";
import {
    apiDecorator, TApiDecorator,
} from "readium-desktop/renderer/common/decorators/api.decorator";
import {
    reduxConnectDecorator,
} from "readium-desktop/renderer/common/decorators/reduxConnect.decorator";
import {
    translatorDecorator,
} from "readium-desktop/renderer/common/decorators/translator.decorator";
import { ReactBaseComponent } from "readium-desktop/renderer/common/ReactBaseComponent";

import { ILibraryRootState } from "../../redux/states";
import { DisplayType } from "../../routing";
import LibraryLayout from "../layout/LibraryLayout";
import { CatalogGridView } from "./GridView";
import Header from "./Header";
import { CatalogListView } from "./ListView";

// tslint:disable-next-line: no-empty-interface
interface IProps {
}

const mapState = (state: ILibraryRootState) => ({
    location: state.router.location,
});

const refreshTriggerArray: TApiMethodName[] = [
        "publication/import",
        "publication/importOpdsPublicationLink",
        "publication/delete",
        "catalog/addEntry",
        "publication/updateTags",
        "reader/setLastReadingLocation",
    ];

@translatorDecorator
@reduxConnectDecorator(mapState)
@apiDecorator("catalog/get", refreshTriggerArray, () => [])
@apiDecorator("publication/getAllTags", refreshTriggerArray, () => [])
export default class Catalog extends ReactBaseComponent<
    IProps
    , undefined
    , ReturnType<typeof mapState>
    , undefined
    , TApiDecorator<"catalog/get"> & TApiDecorator<"publication/getAllTags">
    , ILibraryRootState
    > {

    constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactElement<{}> {
        const { __ } = this;

        const displayType = this.reduxState.location?.state?.displayType || DisplayType.Grid;

        const secondaryHeader = <Header/>;

        const catalog = this.api["catalog/get"].result;
        const tags = this.api["publication/getAllTags"].result;

        return (
            <LibraryLayout secondaryHeader={secondaryHeader} title={__("header.books")}>
                {
                    catalog?.data.result
                    && (
                        displayType === DisplayType.Grid
                            ? <CatalogGridView
                                catalogEntries={catalog.data.result.entries}
                                tags={(tags?.data.result) || []}
                            />
                            : <CatalogListView
                                catalogEntries={catalog.data.result.entries}
                                tags={(tags?.data.result) || []}
                            />
                    )
                }
            </LibraryLayout>
        );
    }
}
