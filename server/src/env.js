// server/src/env.js loads the root .env file. It lives in its own file so it runs before anything reads process.env. In Docker there is no .env file and the variables come from compose, which is fine.

import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
