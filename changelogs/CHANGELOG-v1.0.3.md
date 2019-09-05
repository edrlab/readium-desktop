# Thorium Reader v1.0.3

## Summary

Version `1.0.3` was released on **05 September 2019**.

This release includes the following (notable) new features, improvements and bug fixes:

* Tweaked user interface / user experience, based on testers' feedback
* Better support for assistive technology, including the following screen readers:
  * Narrator, JAWS and NVDA on Microsoft Windows
  * Voice Over on MacOS
  * (not tested on Linux)
* Facilitated keyboard-based interaction, shortcuts and visual outlining
* Improved OPDS support (online catalogs / publication feeds), including search, and error messaging (asynchronous HTTP requests, concurrent downloads)
* Cleaned-up language resources (at the moment: English, French, German), to facilitate contributions / UI translations
* Added a Command Line Interface (CLI) to import multiple publications, "open with" or double-click from the file explorer (registered EPUB file extension)
* Better performance and security, latest NPM package dependencies wherever possible
* Improved developer experience:
  * Stricter TypeScript compiler rules (static type checking)
  * Chromium developer tools with integrated Electron debugger, React and Redux extensions, Axe accessibility checker, and "inspect here" popup menu helper
  * Debugger configuration for Visual Studio Code, Electron main and renderer processes
  * Locales management: scripts and workflow to maintain JSON language resources

## Full Change Log

Git commit diff since `v1.0.2`:
https://github.com/readium/readium-desktop/compare/v1.0.2...v1.0.3

=> **139** GitHub Pull Requests or high-level Git commits.

Here is the complete list of commits, ordered by descending date:

* [(_)](https://github.com/readium/readium-desktop/commit/d8a1f01f0e474e6de8272fcb8d64286544ec0923) __fix(dev):__ editorconfig linter was failing on Windows (glob file path)
* [(_)](https://github.com/readium/readium-desktop/commit/a3a7421fdeae08e3aae1811e3f8ca349ae6af61d) __fix:__ reader side menu, ARIA levels in TOC tree headings, aria-hidden on collapsed sections, list item containment (PR [#670](https://github.com/readium/readium-desktop/pull/670) Fixes [#569](https://github.com/readium/readium-desktop/issues/569) Fixes [#672](https://github.com/readium/readium-desktop/issues/672) Fixes [#676](https://github.com/readium/readium-desktop/issues/676))
* [(_)](https://github.com/readium/readium-desktop/commit/4598af7520e0fe3ee38453290ac51828454620c5) __hotfix:__ display settings radio buttons are not lists, Fixes [#677](https://github.com/readium/readium-desktop/issues/677)
* [(_)](https://github.com/readium/readium-desktop/commit/04c9e698757db75b2b8679a694609125b0101980) __fix:__ scrollbar extend in library view (PR [#673](https://github.com/readium/readium-desktop/pull/673) Fixes [#505](https://github.com/readium/readium-desktop/issues/505))
* [(_)](https://github.com/readium/readium-desktop/commit/8cc41fb8dcbdcc4b11db9a389d03f0c12df19994) __hotfix:__ redundant / duplicate nested list containers in TOC tree, Fixes [#671](https://github.com/readium/readium-desktop/issues/671)
* [(_)](https://github.com/readium/readium-desktop/commit/e004f28033ec8f993b5783b135645eac7d9429c1) __hotfix:__ incorrect ARIA role on radio button, Fixes [#675](https://github.com/readium/readium-desktop/issues/675)
* [(_)](https://github.com/readium/readium-desktop/commit/72111aeb336dcd2a76e51f4ff9206e92f7ab8523) __hotfix:__ PR [#667](https://github.com/readium/readium-desktop/pull/667) Screen readers have their own shortcut to activate hyperlinks (e.g. VoiceOver CTRL+OPT+SPACE), consistent focus handling
* [(_)](https://github.com/readium/readium-desktop/commit/633788865206e62ac65dbb721304245f244a9f9f) __fix:__ CSS styles in reader view, font family, etc. (PR [#674](https://github.com/readium/readium-desktop/pull/674) Fixes [#449](https://github.com/readium/readium-desktop/issues/449))
* [(_)](https://github.com/readium/readium-desktop/commit/b881256966fe73e380787f2695b613300b744c5b) __fix:__ Keyboard-accessible and screen-reader friendly TOC navigation, and skip-to-main-content in reader view (PR [#667](https://github.com/readium/readium-desktop/pull/667) Fixes [#565](https://github.com/readium/readium-desktop/issues/565) Fixes [#156](https://github.com/readium/readium-desktop/issues/156))
* [(_)](https://github.com/readium/readium-desktop/commit/7659c380632b0c8c668861e3eef841cd9c723c16) __feature:__ "go to page" in reader view, for EPUB pagelist navigation structure (PR [#668](https://github.com/readium/readium-desktop/pull/668) Fixes [#82](https://github.com/readium/readium-desktop/issues/82))
* [(_)](https://github.com/readium/readium-desktop/commit/03065ac6eb78945953554cd749b6d7441af95a86) __hotfix:__ follow-up to PR [#653](https://github.com/readium/readium-desktop/pull/653) ensures Publication Landmarks exist, Fixes [#665](https://github.com/readium/readium-desktop/issues/665)
* [(_)](https://github.com/readium/readium-desktop/commit/ffdc456f92e86c880bd467ed5eedc651147abdcd) __hotfix(dev):__ DevTron dymamically-injected package needs to be in node-externals WebPack directive, Fixes [#666](https://github.com/readium/readium-desktop/issues/666)
* [(_)](https://github.com/readium/readium-desktop/commit/6eec45704237fd8f68e57044ca5cb83278529de4) __fix:__ temporarily remove LCP support (PR [#662](https://github.com/readium/readium-desktop/pull/662), See [#663](https://github.com/readium/readium-desktop/issues/663))
* [(_)](https://github.com/readium/readium-desktop/commit/1f612c9f60722c782e7f4f2d6199bd63895f0d54) __fix(ui):__ reader options, pagination radio button (PR [#661](https://github.com/readium/readium-desktop/pull/661) Fixes [#660](https://github.com/readium/readium-desktop/issues/660))
* [(_)](https://github.com/readium/readium-desktop/commit/01d36fb02b0f1d5180215e9f1505aa0bfd5731ca) __fix:__ single Electron app instance, with CLI support (PR [#606](https://github.com/readium/readium-desktop/pull/606) Fixes [#547](https://github.com/readium/readium-desktop/issues/547))
* [(_)](https://github.com/readium/readium-desktop/commit/909584cee5d80838daac3934c58a49180938a9d8) __chore(dev):__ display name in React Higher Order Component (PR [#648](https://github.com/readium/readium-desktop/pull/648))
* [(_)](https://github.com/readium/readium-desktop/commit/1d0cc79677980d524e52df6803170fac1099111e) __fix:__ OPDS publication acquisition, check for duplicate / already-imported during download (PR [#646](https://github.com/readium/readium-desktop/pull/646) Fixes [#538](https://github.com/readium/readium-desktop/issues/538))
* [(_)](https://github.com/readium/readium-desktop/commit/bd547bd2b24f725194bf8038a856d15a304fd48e) __chore(dev):__ R2 package import aliases (PR [#658](https://github.com/readium/readium-desktop/pull/658) Fixes [#657](https://github.com/readium/readium-desktop/issues/657))
* [(_)](https://github.com/readium/readium-desktop/commit/6a4306bb9481c1e44614c0b86a0264aec1f06dad) __hofix:__ follow-up to PR [#653](https://github.com/readium/readium-desktop/pull/653) to replace TypeScript "any" with correct type.
* [(_)](https://github.com/readium/readium-desktop/commit/ab06d6fc8323b345214bdc4f8fd6da2e1a0c0918) __chore:__ NPM package updates (minor semver)
* [(_)](https://github.com/readium/readium-desktop/commit/d171fb09ddea1d273a56edec7bc905d64e332f5e) __fix:__ reader navigation menu, landmarks instead of list of illstrations (PR [#653](https://github.com/readium/readium-desktop/pull/653) Fixes [#81](https://github.com/readium/readium-desktop/issues/81))
* [(_)](https://github.com/readium/readium-desktop/commit/dc23718ed6e9e7ccbe69f7790e63b7b21669f63c) __fix:__ incorrect PostCSS autoprefixer statement (Fixes [#654](https://github.com/readium/readium-desktop/issues/654))
* [(_)](https://github.com/readium/readium-desktop/commit/3e79dccb5757fc70f86931cd6b7bd7a8436c8343) __fix:__ revert console disabling (yargs) (PR [#649](https://github.com/readium/readium-desktop/pull/649), reverts PR [#485](https://github.com/readium/readium-desktop/pull/485))
* [(_)](https://github.com/readium/readium-desktop/commit/cad6f7afe61f8376dcea48df825d1bb6322c4f5a) __fix:__ Thorium package and executable name (PR [#651](https://github.com/readium/readium-desktop/pull/651), related issue #411)
* [(_)](https://github.com/readium/readium-desktop/commit/07c992cdcb02de61c8bdb4c4bb4f4a79b244a34f) __fix(a11y):__ accessible label for breadcrumb links (PR [#650](https://github.com/readium/readium-desktop/pull/650) Fixes [#602](https://github.com/readium/readium-desktop/issues/602))
* [(_)](https://github.com/readium/readium-desktop/commit/ec541cdf4aabbeeec93d6c740d4fb540979e3dad) __fix:__ removed unnecessary pointer cursor on publication cover image (PR [#652](https://github.com/readium/readium-desktop/pull/652) Fixes [#452](https://github.com/readium/readium-desktop/issues/452))
* [(_)](https://github.com/readium/readium-desktop/commit/80b3704c359828974b13e8f9d418f5661ebffdf3) __chore(dev):__ OPDS API typings (PR [#617](https://github.com/readium/readium-desktop/pull/617))
* [(_)](https://github.com/readium/readium-desktop/commit/089ab0a26679de2082f34a93cad822fe24a700d1) __fix(l10n):__ German locale names, script tool to create JSON data from CSV (PR [#647](https://github.com/readium/readium-desktop/pull/647) Fixes [#430](https://github.com/readium/readium-desktop/issues/430))
* [(_)](https://github.com/readium/readium-desktop/commit/799c80d03775f47f81b50b0799f184ef7e82246f) __fix:__ OPDS feeds, async HTTP requests with timeouts and error handling, display info to user (PR [#542](https://github.com/readium/readium-desktop/pull/542) Fixes [#419](https://github.com/readium/readium-desktop/issues/419) Fixes [#418](https://github.com/readium/readium-desktop/issues/418))
* [(_)](https://github.com/readium/readium-desktop/commit/4358822ceeec689a7a98803f29efa363505ef75c) __fix:__ ensure non-supported CLI parameters (such a Electron/Chromium ones) are ignored during Yargs parsing (PR [#607](https://github.com/readium/readium-desktop/pull/607), see https://github.com/readium/readium-desktop/issues/547#issuecomment-520785137)
* [(_)](https://github.com/readium/readium-desktop/commit/0ce2daac74bed4288cd7cc55b2f5f7148ffb7d81) __fix:__ OPDS feeds, conversion from relative to absolute URLs + handling of opds:// scheme (PR [#639](https://github.com/readium/readium-desktop/pull/639))
* [(_)](https://github.com/readium/readium-desktop/commit/cf8be49c29afea718fb3db4c78a4f4d485368065) __fix(gui):__ better focus outline thanks to additional padding (PR [#637](https://github.com/readium/readium-desktop/pull/637) Fixes [#573](https://github.com/readium/readium-desktop/issues/573))
* [(_)](https://github.com/readium/readium-desktop/commit/660045f6ee990aae73020e94009ef7229fb765e9) __chore(doc):__ CLI usage (PR [#640](https://github.com/readium/readium-desktop/pull/640) Fixes [#584](https://github.com/readium/readium-desktop/issues/584))
* [(_)](https://github.com/readium/readium-desktop/commit/50807e3764bfafa7fa54b12453ed91a8b1d39f3a) __chore(l10n):__ follow-up to PR [#641](https://github.com/readium/readium-desktop/pull/641), removed unnecessary Toast code-scanning routine (in i18n-scan script)
* [(_)](https://github.com/readium/readium-desktop/commit/62c753344e44890f8f74ff4cdece7b6b721584d4) __fix:__ "toast" typing and upstream i18next message interpolation (PR [#641](https://github.com/readium/readium-desktop/pull/641) Fixes [#534](https://github.com/readium/readium-desktop/issues/534))
* [(_)](https://github.com/readium/readium-desktop/commit/44edb13d6379156d92ffd6b5aabd592c54a08ad9) __fix:__ Linux executable filename (PR [#642](https://github.com/readium/readium-desktop/pull/642) Fixes [#411](https://github.com/readium/readium-desktop/issues/411))
* [(_)](https://github.com/readium/readium-desktop/commit/7b580339f23db2518f466a5558ab85ea2e83651e) __chore(dev):__ NPM packages maintenance, minor updates
* [(_)](https://github.com/readium/readium-desktop/commit/84c1252dc8855f888acddfe46e925881caa69561) __fix:__ catalog refresh (recent publications) when reading location changes (PR [#635](https://github.com/readium/readium-desktop/pull/635) Fixes [#555](https://github.com/readium/readium-desktop/issues/555))
* [(_)](https://github.com/readium/readium-desktop/commit/c1fecc812ad25d12d151239e152ee53b535468e8) __fix(a11y):__ publication grid view - title+author description on cover image, and dedicated label to announce menu button (PR [#633](https://github.com/readium/readium-desktop/pull/633) Fixes [#586](https://github.com/readium/readium-desktop/issues/586) Fixes [#568](https://github.com/readium/readium-desktop/issues/568))
* [(_)](https://github.com/readium/readium-desktop/commit/04b4f4ccbbc7dc0de2644d3b31361cf3eef93f43) __chore(doc, l10n):__ README JSON locale scripts
* [(_)](https://github.com/readium/readium-desktop/commit/3ffe94ac5170b0454cc1f1c208fa348ea925cbcd) __fix(ui):__ dummy cover (CSS gradient), long title+author text overflow now contained (PR [#619](https://github.com/readium/readium-desktop/pull/619) Fixes [#491](https://github.com/readium/readium-desktop/issues/491) Fixes [#409](https://github.com/readium/readium-desktop/issues/409) partially)
* [(_)](https://github.com/readium/readium-desktop/commit/6af2b1f5062e3115983857309043147292b0deb9) __chore(dev):__ removed unnecessary build step in dev mode (preload script for R2 navigator)
* [(_)](https://github.com/readium/readium-desktop/commit/f27c47b7647aeafa35f4792c2c6d40987f340969) __chore(dev):__ added missing "release" folder removal in clean task, and ensure eclint ignores the release folder (very time consuming lint!)
* [(_)](https://github.com/readium/readium-desktop/commit/e0cc06d0c9d3b93e025af03db3326c3a2d801e60) __chore(dev):__ improved Visual Studio Code main and renderer process debugging (PR [#632](https://github.com/readium/readium-desktop/pull/632))
* [(_)](https://github.com/readium/readium-desktop/commit/b4c75a7de2cd6af81bc8c10cd092b30b97dee3cc) __chore(dev):__ exclude dev-time packages from the production build (WebPack ignore plugin), as the define plugin + minification does not address this use-case (devtron, react-axe-a11y and the devtools extensions installer)
* [(_)](https://github.com/readium/readium-desktop/commit/a9c1657d7844513f0ca6b5a7c93f7bf7b1d798ed) __chore(dev):__ WebPack dev server with Hot Module Reload requires inline source maps (otherwise, no breakpoint debugging in the web inspectors of Electron BrowserWindows)
* [(_)](https://github.com/readium/readium-desktop/commit/80d2b2581f200c4c35a586fee1d0e6536a1c0822) __chore(build):__ minor hotfix for out-of-date version in package.json for ASAR
* [(_)](https://github.com/readium/readium-desktop/commit/48f3a3dd649ddfb705d14f35143b7d903d92ec9e) __fix(a11y):__ remove incorrect ARIA labels in list of publications (PR [#631](https://github.com/readium/readium-desktop/pull/631) Fixes [#600](https://github.com/readium/readium-desktop/issues/600))
* [(_)](https://github.com/readium/readium-desktop/commit/eb75a006bbd41ba52f563f7297d7f4345afc21c9) __chore(doc):__ hotfix README typo (i18n / l10n task / script name)
* [(_)](https://github.com/readium/readium-desktop/commit/f71d66e86390d5c8f36e612da3c68a24af94d161) __fix(a11y):__ ARIA labels, descriptions for previous/next arrow buttons of cover images slider (PR [#630](https://github.com/readium/readium-desktop/pull/630), Fixes [#585](https://github.com/readium/readium-desktop/issues/585))
* [(_)](https://github.com/readium/readium-desktop/commit/45437481efdc3aaad81c75119df84aebc52f1354) __chore(npm):__ minor package updates, mostly patch updates (security, etc. no feature changes) (PR [#629](https://github.com/readium/readium-desktop/pull/629))
* [(_)](https://github.com/readium/readium-desktop/commit/52f047c8f73ef009f414a40f11323c4d2031ab6b) __fix(ui):__ removed duplicate OPDS header (PR [#627](https://github.com/readium/readium-desktop/pull/627) Fixes [#591](https://github.com/readium/readium-desktop/issues/591))
* [(_)](https://github.com/readium/readium-desktop/commit/c8c560f30911cc637deda2ffa38633c4303365a5) __fix(l10n):__ remove duplicated translations, OPDS import publication/sample (PR [#628](https://github.com/readium/readium-desktop/pull/628) Fixes [#592](https://github.com/readium/readium-desktop/issues/592))
* [(_)](https://github.com/readium/readium-desktop/commit/ab47ae557ad9981fea11695fab9b634e10376c80) __fix:__ support for .epub3 extension (Fixes [#544](https://github.com/readium/readium-desktop/issues/544))
* [(_)](https://github.com/readium/readium-desktop/commit/9b875fef09e1504c46441c57b8d689f8defe920c) __fix(ui):__ list of catalogs / OPDS feeds, top margin (PR [#622](https://github.com/readium/readium-desktop/pull/622) Fixes [#609](https://github.com/readium/readium-desktop/issues/609))
* [(_)](https://github.com/readium/readium-desktop/commit/fbbae0eff156515889387fe9cdb579dbc82bb0b8) __fix(opds):__ short search breadcrumb, root catalog context (PR [#620](https://github.com/readium/readium-desktop/pull/620) Fixes [#616](https://github.com/readium/readium-desktop/issues/616))
* [(_)](https://github.com/readium/readium-desktop/commit/cd3997f902be46d4299dc97e0f3ccbdd09fbe69c) __fix(l10n):__ French translation tweaks (PR [#618](https://github.com/readium/readium-desktop/pull/618))
* [(_)](https://github.com/readium/readium-desktop/commit/f2cb0c80b33d321297da3ca7cd664ccf8d8dc69f) __hotfix(l10n):__ removed debug messages (Fixes [#610](https://github.com/readium/readium-desktop/issues/610))
* [(_)](https://github.com/readium/readium-desktop/commit/5a235e99460f162c887c90840473dbc8558f1272) __fix(a11y):__ screen reader modal dialogs and popup menus (Fixes [#605](https://github.com/readium/readium-desktop/issues/605))
* [(_)](https://github.com/readium/readium-desktop/commit/1263712b0ddab6ad43e3c95f45a9ed74c831960d) __fix(a11y,l10n):__ changed untranslated french strings (Fixes [#604](https://github.com/readium/readium-desktop/issues/604))
* [(_)](https://github.com/readium/readium-desktop/commit/ca9082a8c32ee867b067782f324a9a09a116e93f) __fix(a11y):__ menu ARIA expanded, and menuitem roles (Fixes [#599](https://github.com/readium/readium-desktop/issues/599))
* [(_)](https://github.com/readium/readium-desktop/commit/41733d4b5ece3d1810f2972ae107c7b811c1c920) __fix(dev):__ removed unused React component AddEntryForm (Fixes [#597](https://github.com/readium/readium-desktop/issues/597))
* [(_)](https://github.com/readium/readium-desktop/commit/0026f801bd5c4d3f0ea4023e7b41b60a74852f28) __fix:__ React iterated key'ed markup, Toasts, Grid and List views (Fixes [#562](https://github.com/readium/readium-desktop/issues/562))
* [(_)](https://github.com/readium/readium-desktop/commit/6fdfafe5626c180625b4e04b4c5644cacc6802fe) __fix(dev):__ ensures React and Redux dev tools are loaded when the BrowserWindow contents are ready
* [(_)](https://github.com/readium/readium-desktop/commit/4af5329bb75f4db48f496ff70610e063c81eae57) __chore(dev):__ added full WebPack config console debug when building in production
* [(_)](https://github.com/readium/readium-desktop/commit/8766f5ffe5aa826c433b90e104c91d0539d7171a) __chore(dev):__ ensures lint task is always called for production builds
* [(_)](https://github.com/readium/readium-desktop/commit/aae1a7cb01fec3e61b0d7bde2b6724c448461d42) __chore(dev):__ NodeJS TypeScript typings was incorrect version (Fixes [#595](https://github.com/readium/readium-desktop/issues/595))
* [(_)](https://github.com/readium/readium-desktop/commit/03bcef7d5161814ab285e15f11f1922d05265a8d) __fix:__ language locale applied to HTML document root (Fixes [#587](https://github.com/readium/readium-desktop/issues/587))
* [(_)](https://github.com/readium/readium-desktop/commit/5ffcc69cb883a318232335fd6c9821162e25b32c) __chore(npm):__ minor package updates
* [(_)](https://github.com/readium/readium-desktop/commit/22e3f4cf9fad434f70dac29f206ad1d6157a5ec4) __chore(code):__ OPDS feed parser lib updated with latest TypeScript typings fix (see https://github.com/NYPL-Simplified/opds-feed-parser/commit/d254de4130725bbe0314cfb731b4d87e79e3528b#r34665675 )
* [(_)](https://github.com/readium/readium-desktop/commit/8dcc26e53430f670a191c1e79b6824a759a5816c) __fix:__ Redux Saga was using deprecated API coding style (now 1.* stable lib, was 0.* alpha) (PR [#590](https://github.com/readium/readium-desktop/pull/590))
* [(_)](https://github.com/readium/readium-desktop/commit/d1cefc0ae12970960c14079ae3397bd6c65d0f8e) __chore(code):__ minor variable cleanup
* [(_)](https://github.com/readium/readium-desktop/commit/0facdde004b515ad0f7920f9f4859baf4957c5d4) __feat(dev):__ Axe React a11y checker integrated in DEV mode (PR [#589](https://github.com/readium/readium-desktop/pull/589) Fixes [#87](https://github.com/readium/readium-desktop/issues/87))
* [(_)](https://github.com/readium/readium-desktop/commit/934d0865dbc0b7f0790e196e35ae92a384169c47) __fix(a11y):__ colour contrast, disabled buttons (PR [#583](https://github.com/readium/readium-desktop/pull/583) Fixes [#574](https://github.com/readium/readium-desktop/issues/574))
* [(_)](https://github.com/readium/readium-desktop/commit/cc893e07310d1c5b5fc639ca6028126591724847) __feat(dev):__ httpGet refactor, wrapper to fetch remote resources, with TypeScript typing, and error handling (PR [#541](https://github.com/readium/readium-desktop/pull/541))
* [(_)](https://github.com/readium/readium-desktop/commit/604e7f39ac7ae4f17f1e22d741b6e4c9ce2bf04a) __fix:__ library list view, consistent line/row height, text ellipsis for long publication descriptions (PR [#582](https://github.com/readium/readium-desktop/pull/582) Fixes [#553](https://github.com/readium/readium-desktop/issues/553))
* [(_)](https://github.com/readium/readium-desktop/commit/cb01b7a6bdb06e669170f6fc36b8cddc112c989f) __chore(dev):__ app debugging from Visual Studio Code, improved workflow and error reporting (PR [#581](https://github.com/readium/readium-desktop/pull/581))
* [(_)](https://github.com/readium/readium-desktop/commit/7c53921fdca112f2db61190d048a94055e984ff1) __chore(doc):__ added l10n developer information
* [(_)](https://github.com/readium/readium-desktop/commit/54ee8362e7abc81c975294622ae346f57724f54a) __chore(doc):__ fixed build status link
* [(_)](https://github.com/readium/readium-desktop/commit/de9278c77bde0db3f44a54ba84806ca5cf136c5d) __chore(l10n):__ tooling pass - sort, scan, typed, to sync locales with codebase and make canonical (PR [#566](https://github.com/readium/readium-desktop/pull/566))
* [(_)](https://github.com/readium/readium-desktop/commit/e4149e5c92e794b264f2e2db7f91266b319e1bbe) __fix:__ app/window menu consistent on Windows, Linux (dev utilities only, same as MacOS) (PR [#564](https://github.com/readium/readium-desktop/pull/564) Fixes [#563](https://github.com/readium/readium-desktop/issues/563))
* [(_)](https://github.com/readium/readium-desktop/commit/373c4ec6ea8e15a65079ac9ff7ea0974379c12e1) Npm updates (PR [#561](https://github.com/readium/readium-desktop/pull/561))
* [(_)](https://github.com/readium/readium-desktop/commit/d972cdabd5e558e7b7d21893371547fc5805642d) __chore(dev):__ eliminate Redux Saga deprecation warnings (all effect on array yield)
* [(_)](https://github.com/readium/readium-desktop/commit/03c05c118c5903884fc1fbb68e3253fb007687f2) __chore(dev):__ limit the number of file watchers during hot reloead dev server mode (Linux limited filesystem handles)
* [(_)](https://github.com/readium/readium-desktop/commit/211286fdf373fbcef3efa2936bf0e3e39d6a462e) __fix:__ MacOS CMD-W to close windows, other menus and dev tools (PR [#560](https://github.com/readium/readium-desktop/pull/560) Fixes [#454](https://github.com/readium/readium-desktop/issues/454))
* [(_)](https://github.com/readium/readium-desktop/commit/23e9dc64a5ae12559e4428e63889fca0da1fb761) __chore(typo):__ MenuButton, Fixes [#472](https://github.com/readium/readium-desktop/issues/472)
* [(_)](https://github.com/readium/readium-desktop/commit/e9e39a84fa4dffd13523914f6860f6f406cf62b9) __fix:__ publication tags are normalized (trimmed, whitespace collapsed) Fixes [#490](https://github.com/readium/readium-desktop/issues/490)
* [(_)](https://github.com/readium/readium-desktop/commit/090481a17181db45e11e4468952cc4ab27715499) __fix:__ CSS user-select none, except for publication metadata (PR [#559](https://github.com/readium/readium-desktop/pull/559) Fixes [#525](https://github.com/readium/readium-desktop/issues/525))
* [(_)](https://github.com/readium/readium-desktop/commit/5601c5712570956cca15a7385bf173f8f3243efa) __fix:__ added support for .epub3 file extension (Fixes [#544](https://github.com/readium/readium-desktop/issues/544))
* [(_)](https://github.com/readium/readium-desktop/commit/7d1e61e89b9607007dc738566907bd326980de29) __feat(dev):__ context menu to inspect element (PR [#558](https://github.com/readium/readium-desktop/pull/558) Fixes [#545](https://github.com/readium/readium-desktop/issues/545))
* [(_)](https://github.com/readium/readium-desktop/commit/004912733746c959a8a2277558fff76e525ed14e) __feat(dev):__ devtron integration (PR [#557](https://github.com/readium/readium-desktop/pull/557) Fixes [#546](https://github.com/readium/readium-desktop/issues/546))
* [(_)](https://github.com/readium/readium-desktop/commit/7f0754dcc8d0682aa4f83a180027a3ba5f77f1d6) __NPM update:__ i18next (PR [#556](https://github.com/readium/readium-desktop/pull/556))
* [(_)](https://github.com/readium/readium-desktop/commit/4e5ec305a4694ad75b691c98314de7d3295c44c9) __feat:__ OPDS feed search (PR [#386](https://github.com/readium/readium-desktop/pull/386) Fixes [#296](https://github.com/readium/readium-desktop/issues/296))
* [(_)](https://github.com/readium/readium-desktop/commit/c09ec34b2da21a5c7ca0eb16a09327826bd88bf3) __fix:__ library view, list mode, click-on-line to open reader (PR [#548](https://github.com/readium/readium-desktop/pull/548) Fixes [#497](https://github.com/readium/readium-desktop/issues/497))
* [(_)](https://github.com/readium/readium-desktop/commit/6be265ada787e26b875cc8f3506f530244fe7cd3) __fix:__ empty library view (no publications), drag-drop / import message (PR [#549](https://github.com/readium/readium-desktop/pull/549) Fixes [#537](https://github.com/readium/readium-desktop/issues/537))
* [(_)](https://github.com/readium/readium-desktop/commit/9adb7d5cec2dfa8bd73588ec5bad9c76b69d2fdb) __fix:__ OPDS addition/import form (popup modal dialog), invoked from button (PR [#550](https://github.com/readium/readium-desktop/pull/550) Fixes [#345](https://github.com/readium/readium-desktop/issues/345))
* [(_)](https://github.com/readium/readium-desktop/commit/b01b8f007be4f0933956e8b38547f8d8404de076) __fix(a11y):__ "skip to main" link style and position (PR [#551](https://github.com/readium/readium-desktop/pull/551) Fixes [#470](https://github.com/readium/readium-desktop/issues/470))
* [(_)](https://github.com/readium/readium-desktop/commit/d329fe3ed53a787c93cf7d5112898d963edceccf) __fix:__ toast notifications had html unicode escape sequences / charcodes (PR [#552](https://github.com/readium/readium-desktop/pull/552) Fixes [#453](https://github.com/readium/readium-desktop/issues/453))
* [(_)](https://github.com/readium/readium-desktop/commit/de31c7be16460edffefc10ef71fc857e7dddac4f) __chore(dev):__ downloader TypeScript typings (PR [#543](https://github.com/readium/readium-desktop/pull/543))
* [(_)](https://github.com/readium/readium-desktop/commit/04deba11264bd82d9af90aeb58d3f0b2681e6fc1) __fix (arch):__ pass boolean value into react props to indicate when api promise is rejected (known error or unexpected exception) (PR [#539](https://github.com/readium/readium-desktop/pull/539))
* [(_)](https://github.com/readium/readium-desktop/commit/265158864988738d8bf24b353948be679e8620ed) library term becomes bookshelf
* [(_)](https://github.com/readium/readium-desktop/commit/e12a854d9e4204e465f3a3c16729f6ef53c472c9) Better labels, a11y, English
* [(_)](https://github.com/readium/readium-desktop/commit/d1e47fe14ff3f342375be425b2786bc20732179f) Correction of multiple typos in English
* [(_)](https://github.com/readium/readium-desktop/commit/d96b0a0eec98b17cb9ea59125b162c6745100ad1) __fix:__ window rectangle bounds, non-rounded decimal values crash DB backend (PR [#536](https://github.com/readium/readium-desktop/pull/536) Fixes [#532](https://github.com/readium/readium-desktop/issues/532))
* [(_)](https://github.com/readium/readium-desktop/commit/fd6e037d0da0a99e5bdd21f241beaf6cd6351616) __fix(l10n):__ delete feed vs. publication (PR [#533](https://github.com/readium/readium-desktop/pull/533) Fixes [#501](https://github.com/readium/readium-desktop/issues/501))
* [(_)](https://github.com/readium/readium-desktop/commit/8f9141943efbf654bc18e4a272edfcc2fe395c47) __hotfix:__ reference to Electron BrowserWindow (library view) maintained in new createWindows.ts file split from maint.ts (follow-up to PR [#403](https://github.com/readium/readium-desktop/pull/403))
* [(_)](https://github.com/readium/readium-desktop/commit/4ae0358a91038c2a713d314e65dd552761166527) __fix:__ base64 encode / decode errors (PR [#531](https://github.com/readium/readium-desktop/pull/531) Fixes [#522](https://github.com/readium/readium-desktop/issues/522) Fixes [#486](https://github.com/readium/readium-desktop/issues/486))
* [(_)](https://github.com/readium/readium-desktop/commit/791f41c9c0aab38cb3b14b7b85719b4b0d706475) __fix:__ Fixes [#530](https://github.com/readium/readium-desktop/issues/530) confusing console error message for i18n language query from database (missing key)
* [(_)](https://github.com/readium/readium-desktop/commit/994dbcae5e9dd1b26d78f6c5eb12a564d189c63a) __hotfix:__ PR [#471](https://github.com/readium/readium-desktop/pull/471) duplicate configRepository.save() Fixes [#529](https://github.com/readium/readium-desktop/issues/529)
* [(_)](https://github.com/readium/readium-desktop/commit/376468474b056785fb620aea12db5cd836853d64) __hotfix:__ window resize / move event handling, follow-up to #403 and #524 (bad merge, and uncaught debounce() coding error)
* [(_)](https://github.com/readium/readium-desktop/commit/426691330fc2a89e012c59cf5c229492318337d3) __chore:__ refreshed package-lock.json which had been updated incrementally several times recently
* [(_)](https://github.com/readium/readium-desktop/commit/52894cc3cf241549c3dd2f40284a17b5f90d759d) __fix:__ stricter TypeScript and TSLint code checks (PR [#404](https://github.com/readium/readium-desktop/pull/404))
* [(_)](https://github.com/readium/readium-desktop/commit/474d16b5f0d3292a849354397fdedf9b13ea4208) __feat:__ CLI Command Line Interface - import EPUBs, OPDS, read EPUBs (PR [#403](https://github.com/readium/readium-desktop/pull/403) Fixes [#85](https://github.com/readium/readium-desktop/issues/85))
* [(_)](https://github.com/readium/readium-desktop/commit/27bdecd860e7c895a3e01d618e16c2d2e4424934) __fix:__ library and reader windows bounds / position + dimensions (PR [#524](https://github.com/readium/readium-desktop/pull/524) Fixes [#492](https://github.com/readium/readium-desktop/issues/492) Fixes [#494](https://github.com/readium/readium-desktop/issues/494))
* [(_)](https://github.com/readium/readium-desktop/commit/c8c6a366c5802423a39f78d3f2e53ea5b0f96a8a) __fix(10n):__ updated codebase static analyzer to capture dynamic locale keys used in notification toasts (PR [#527](https://github.com/readium/readium-desktop/pull/527) Fixes [#526](https://github.com/readium/readium-desktop/issues/526))
* [(_)](https://github.com/readium/readium-desktop/commit/bb36f5b545e351654ed07fef0f55fde635de5c01) __feat:__ Microsoft Windows Store AppX images (PR [#521](https://github.com/readium/readium-desktop/pull/521))
* [(_)](https://github.com/readium/readium-desktop/commit/a2828c157b469205d6042a4ef3a8311013878bbc) http request update (PR [#523](https://github.com/readium/readium-desktop/pull/523) PR [#481](https://github.com/readium/readium-desktop/pull/481) Fixes [#463](https://github.com/readium/readium-desktop/issues/463))
* [(_)](https://github.com/readium/readium-desktop/commit/33f7f2ef9c92c1b24561faeaa9f576eb2f9e2020) __fix:__ reader view, navigation (TOC), "title"-only headings should not be clickable, should be inert. (Fixes [#520](https://github.com/readium/readium-desktop/issues/520))
* [(_)](https://github.com/readium/readium-desktop/commit/cc5c78ab6e088306be0148a0f214e993c43617c2) __fix:__ updated r2-shared-js NPM package which addresses publications with no resources (only spine items)
* [(_)](https://github.com/readium/readium-desktop/commit/fa7b299a73ebe619fc6250c4a1b79762d7e2e2ee) __fix:__ package.json version in about info (Fixes [#473](https://github.com/readium/readium-desktop/issues/473))
* [(_)](https://github.com/readium/readium-desktop/commit/1de73c59db500c2f6276b04083d33b610d4bc711) __fix(l10n):__ publication languages shown in the user's locale (Fixes [#519](https://github.com/readium/readium-desktop/issues/519))
* [(_)](https://github.com/readium/readium-desktop/commit/de8e69b2513c67adacf5b4b3bf3dcdf8cb2132ee) __fix:__ application / product name in epubReadingSystem info (Fixes [#510](https://github.com/readium/readium-desktop/issues/510))
* [(_)](https://github.com/readium/readium-desktop/commit/acd001ee9cb52c6038ee49de40fa5c5cedf8a3ce) __chore(code):__ consistent use of preprocessor directive / build-time constants (Fixes [#511](https://github.com/readium/readium-desktop/issues/511))
* [(_)](https://github.com/readium/readium-desktop/commit/a7899d2d4956546c33001596b4c12aab5981acb0) __fix(l10n):__ replaced prefix/suffix bash shell script with wrap NodeJS code (Fixes [#514](https://github.com/readium/readium-desktop/issues/514))
* [(_)](https://github.com/readium/readium-desktop/commit/f94aaeda60ae6e96f1d621af3b843f08381569dc) __fix(l10n):__ replace native shell utility for JSON sort with NodeJS script (Fixes [#514](https://github.com/readium/readium-desktop/issues/514))
* [(_)](https://github.com/readium/readium-desktop/commit/23fe2a2a9f65e42df225dcbc30f2f7054ece7f69) __fix(l10n):__ removed unused locale keys (static codebase analysis, i18next calls) (PR [#516](https://github.com/readium/readium-desktop/pull/516) Fixes [#509](https://github.com/readium/readium-desktop/issues/509))
* [(_)](https://github.com/readium/readium-desktop/commit/1352b0170b7a622f01bc4bab6e8c727421c31dad) __feat(l10n):__ typings for i18next JSON locales (PR [#518](https://github.com/readium/readium-desktop/pull/518) PR [#517](https://github.com/readium/readium-desktop/pull/517))
* [(_)](https://github.com/readium/readium-desktop/commit/095d2f4cea10be5de13374927474f6ec253358be) __hotfix:__ found typo in license header (`node ../r2-utils-js/tools/license_header.js src/`)
* [(_)](https://github.com/readium/readium-desktop/commit/c6f6d0a3d3f839752109eca374cfd38db2884948) __fix:__ JSON locales checking (discover missing and redundant keys) (PR [#506](https://github.com/readium/readium-desktop/pull/506) Fixes [#397](https://github.com/readium/readium-desktop/issues/397) Fixes [#476](https://github.com/readium/readium-desktop/issues/476))
* [(_)](https://github.com/readium/readium-desktop/commit/1ff382b29b41205ac53fbd11770fc03d559f64ac) __chore(code):__ reader.tsx cleanup, queryParam, publication URL (PR [#513](https://github.com/readium/readium-desktop/pull/513))
* [(_)](https://github.com/readium/readium-desktop/commit/d408ec8c388ac92df152582fed4b5298b89f1079) __fix:__ reader view, publication info button now works at first opening (PR [#512](https://github.com/readium/readium-desktop/pull/512) Fixes [#292](https://github.com/readium/readium-desktop/issues/292))
* [(_)](https://github.com/readium/readium-desktop/commit/72ac5470902f39bafb81554cd9f7d198d40ee9e5) __fix:__ css-hot-loader was in production build (Fixes [#432](https://github.com/readium/readium-desktop/issues/432))
* [(_)](https://github.com/readium/readium-desktop/commit/40dbefc88e2f7018b7f2eb8c4389652119a9e27b) __fix:__ unused and misplaced NPM dependencies (PR [#504](https://github.com/readium/readium-desktop/pull/504) Fixes [#499](https://github.com/readium/readium-desktop/issues/499))
* [(_)](https://github.com/readium/readium-desktop/commit/0b86cf45093ab3966f2f17ff891a320d37e5cb22) __fix:__ flickering navbar (PR [#498](https://github.com/readium/readium-desktop/pull/498))
* [(_)](https://github.com/readium/readium-desktop/commit/59cf6aff032f50f2d631642edb308bfcd81034aa) __chore:__ R2 NPM packages updates (notably, consistent reflect-metadata version for ta-json) (PR [#495](https://github.com/readium/readium-desktop/pull/495))
* [(_)](https://github.com/readium/readium-desktop/commit/bc3f1337bf50c857bf7a0a48f57e1c076056a697) __fix:__ delete publication (in library view) => close opened readers (PR [#489](https://github.com/readium/readium-desktop/pull/489) Fixes [#448](https://github.com/readium/readium-desktop/issues/448))
* [(_)](https://github.com/readium/readium-desktop/commit/7776294d83aae7184eee47ccfa06adde13789d14) __fix:__ migrate deprecated "new Buffer()" API to "Buffer.from()" (PR [#487](https://github.com/readium/readium-desktop/pull/487))
* [(_)](https://github.com/readium/readium-desktop/commit/c2296e761b40da0b779bb458b033a3df68144e14) __fix:__ disable console functions in PACKAGED mode, in addition to debug() (PR [#485](https://github.com/readium/readium-desktop/pull/485))

__Tips__:

* The [standard-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/standard-changelog) utility (`npx standard-changelog --first-release`) somehow only generates a limited number of commits, so we use a one-liner command line / shell script instead:
* `git --no-pager log --decorate=short --pretty=oneline v1.0.2...v1.0.3 | cut -d " " -f 1- | sed -En '/^([0-9a-zA-Z]+)[[:space:]]([^:]+):(.+)$/!p;s//\1 __\2:__\3/p' | sed -En 's/^(.+)$/* \1/p' | sed -En '/PR[[:space:]]*#([0-9]+)/!p;s//PR [#\1](https:\/\/github.com\/readium\/readium-desktop\/pull\/\1)/gp' | sed -En '/\(#([0-9]+)/!p;s//(PR [#\1](https:\/\/github.com\/readium\/readium-desktop\/pull\/\1)/gp' | sed -En '/(Fixes|See|Fix|Fixed)[[:space:]]*#([0-9]+)/!p;s//\1 [#\2](https:\/\/github.com\/readium\/readium-desktop\/issues\/\2)/gp' | sed -En '/^.[[:space:]]([0-9a-zA-Z]+)[[:space:]]/!p;s//* [(_)](https:\/\/github.com\/readium\/readium-desktop\/commit\/\1) /p'`
* ...append `| pbcopy` on MacOS to copy the result into the clipboard.
* ...append `| wc -l` to verify that the result actually matches the number of Git commits.