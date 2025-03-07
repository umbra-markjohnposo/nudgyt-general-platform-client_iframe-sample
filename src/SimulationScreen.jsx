function SimulationScreen({ characterId, personalityId, environmentId }) {
  return (
    <main>
      <p>Show simulation here (Three.js?)</p>

      <pre>
        {JSON.stringify({ characterId, personalityId, environmentId }, null, 2)}
      </pre>
    </main>
  );
}

export default SimulationScreen;
