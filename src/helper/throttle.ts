type ThrottleFunction = <T>(...args: Array<T>) => void;

export default function throttle(
  callback: ThrottleFunction,
  delay: number
): ThrottleFunction {
  let lastCallTime = 0;

  return function <T>(...args: Array<T>) {
    const currentTime = Date.now();

    if (currentTime - lastCallTime >= delay) {
      callback(...args);
      lastCallTime = currentTime;
    }
  };
}
