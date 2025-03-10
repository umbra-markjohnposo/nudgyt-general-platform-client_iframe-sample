import { useState, useEffect } from "react";
import InitialScreen from "./components/InitialScreen";
import SimulationScreen from "./components/SimulationScreen";

function useSimulationData() {
  const [characterId, setCharacterId] = useState(null);
  const [personalityId, setPersonalityId] = useState(null);
  const [environmentId, setEnvironmentId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Receive data from iframe parent
    function receiveIframeMessage(event) {
      if (isInitialized) return;

      const messageData = JSON.parse(event.data);

      const isValidMessage =
        messageData.type === "INITIALIZATION" &&
        typeof messageData.characterId === "string" &&
        typeof messageData.personalityId === "string" &&
        typeof messageData.environmentId === "string";

      if (!isValidMessage) {
        alert(
          `Invalid initialization data: ${JSON.stringify(
            messageData,
            undefined,
            2
          )}`
        );

        return;
      }

      setCharacterId(messageData.characterId);
      setPersonalityId(messageData.personalityId);
      setEnvironmentId(messageData.environmentId);
      setIsInitialized(true);

      // Send data to iframe parent
      window.parent.postMessage(
        JSON.stringify({
          type: "INITIALIZED",
        }),
        event.origin
      );
    }

    window.addEventListener("message", receiveIframeMessage);

    return () => window.removeEventListener("message", receiveIframeMessage);
  }, [isInitialized]);

  return { characterId, personalityId, environmentId };
}

function App() {
  const { characterId, personalityId, environmentId } = useSimulationData();

  const shouldStartSimulation =
    characterId !== null && personalityId !== null && environmentId !== null;

  if (shouldStartSimulation) {
    return (
      <SimulationScreen
        characterId={characterId}
        personalityId={personalityId}
        environmentId={environmentId}
      />
    );
  }

  return <InitialScreen />;
}

export default App;
