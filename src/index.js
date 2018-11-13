'use strict';
const postcss = require('postcss');

const isFn = f => typeof f === 'function';

function shouldSkipDecl(decl) {
	const nextSibling = decl.next();
	return nextSibling && nextSibling.type === 'comment' && nextSibling.text === 'skip-p2v';
}

function shouldSkipRule(rule) {
	const prevSibling = rule.prev();
	return prevSibling && prevSibling.type === 'comment' && prevSibling.text === 'skip-p2v';
}

module.exports = postcss.plugin('postcss-convertpx', function ({
	viewportWidth = 750,
	unitPrecision = 5,
	viewportUnit = 'vw',
	convertFont = false,
	minPixelValue = 1,
	mediaQuery = false,
	convertLineHeight = true,
	declarationBlackList,
	scale,
	exclude
} = {}) {
	return function (css) {
		const hasDeclarationBlackList = Array.isArray(declarationBlackList),
			sourceFile = css.source.input.file,
			vpw = parseInt(viewportWidth, 10),
			// from px-to-viewport
			pxRegex = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)px/gi,
			replaceFn = (m, $1) => {
				if (!$1) {
					return m;
				}
				let val = parseFloat($1);
				if (val <= minPixelValue) {
					return m;
				}
				if (viewportUnit === 'vw') {
					return `${parseFloat((val * 100 / vpw).toFixed(unitPrecision))}vw`;
				} else if (typeof scale === 'number') {
					return `${parseFloat((val / scale).toFixed(unitPrecision))}${viewportUnit}`;
				} else {
					return `${parseFloat((val * 100 / vpw).toFixed(unitPrecision))}${viewportUnit}`;
				}
			};
		if (isFn(exclude) && sourceFile && exclude(sourceFile)) {
			return;
		}
		// 理论上讲, 先把不存在px的属性给去掉性能会好很多,
		// 但是目前看来只能通过正则, 一个非常长的正则,
		// 虽然过滤了不匹配的属性, 但是对于匹配的属性来说,
		// 开销也不小, 所以还是算了吧, 怎么简单怎么来
		css.walkRules(rule => {
			if (shouldSkipRule(rule)) {
				return;
			}
			rule.walkDecls(decl => {
				if (hasDeclarationBlackList && declarationBlackList.includes(decl.prop)
					|| !decl.value.includes('px')
					|| shouldSkipDecl(decl)
					|| (decl.prop === 'font-size' && !convertFont)
					|| (decl.prop === 'line-height' && !convertLineHeight)) {
					return;
				}
				if (decl.prop === 'font') {
					const parts = decl.value.split('/');
					if (convertFont) {
						parts[0] = parts[0].replace(pxRegex, replaceFn);
					}
					if (parts[1] && convertLineHeight) {
						parts[1] = parts[1].replace(pxRegex, replaceFn);
					}
					decl.value = parts.join('/');
					return;
				}
				decl.value = decl.value.replace(pxRegex, replaceFn);
			});
		});
		if (mediaQuery) {
			css.walkAtRules('media', rule => {
				if (!rule.params.includes('px') || shouldSkipRule(rule)) {
					return;
				}
				rule.params = rule.params.replace(pxRegex, replaceFn);
			});
		}
	};
});
