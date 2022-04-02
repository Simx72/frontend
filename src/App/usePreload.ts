import { useEffect } from "react";
import WebFont from "webfontloader";
import "animate.css/source/animate.css";

function loadFonts() {
  WebFont.load({
    google: {
      families: ["Luckiest Guy", "Open Sans"]
    }
  })
}

export default function usePreload(onLoaded?: () => void) {
  useEffect(() => {
    loadFonts();
    onLoaded?.();
  })
}