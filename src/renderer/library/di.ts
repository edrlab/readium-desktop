// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import "reflect-metadata";

import { createHashHistory, History } from "history";
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { Translator } from "readium-desktop/common/services/translator";
import {
    diRendererSymbolTable as diSymbolTable,
} from "readium-desktop/renderer/library/diSymbolTable";
import { RootState } from "readium-desktop/renderer/library/redux/states";
import { initStore } from "readium-desktop/renderer/library/redux/store/memory";
import { Store } from "redux";

import MainApp from "./components/App";
import { IRouterLocationState } from "./routing";

// Create container used for dependency injection
const container = new Container();

console.log("di lib");

// Create store
const history: History<IRouterLocationState> = createHashHistory();
container.bind<History>(diSymbolTable.history).toConstantValue(history);

const store = initStore(history);
container.bind<Store<RootState>>(diSymbolTable.store).toConstantValue(store);

// Create translator
const translator = new Translator();
container.bind<Translator>(diSymbolTable.translator).toConstantValue(translator);

container.bind<typeof MainApp>(diSymbolTable["react-main-app"]).toConstantValue(MainApp);

// local interface to force type return
interface IGet {
    (s: "history"): History;
    (s: "store"): Store<RootState>;
    (s: "translator"): Translator;
    (s: "react-main-app"): typeof MainApp;
}

// export function to get back depedency from container
// the type any for container.get is overloaded by IGet
const diGet: IGet = (symbol: keyof typeof diSymbolTable) => container.get<any>(diSymbolTable[symbol]);

const {
    lazyInject,
    lazyInjectNamed,
    lazyInjectTagged,
    lazyMultiInject,
} = getDecorators(container);

export {
    diGet as diLibraryGet,
    lazyInject,
    lazyInjectNamed,
    lazyInjectTagged,
    lazyMultiInject,
};
