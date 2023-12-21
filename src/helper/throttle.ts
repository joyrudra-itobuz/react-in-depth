type ThrottleFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export default function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ThrottleFunction<T> {
  let lastCallTime = 0;
  let pendingCall:
    | { args: Parameters<T>; callback: () => ReturnType<T> }
    | undefined;

  return function (...args: Parameters<T>) {
    const currentTime = Date.now();

    if (currentTime - lastCallTime >= delay) {
      lastCallTime = currentTime;
      callback(...args);
    } else {
      // Store the latest arguments and callback for the upcoming call
      pendingCall = { args, callback: () => callback(...args) };
    }

    // If there is a pending call, execute it after the delay
    if (!pendingCall) return;

    setTimeout(() => {
      pendingCall!.callback();
      pendingCall = undefined;
    }, delay);
  };
}
