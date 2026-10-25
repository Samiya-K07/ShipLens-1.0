// calls /health
import { useEffect, useState } from 'react';

function App() {
  const [health, setHealth] = useState('checking...');

  useEffect(() => {
    fetch('/health')
      .then((res) => res.json())
      .then((data) => setHealth(`${data.status}, database ${data.database}`))
      .catch(() => setHealth('server not reachable'));
  }, []);

  return (
    <main>
      <h1>ShipLens</h1>
      <p>Server health: {health}</p>
    </main>
  );
}

export default App;