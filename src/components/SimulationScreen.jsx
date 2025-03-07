import { useEffect, useState } from "react";
import sendToIframeParent from "../iframes/sendToIframeParent";
import useIframeListener from "../iframes/useIframeListener";

function useChatListener() {
  const [parentOrigin, setParentOrigin] = useState(null);
  const [mostRecentChat, setMostRecentChat] = useState(null);

  useIframeListener((messageData, parentOrigin) => {
    const isValidMessage =
      messageData.type === "CHAT" && typeof messageData.value === "string";

    if (!isValidMessage) {
      alert(`Invalid chat data: ${JSON.stringify(messageData, undefined, 2)}`);

      return;
    }

    setMostRecentChat(messageData.value);
    setParentOrigin(parentOrigin);
  });

  useEffect(() => {
    if (mostRecentChat === undefined) return;
    if (parentOrigin === null) return;

    sendToIframeParent(parentOrigin, {
      type: "AI_RESPONSE",
      value: `Sample AI response to: "${mostRecentChat}"`,
    });
  }, [parentOrigin, mostRecentChat]);
}

function SimulationScreen({ characterId, personalityId, environmentId }) {
  useChatListener();

  return (
    <main>
      <header>Show simulation here (Three.js?)</header>

      <pre>
        {JSON.stringify({ characterId, personalityId, environmentId }, null, 2)}
      </pre>
    </main>
  );
}

export default SimulationScreen;
