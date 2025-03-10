import { useEffect } from "react";

function useChatListener() {
  useEffect(() => {
    // Receive data from iframe parent
    function receiveIframeMessage(event) {
      const messageData = JSON.parse(event.data);

      const isValidMessage =
        messageData.type === "CHAT" && typeof messageData.value === "string";

      if (!isValidMessage) {
        alert(
          `Invalid chat data: ${JSON.stringify(messageData, undefined, 2)}`
        );

        return;
      }

      const chat = messageData.value;

      // Send data to iframe parent
      window.parent.postMessage(
        JSON.stringify({
          type: "AI_RESPONSE",
          value: `Sample AI response to: "${chat}"`,
        }),
        event.origin
      );
    }

    window.addEventListener("message", receiveIframeMessage);

    return () => window.removeEventListener("message", receiveIframeMessage);
  }, []);
}

function SimulationScreen({ characterId, personalityId, environmentId }) {
  useChatListener();

  return (
    <main className="simulation">
      <header>Show simulation here (Three.js?)</header>

      <pre>
        {JSON.stringify({ characterId, personalityId, environmentId }, null, 2)}
      </pre>
    </main>
  );
}

export default SimulationScreen;
