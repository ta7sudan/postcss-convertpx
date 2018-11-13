'use strict';
const test = require('ava');
const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const convertpx = require('../src');


test('default configuration', async t => {
	const source = path.resolve(__dirname, './css/case0.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected0.css'), 'utf8');
	const rst = await postcss(convertpx).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('skip declaration', async t => {
	const source = path.resolve(__dirname, './css/case1.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected1.css'), 'utf8');
	const rst = await postcss(convertpx).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('skip rule', async t => {
	const source = path.resolve(__dirname, './css/case2.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected2.css'), 'utf8');
	const rst = await postcss(convertpx).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('skip atrule', async t => {
	const source = path.resolve(__dirname, './css/case3.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected3.css'), 'utf8');
	const rst = await postcss(convertpx({
		mediaQuery: true
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('convert px for media query', async t => {
	const source = path.resolve(__dirname, './css/case4.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected4.css'), 'utf8');
	const rst = await postcss(convertpx({
		mediaQuery: true
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('specify unitPrecision', async t => {
	const source = path.resolve(__dirname, './css/case5.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected5.css'), 'utf8');
	const rst = await postcss(convertpx({
		unitPrecision: 3
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('specify convertFont', async t => {
	const source = path.resolve(__dirname, './css/case6.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected6.css'), 'utf8');
	const rst = await postcss(convertpx({
		convertFont: true
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('specify convertLineHeight false', async t => {
	const source = path.resolve(__dirname, './css/case7.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected7.css'), 'utf8');
	const rst = await postcss(convertpx({
		convertLineHeight: false
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('specify declarationBlackList', async t => {
	const source = path.resolve(__dirname, './css/case8.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected8.css'), 'utf8');
	const rst = await postcss(convertpx({
		declarationBlackList: ['width']
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('specify viewportWidth', async t => {
	const source = path.resolve(__dirname, './css/case9.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected9.css'), 'utf8');
	const rst = await postcss(convertpx({
		viewportWidth: 640
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('specify exclude', async t => {
	const source = path.resolve(__dirname, './css/case0.css');
	const css = fs.readFileSync(source, 'utf8');
	const rst = await postcss(convertpx({
		exclude(file) {
			return /case0/.test(file);
		}
	})).process(css, {
		from: source
	});
	t.is(rst.css, css);
});

test('specify viewportUnit rem', async t => {
	const source = path.resolve(__dirname, './css/case10.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected10.css'), 'utf8');
	const rst = await postcss(convertpx({
		viewportUnit: 'rem'
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});

test('specify viewportUnit rem and scale', async t => {
	const source = path.resolve(__dirname, './css/case11.css');
	const css = fs.readFileSync(source, 'utf8');
	const expected = fs.readFileSync(path.resolve(__dirname, './css/expected11.css'), 'utf8');
	const rst = await postcss(convertpx({
		viewportUnit: 'rem',
		scale: 75
	})).process(css, {
		from: source
	});
	t.is(rst.css, expected);
});