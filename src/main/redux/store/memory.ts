// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as debug_ from "debug";
import { app } from "electron";
import { clone } from "ramda";
import { LocaleConfigIdentifier, LocaleConfigValueType } from "readium-desktop/common/config";
import { LocatorType } from "readium-desktop/common/models/locator";
import { TBookmarkState } from "readium-desktop/common/redux/states/bookmark";
import { AvailableLanguages } from "readium-desktop/common/services/translator";
import { ConfigDocument } from "readium-desktop/main/db/document/config";
import { PublicationDocument } from "readium-desktop/main/db/document/publication";
import { ConfigRepository } from "readium-desktop/main/db/repository/config";
import { CONFIGREPOSITORY_REDUX_PERSISTENCE, diMainGet } from "readium-desktop/main/di";
import { reduxSyncMiddleware } from "readium-desktop/main/redux/middleware/sync";
import { rootReducer } from "readium-desktop/main/redux/reducers";
import { rootSaga } from "readium-desktop/main/redux/sagas";
import { RootState } from "readium-desktop/main/redux/states";
import { IS_DEV } from "readium-desktop/preprocessor-directives";
import { ObjectKeys } from "readium-desktop/utils/object-keys-values";
import { PromiseAllSettled } from "readium-desktop/utils/promise";
import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import { reduxPersistMiddleware } from "../middleware/persistence";
import { IDictWinRegistryReaderState } from "../states/win/registry/reader";

// import { composeWithDevTools } from "remote-redux-devtools";
const REDUX_REMOTE_DEVTOOLS_PORT = 7770;

// Logger
const debug = debug_("readium-desktop:main:store:memory");

const defaultLocale = (): LocaleConfigValueType => {
    const loc = app.getLocale().split("-")[0];
    const langCodes = ObjectKeys(AvailableLanguages);
    const lang = langCodes.find((l) => l === loc) || "en";

    return {
        locale: lang,
    };
};

// can be safely removed
// introduce in a thorium previous version
//
// async function absorbLocatorRepositoryToReduxState() {

//     const locatorRepository = diMainGet("locator-repository");
//     const locatorFromDb = await locatorRepository.find(
//         {
//             selector: { locatorType: LocatorType.LastReadingLocation },
//             sort: [{ updatedAt: "asc" }],
//         },
//     );


//     const lastReadingQueue: TPQueueState = [];
//     const registryReader: IDictWinRegistryReaderState = {};

//     for (const locator of locatorFromDb) {
//         if (locator.publicationIdentifier) {

//             lastReadingQueue.push([locator.createdAt, locator.publicationIdentifier]);

//             registryReader[locator.publicationIdentifier] = {
//                 windowBound: {
//                     width: 800,
//                     height: 600,
//                     x: 0,
//                     y: 0,
//                 },
//                 reduxState: {
//                     config: readerConfigInitialState,
//                     locator: LocatorExtendedWithLocatorOnly(locator.locator),
//                     bookmark: undefined,
//                     info: {
//                         publicationIdentifier: locator.publicationIdentifier,
//                         manifestUrlR2Protocol: undefined,
//                         manifestUrlHttp: undefined,
//                         filesystemPath: undefined,
//                         r2Publication: undefined,
//                         publicationView: undefined,
//                     },
//                     highlight: {
//                         handler: undefined,
//                         mounter: undefined,
//                     },
//                 },
//             };

//             await locatorRepository.delete(locator.identifier);
//         }
//     }

//     if (lastReadingQueue.length === 0 && ObjectKeys(registryReader).length === 0) {
//         return undefined;
//     }

//     return {
//         lastReadingQueue,
//         registryReader,
//     };
// }

const absorbBookmarkToReduxState = async (registryReader: IDictWinRegistryReaderState) => {

    const locatorRepository = diMainGet("locator-repository");

    const bookmarkFromDb = await locatorRepository.find(
        {
            selector: { locatorType: LocatorType.Bookmark },
            sort: [{ updatedAt: "asc" }],
        },
    );

    let counter = 0;

    for (const locator of bookmarkFromDb) {
        if (locator.publicationIdentifier) {

            const reader = registryReader[locator.publicationIdentifier]?.reduxState;
            if (reader) {


                // this is not a set reducer but a map reducer
                // so there is no merge with union set method
                const bookmarkFromRedux = reader.bookmark;
                const bookmarkFromPouchdbFiltered = bookmarkFromDb.filter((_v) => {
                    return !bookmarkFromRedux.find(([,v]) => v.uuid === _v.identifier);
                });
                const bookmarkFromPouchdbConverted = bookmarkFromPouchdbFiltered.reduce<TBookmarkState>((pv, cv) => [
                    ...pv,
                    [
                        ++counter,
                        {
                            uuid: cv.identifier,
                            name: cv.name || "",
                            locator: cv.locator,
                        },
                    ],
                ], []);

                const bookmark = [
                    ...bookmarkFromRedux,
                    ...bookmarkFromPouchdbConverted,
                ];

                reader.bookmark = bookmark;
            }
        }

    }

    return registryReader;
};

const absorbPublicationToReduxState = async (pubs: PublicationDocument[]) => {

    const publicationRepository = diMainGet("publication-repository");

    const pubsFromDb = await publicationRepository.findAll();

    let newPubs = pubs;
    for (const pub of pubsFromDb) {
        const { identifier } = pub;
        const idx = newPubs.findIndex((v) => v.identifier === identifier);

        if (newPubs[idx]) {

            if (newPubs[idx].doNotMigrateAnymore) {
                continue;
            }

            newPubs = [
                ...newPubs.slice(0, idx),
                ...[
                    clone(pub),
                ],
                ...newPubs.slice(idx + 1),
            ];
        } else {
            newPubs = [
                ...newPubs,
                ...[
                    clone(pub),
                ],
            ];
        }
    }

    return newPubs;
};

export async function initStore(configRepository: ConfigRepository<any>)
    : Promise<[Store<RootState>, SagaMiddleware<object>]> {

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

    const reduxStateWin = reduxStateWinRepository?.value?.win
        ? reduxStateWinRepository.value
        : undefined;

    const i18n = i18nStateRepository?.value?.locale
        ? i18nStateRepository.value
        : defaultLocale();

    // new version of THORIUM
    // the migration can be safely removed
    //
    // try {
    //     // executed once time for locatorRepository to ReduxState migration
    //     const locatorRepositoryAbsorbed = await absorbLocatorRepositoryToReduxState();

    //     if (locatorRepositoryAbsorbed) {
    //         reduxStateWin = {
    //             ...reduxStateWin,
    //             ...{
    //                 publication: {
    //                     lastReadingQueue: Ramda.uniqBy(
    //                         (item) => item[1],
    //                         Ramda.concat(
    //                             reduxStateWin.publication.lastReadingQueue,
    //                             locatorRepositoryAbsorbed.lastReadingQueue,
    //                         ),
    //                     ),
    //                 },
    //             },
    //             ...{
    //                 win: {
    //                     session: {
    //                         library: reduxStateWin.win.session.library,
    //                         reader: reduxStateWin.win.session.reader,
    //                     },
    //                     registry: {
    //                         reader: {
    //                             ...locatorRepositoryAbsorbed.registryReader,
    //                             ...reduxStateWin.win.registry.reader,
    //                         },
    //                     },
    //                 },
    //             },
    //         };
    //     }
    // } catch (err) {
    //     debug("ERR on absorbLocatorRepositoryToReduxState", err);
    // }

    try {

        // Be carefull not an object copy / same reference
        reduxStateWin.win.registry.reader =
            await absorbBookmarkToReduxState(reduxStateWin.win.registry.reader);

    } catch (e) {

        debug("ERR on absorb bookmark to redux state", e);
    }

    try {

        // Be carefull not an object copy / same reference
        reduxStateWin.publication.db =
            await absorbPublicationToReduxState(reduxStateWin.publication.db);

    } catch (e) {

        debug("ERR on absorb publication to redux state", e);
    }

    const preloadedState = {
        ...reduxStateWin,
        ...{
            i18n,
        },
    };

    const sagaMiddleware = createSagaMiddleware();

    const mware = applyMiddleware(
        reduxSyncMiddleware,
        sagaMiddleware,
        reduxPersistMiddleware,
    );

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const middleware = IS_DEV ? require("remote-redux-devtools").composeWithDevTools(
        {
            port: REDUX_REMOTE_DEVTOOLS_PORT,
        },
    )(mware) : mware;

    const store = createStore(
        rootReducer,
        preloadedState,
        middleware,
    );

    sagaMiddleware.run(rootSaga);

    return [store as Store<RootState>, sagaMiddleware];
}
