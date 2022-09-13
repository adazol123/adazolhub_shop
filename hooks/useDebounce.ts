import { ChangeEvent } from "react";

export const useDebounce = (
  func: (event: ChangeEvent<HTMLInputElement>) => void,
  delay = 300
) => {
  let debounceTimer: NodeJS.Timeout;

  return (...args: any) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
