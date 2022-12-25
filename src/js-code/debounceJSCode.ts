const debounceJSCode = `function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}`;

export default debounceJSCode;

/**
 * @TODO TDD 환경 구축되면, 샘플 코드 TC로 옮길 예정
 * var myEfficientFn = debounce(function() {
 *      // All the taxing stuff you do
 * }, 250);
 * window.addEventListener('resize', myEfficientFn);
 */