import { useEffect } from "react";

export function useScrollDisable(isOpen: boolean) {
  useEffect(() => {
    let root_html = document!.querySelector("html");
    if (!isOpen) {
      root_html!.style.overflow = "";
      root_html!.style.paddingRight = "";
    } else {
      root_html!.style.overflow = "hidden";
      root_html!.style.paddingRight = "1px";
    }

    return () => {
      root_html!.removeAttribute("style");
    };
  }, [isOpen]);
}
