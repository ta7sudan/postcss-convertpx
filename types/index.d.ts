export default function convertpx(options: {
	viewportWidth?: number;
	unitPrecision?: number;
	viewportUnit?: string;
	convertFont?: boolean;
	minPixelValue?: number;
	mediaQuery?: boolean;
	convertLineHeight?: boolean;
	declarationBlackList?: string[];
	scale?: number;
	exclude?(file: string): boolean;
}): void;
