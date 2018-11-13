# postcss-convertpx

<!-- [START badges] -->
![Travis (.com) branch](https://img.shields.io/travis/com/ta7sudan/postcss-convertpx/master.svg) [![codecov](https://codecov.io/gh/ta7sudan/postcss-convertpx/branch/master/graph/badge.svg)](https://codecov.io/gh/ta7sudan/postcss-convertpx) ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg) ![npm (tag)](https://img.shields.io/npm/v/postcss-convertpx/latest.svg)

<!-- [END badges] -->

forked from [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport).



## requirement

Must set this plugin after [postcss-nested](https://github.com/postcss/postcss-nested).



## Usage

If your project involves a fixed width, this script will help to convert pixels into viewport units.

### Input/Output

```css
// input

div {
	width: 20px;
	height: 30px;
	color: red;
	font-size: 18px;
	font: bold 75px/7.5px;
	line-height: 20px;
	border: 1px solid #000;
}
div::before {
	content: "75px";
}
@media (max-width: 320px) {
	div {
		width: 40px;
		font-size: 20px;
		color: blue;
	}
}

// output

div {
	width: 2.66667vw;
	height: 4vw;
	color: red;
	font-size: 18px;
	font: bold 75px/1vw;
	line-height: 2.66667vw;
	border: 1px solid #000;
}
div::before {
	content: "75px";
}
@media (max-width: 320px) {
	div {
		width: 5.33333vw;
		font-size: 20px;
		color: blue;
	}
}
```

### Example

```js
'use strict';
const postcss = require('postcss');
const p2v = require('postcss-convertpx');
const fs = require('fs');

const css = fs.readFileSync('./example/demo.css', 'utf8');

postcss(p2v({
    exclude(file) {
		return /node_modules/.test(file);
    }
})).process(css, {
	from: './example/demo.css'
}).then(rst => {
	console.log(rst.css);
});

```

### Options

Default:
```js
{
	viewportWidth: 750,
	unitPrecision: 5,
	viewportUnit: 'vw',
	convertFont: false,
	minPixelValue: 1,
	mediaQuery: false,
	convertLineHeight: true,
	declarationBlackList: undefined,
	scale: undefined,
	exclude: undefined
}
```
- `viewportWidth` (Number) The width of the viewport.
- `unitPrecision` (Number) The decimal numbers to allow the REM units to grow to.
- `viewportUnit` (String) Expected units.
- `convertFont` (Boolean) Allow px to be converted in `font`/`font-size`.
- `minPixelValue` (Number) Set the minimum pixel value to replace.
- `mediaQuery` (Boolean) Allow px to be converted in media queries.
- `convertLineHeight` (Boolean) Allow px to be converted in `font`/`line-height`.
- `declarationBlackList` (string[]) The declarations to ignore and leave as px. Note, if use short-hand like `font` will only ignore `font` not `font-size`, so if you want ignore `font` and `font-size`, you should specify both like this `declarationBlackList: ['font', 'font-size']`.
- `scale` (Number) for `vw` will calculate automatic according to `viewportWidth`. for other unit such as `rem`, you can specify `scale` like `scale: 75`, then `1rem = 75px`.
- `exclude(filepath)` (Function) You can exclude some file by specify this option, which returns a boolean, if `true` will be excluded.

### 

## Skip a declaration

input

```css
div {
	width: 20px;/* skip-p2v */
	height: 30px;
	color: red;
	font-size: 18px;
	line-height: 20px;
}
@media (max-width: 320px) {
	div {
		width: 40px;
		font-size: 20px;
		color: blue;
	}
}
```

output

```css
div {
	width: 20px;/* skip-p2v */
	height: 4vw;
	color: red;
	font-size: 18px;
	line-height: 2.66667vw;
}
@media (max-width: 320px) {
	div {
		width: 5.33333vw;
		font-size: 20px;
		color: blue;
	}
}
```

`width` will be ignored.



## Skip a rule

input

```css
/* skip-p2v */
div {
	width: 20px;
	height: 30px;
	color: red;
	font-size: 18px;
	line-height: 20px;
}
@media (max-width: 320px) {
	div {
		width: 40px;
		font-size: 20px;
		color: blue;
	}
}
```

output

```css
/* skip-p2v */
div {
	width: 20px;
	height: 30px;
	color: red;
	font-size: 18px;
	line-height: 20px;
}
@media (max-width: 320px) {
	div {
		width: 5.33333vw;
		font-size: 20px;
		color: blue;
	}
}
```

The rule `div` will be ignored.



## Skip a media query condition

input

```css
div {
	width: 20px;
	height: 30px;
	color: red;
	font-size: 18px;
	line-height: 20px;
}
/* skip-p2v */
@media (max-width: 320px) {
	div {
		width: 40px;
		font-size: 20px;
		color: blue;
	}
}
```

output

```css
div {
	width: 2.66667vw;
	height: 4vw;
	color: red;
	font-size: 18px;
	line-height: 2.66667vw;
}
/* skip-p2v */
@media (max-width: 320px) {
	div {
		width: 5.33333vw;
		font-size: 20px;
		color: blue;
	}
}
```

By default, will not convert media query condition, but if you specify `mediaQuery: true`, this comment would be useful.