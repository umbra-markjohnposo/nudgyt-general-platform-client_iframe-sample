import { useEffect, useState } from "react";
import InitialScreen from "./InitialScreen";

function SimulationScreen() {
  return <main>SimulationScreen</main>;
}

/** Might be better if this comes from environment variables */
const ALLOWED_ORIGINS = ["http://127.0.0.1:3000"];

function useSimulationData() {
  const [characterId, setCharacterId] = useState(null);
  const [personalityId, setPersonalityId] = useState(null);
  const [environmentId, setEnvironmentId] = useState(null);

  useEffect(() => {
    function listenForInitialization(event) {
      const messageData = JSON.parse(event.data);

      if (!ALLOWED_ORIGINS.includes(event.origin)) {
        alert(`Origin not allowed: ${event.origin}`);

        return;
      }

      setCharacterId(messageData.characterId);
      setPersonalityId(messageData.personalityId);
      setEnvironmentId(messageData.environmentId);
    }

    window.addEventListener("message", listenForInitialization);

    return () => window.removeEventListener("message", listenForInitialization);
  }, []);

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
