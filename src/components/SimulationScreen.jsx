import { useEffect, useState } from "react";
import sendToIframeParent from "../iframes/sendToIframeParent";
import useIframeListener from "../iframes/useIframeListener";

function useChats() {
  const [chats, setChats] = useState([]);
  const [parentOrigin, setParentOrigin] = useState(null);

  const mostRecentChat = chats.at(-1);

  useIframeListener((messageData, parentOrigin) => {
    const isValidMessage =
      messageData.type === "CHAT" && typeof messageData.value === "string";

    if (!isValidMessage) {
      alert(`Invalid chat data: ${JSON.stringify(messageData, undefined, 2)}`);

      return;
    }

    setChats((prevChats) => [...prevChats, messageData.value]);
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

  return chats;
}

function SimulationScreen({ characterId, personalityId, environmentId }) {
  const chats = useChats();

  return (
    <main>
      <header>Show simulation here (Three.js?)</header>

      <pre>
        {JSON.stringify({ characterId, personalityId, environmentId }, null, 2)}
      </pre>

      <section>
        <header>Messages:</header>

        <ul>
          {chats.map((chat, idx) => (
            <li key={idx}>{chat}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default SimulationScreen;
