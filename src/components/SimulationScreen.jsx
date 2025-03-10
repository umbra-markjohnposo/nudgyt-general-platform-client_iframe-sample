import sendToIframeParent from "../iframes/sendToIframeParent";
import useIframeListener from "../iframes/useIframeListener";

function useChatListener() {
  useIframeListener((messageData, eventOrigin) => {
    const isValidMessage =
      messageData.type === "CHAT" && typeof messageData.value === "string";

    if (!isValidMessage) {
      alert(`Invalid chat data: ${JSON.stringify(messageData, undefined, 2)}`);

      return;
    }

    const chat = messageData.value;

    sendToIframeParent(eventOrigin, {
      type: "AI_RESPONSE",
      value: `Sample AI response to: "${chat}"`,
    });
  });
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
