const throttleJSCode = `function throttle(type, name, obj) {
  var running = false;

  obj = obj || window;

  var func = function () {
    if (running) return;

    running = true;

    requestAnimationFrame(function () {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };

  obj.addEventListener(type, func, { passive: true });
}`;

export default throttleJSCode;

/**
 * @TODO TDD 환경 구축되면, 샘플 코드 TC로 옮길 예정
 * Throttle scroll event
 * throttle('scroll', 'scroll.throttled');
 * window.addEventListener('scroll.throttled', function() {
 *   console.log('Event fired');
 * });
 */