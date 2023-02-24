export function setPreventScrolling(isVisible: boolean) {
  if (isVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}
export function throttle<T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number,
) {
  let timerId = false;

  return (...args: T) => {
    if (!timerId) {
      timerId = true;
      setTimeout(() => {
        cb(...args);
        timerId = false;
      }, delay);
    }
  };
}
