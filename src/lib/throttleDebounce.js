/**
 * Throttle function - limits how often a function can be called
 * Useful for expensive operations like scroll event handlers
 */
export const throttle = (func, delay) => {
  let lastCall = 0;
  let timeoutId = null;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      func.apply(this, args);
      lastCall = now;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastCall = Date.now();
      }, delay - timeSinceLastCall);
    }
  };
};

/**
 * Debounce function - delays function execution until after wait time has elapsed
 */
export const debounce = (func, delay) => {
  let timeoutId = null;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
