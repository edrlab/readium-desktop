
import { combineReducers } from "redux";

import {
    windowReducer,
} from "readium-desktop/renderer/reducers/window";

import {
    messageReducer,
} from "readium-desktop/renderer/reducers/message";

import { i18nReducer } from "readium-desktop/common/redux/reducers/i18n";

import { winReducer } from "./win";

import { catalogReducer } from "readium-desktop/common/redux/reducers/catalog";
import { netReducer } from "readium-desktop/common/redux/reducers/net";
import { opdsReducer } from "readium-desktop/common/redux/reducers/opds";
import {
    publicationDownloadReducer,
} from "readium-desktop/common/redux/reducers/publication-download";
import { readerReducer } from "readium-desktop/common/redux/reducers/reader";
import { readerSettingsReducer } from "readium-desktop/common/redux/reducers/reader-settings";

export const rootReducer = combineReducers({
    i18n: i18nReducer,
    catalog: catalogReducer,
    window: windowReducer,
    reader: readerReducer,
    readerSettings: readerSettingsReducer,
    message: messageReducer,
    opds: opdsReducer,
    publicationDownloads: publicationDownloadReducer,
    win: winReducer,
    net: netReducer,
});
