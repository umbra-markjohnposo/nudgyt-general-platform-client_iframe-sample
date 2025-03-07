import { useEffect } from "react";
import originsConfig from "../config/origins";

function useIframeListener(callback) {
  useEffect(() => {
    function receiveIframeMessage(event) {
      const isEventOriginAllowed = originsConfig.ALLOWED_ORIGINS.includes(
        event.origin
      );
      if (!isEventOriginAllowed) {
        alert(`Origin not allowed: ${event.origin}`);

        return;
      }

      const messageData = JSON.parse(event.data);

      callback?.(messageData);
    }

    window.addEventListener("message", receiveIframeMessage);

    return () => window.removeEventListener("message", receiveIframeMessage);
  }, [callback]);
}

export default useIframeListener;
