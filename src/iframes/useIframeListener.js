import { useEffect } from "react";

function useIframeListener(callback) {
  useEffect(() => {
    function receiveIframeMessage(event) {
      const messageData = JSON.parse(event.data);

      callback?.(messageData, event.origin);
    }

    window.addEventListener("message", receiveIframeMessage);

    return () => window.removeEventListener("message", receiveIframeMessage);
  }, [callback]);
}

export default useIframeListener;
