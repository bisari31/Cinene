export default function throttle<T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number,
) {
  let trigger = false;

  return (...args: T) => {
    if (!trigger) {
      trigger = true;
      setTimeout(() => {
        cb(...args);
        trigger = false;
      }, delay);
    }
  };
}
