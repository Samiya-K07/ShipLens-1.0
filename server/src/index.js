// server/src/index.js starts the server. The env import must stay first.
import './env.js';
import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});