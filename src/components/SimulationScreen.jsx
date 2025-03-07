import { useEffect, useState } from "react";
import originsConfig from "../config/origins";

function useChats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    function listenForChats(event) {
      const isEventOriginAllowed = originsConfig.ALLOWED_ORIGINS.includes(
        event.origin
      );

      if (!isEventOriginAllowed) {
        alert(`Origin not allowed: ${event.origin}`);

        return;
      }

      const messageData = JSON.parse(event.data);

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

    window.addEventListener("message", listenForChats);

    return () => window.removeEventListener("message", listenForChats);
  }, []);

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
