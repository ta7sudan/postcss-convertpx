'use strict';
const postcss = require('postcss');
const p2v = require('../src/index');
const fs = require('fs');

const css = fs.readFileSync('./example/demo.css', 'utf8');

postcss(p2v).process(css, {
	from: './example/demo.css'
}).then(rst => {
	console.log(rst.css);
});
