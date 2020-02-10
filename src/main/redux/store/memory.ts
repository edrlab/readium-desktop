// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as debug_ from "debug";
import { app } from "electron";
import * as Ramda from "ramda";
import { LocaleConfigIdentifier, LocaleConfigValueType } from "readium-desktop/common/config";
import { LocatorType } from "readium-desktop/common/models/locator";
import { readerConfigInitialState } from "readium-desktop/common/redux/states/reader";
import { AvailableLanguages } from "readium-desktop/common/services/translator";
import { PromiseAllSettled } from "readium-desktop/common/utils/promise";
import { ConfigDocument } from "readium-desktop/main/db/document/config";
import { ConfigRepository } from "readium-desktop/main/db/repository/config";
import { CONFIGREPOSITORY_REDUX_PERSISTENCE, diMainGet } from "readium-desktop/main/di";
import { reduxSyncMiddleware } from "readium-desktop/main/redux/middleware/sync";
import { rootReducer } from "readium-desktop/main/redux/reducers";
import { rootSaga } from "readium-desktop/main/redux/sagas";
import { RootState } from "readium-desktop/main/redux/states";
import { ObjectKeys } from "readium-desktop/utils/object-keys-values";
import { TPQueueState } from "readium-desktop/utils/redux-reducers/pqueue.reducer";
import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "remote-redux-devtools";

import { reduxPersistMiddleware } from "../middleware/persistence";
import { IDictWinRegistryReaderState } from "../states/win/registry/reader";

// Logger
const debug = debug_("readium-desktop:main:store:memory");

const REDUX_REMOTE_DEVTOOLS_PORT = 7770;

const defaultLocale = (): LocaleConfigValueType => {
    const loc = app.getLocale().split("-")[0];
    const langCodes = ObjectKeys(AvailableLanguages);
    const lang = langCodes.find((l) => l === loc) || "en";

    return {
        locale: lang,
    };
};

async function absorbLocatorRepositoryToReduxState() {

    const locatorRepository = diMainGet("locator-repository");
    const locatorFromDb = await locatorRepository.find(
        {
            selector: { locatorType: LocatorType.LastReadingLocation },
            sort: [{ updatedAt: "asc" }],
        },
    );

    const lastReadingQueue: TPQueueState = [];
    const registryReader: IDictWinRegistryReaderState = {};

    for (const locator of locatorFromDb) {
        if (locator.publicationIdentifier) {

            debug("LOCATOR in DB", locator);

            lastReadingQueue.push([locator.createdAt, locator.publicationIdentifier]);

            registryReader[locator.publicationIdentifier] = {
                windowBound: {
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0,
                },
                reduxState: {
                    config: readerConfigInitialState,
                    locator: locator.locator,
                    info: {
                        publicationIdentifier: locator.publicationIdentifier,
                        manifestUrl: undefined,
                        filesystemPath: undefined,
                    },
                },
            };

            // disable at the moment, beta test
            // await locatorRepository.delete(locator.identifier);
        }
    }

    if (lastReadingQueue.length === 0 && ObjectKeys(registryReader).length === 0) {
        return undefined;
    }

    return {
        lastReadingQueue,
        registryReader,
    };
}

export async function initStore(configRepository: ConfigRepository<any>): Promise<Store<RootState>> {

    let reduxStateWinRepository: ConfigDocument<Partial<RootState>>;
    let i18nStateRepository: ConfigDocument<LocaleConfigValueType>;

    try {
        const reduxStateRepositoryPromise = configRepository.get(CONFIGREPOSITORY_REDUX_PERSISTENCE);

        const i18nStateRepositoryPromise = configRepository.get(LocaleConfigIdentifier);

        const [
            reduxStateRepositoryResult,
            i18nStateRepositoryResult,
        ] = await PromiseAllSettled(
            [
                reduxStateRepositoryPromise,
                i18nStateRepositoryPromise,
            ],
        );

        if (reduxStateRepositoryResult.status === "fulfilled") {
            reduxStateWinRepository = reduxStateRepositoryResult.value;
        }
        if (i18nStateRepositoryResult.status === "fulfilled") {
            i18nStateRepository = i18nStateRepositoryResult.value;
        }
    } catch (err) {
        // ignore
        // first init
        debug("ERR when get state from FS", err);
    }

    let reduxStateWin = reduxStateWinRepository?.value?.win
        ? reduxStateWinRepository.value
        : undefined;

    const i18n = i18nStateRepository?.value?.locale
                ? i18nStateRepository.value
                : defaultLocale();

    try {
        // executed once time for locatorRepository to ReduxState migration
        const locatorRepositoryAbsorbed = await absorbLocatorRepositoryToReduxState();

        if (locatorRepositoryAbsorbed) {
            reduxStateWin = {
                ...reduxStateWin,
                ...{
                    publication: {
                        lastReadingQueue: Ramda.uniqBy(
                            (item) => item[1],
                            Ramda.concat(
                                reduxStateWin.publication.lastReadingQueue,
                                locatorRepositoryAbsorbed.lastReadingQueue,
                            ),
                        ),
                    },
                },
                ...{
                    win: {
                        session: {
                            library: undefined,
                            reader: undefined,
                        },
                        registry: {
                            reader: {
                                ...locatorRepositoryAbsorbed.registryReader,
                                ...reduxStateWin.win.registry.reader,
                            },
                        },
                    },
                },
            };
        }
    } catch (err) {
        debug("ERR on absorbLocatorRepositoryToReduxState", err);
    }

    const preloadedState = {
        ...reduxStateWin,
        ...{
            i18n,
        },
    };

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            {
                port: REDUX_REMOTE_DEVTOOLS_PORT,
            },
        )(
            applyMiddleware(
                reduxSyncMiddleware,
                sagaMiddleware,
                reduxPersistMiddleware,
            ),
        ),
    );

    sagaMiddleware.run(rootSaga);

    return store as Store<RootState>;
}
