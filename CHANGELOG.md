# Changelog

## [Unreleased]

<!-- ### Features ✨ -->

<!-- ### Bugfixes 🐛 -->

<!-- ### Internal Changes 🏗️ -->

## [Version 2.1.1] - 2023-12-23

### Bugfixes 🐛

- Fixed a bug where the icons would not be correctly displayed in Chromium Embedded Framework in OBS due to missing vendor prefixes
- Fixed a bug where disabling the icons in the `theme.css` would still render black or white background where the icons would have been.
- Downgraded the required node version back to 16 so that the project can be build on glitch.com again without errors.

### Internal Changes 🏗️

- Added autoprefixer with a browsers list targeting the last 2 years of Chrome releases.
- Downgraded a few related packages to conform with node 16.
- Changed license from GPL to MIT.

## [Version 2.1.0] - 2023-12-20

### Features ✨

- Added a tiebreak command to determine a random winnner out of a tie: `!polltiebreak`. The tiebreak winner displays its bar a bit longer and shows a dice icon to signify that it was picked randomly.
- The winner option now displays a trophy icon on top of the bar.
- Added two new theme variables for both the trophy and dice icon.
- Re-added shaking and bouncing animations for different final poll states. The tie animation is a more subtle shake now.

### Internal Changes

- Rename "draw" to "tie" consistenly.
- Made the debug state a bit bigger.
- Changed the default node version of the project to >=18.

## [Version 2.0.0] - 2023-12-14

### Features ✨

- New `!pollreset` command resets the votes of the currently active poll.
- The visual design of the polling tool is now themeable through the newly introduced CSS variables in `theme.css`.

### Internal Changes 🏗️

- The project structure is now based on Vue.js.

## [Version 1.0.0]

Initial version of poll tool.
