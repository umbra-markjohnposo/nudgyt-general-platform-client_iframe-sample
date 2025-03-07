import { useState } from "react";
import useIframeListener from "../iframes/useIframeListener";

function useChats() {
  const [chats, setChats] = useState([]);

  useIframeListener((messageData) => {
    if (messageData.type === "CHAT") {
      const isValidMessage =
        messageData.type === "CHAT" && typeof messageData.value === "string";

      if (!isValidMessage) {
        alert(
          `Invalid chat data: ${JSON.stringify(messageData, undefined, 2)}`
        );

        return;
      }

      setChats((prevChats) => [...prevChats, messageData.value]);
    }
  });

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
