import { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import SimulationScreen from "./components/SimulationScreen";
import sendToIframeParent from "./iframes/sendToIframeParent";
import useIframeListener from "./iframes/useIframeListener";

function useSimulationData() {
  const [characterId, setCharacterId] = useState(null);
  const [personalityId, setPersonalityId] = useState(null);
  const [environmentId, setEnvironmentId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useIframeListener((messageData, parentOrigin) => {
    if (isInitialized) return;

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

    console.warn({ parentOrigin });
    sendToIframeParent(parentOrigin, {
      type: "INITIALIZED",
    });
  });

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
